package steps

import (
	"context"
	"github.com/ONSdigital/dp-api-clients-go/health"
	componenttest "github.com/ONSdigital/dp-component-test"
	"github.com/ONSdigital/dp-healthcheck/healthcheck"
	"github.com/ONSdigital/florence/config"
	"github.com/ONSdigital/florence/service"
	"github.com/ONSdigital/florence/service/mock"
	initialiser "github.com/ONSdigital/florence/service/mock"
	dplog "github.com/ONSdigital/log.go/log"
	"github.com/chromedp/chromedp"
	"github.com/cucumber/godog"
	"github.com/maxcnunes/httpfake"
	"github.com/stretchr/testify/assert"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

type Chrome struct {
	execAllocatorCanceller context.CancelFunc
	ctxCanceller           context.CancelFunc
	ctx                    context.Context
}

type Component struct {
	componenttest.ErrorFeature
	svc          *service.Service
	errorChan    chan error
	HTTPServer   *http.Server
	ctx          context.Context
	FakeApi      *FakeApi
	chrome       Chrome
	LoggedInUser string
	publisher    Publisher
	fakeRequest  *httpfake.Request
}

func NewFlorenceComponent() (*Component, error) {
	c := &Component{
		HTTPServer: &http.Server{},
		errorChan:  make(chan error),
		ctx:        context.Background(),
	}

	c.FakeApi = NewFakeApi(c)

	signals := make(chan os.Signal, 1)
	signal.Notify(signals, syscall.SIGINT, syscall.SIGTERM)

	cfg, err := config.Get()
	if err != nil {
		return nil, err
	}

	cfg.APIRouterURL = c.FakeApi.fakeHttp.ResolveURL("")

	initFunctions := &initialiser.InitialiserMock{
		DoGetHTTPServerFunc:   c.DoGetHTTPServer,
		DoGetHealthCheckFunc:  DoGetHealthcheckOk,
		DoGetHealthClientFunc: DoGetHealthClient,
	}

	serviceList := service.NewServiceList(initFunctions)

	c.runApplication(cfg, serviceList, signals)

	return c, nil
}

func (c *Component) RegisterSteps(ctx *godog.ScenarioContext) {
	ctx.Step(`^I am logged in as "([^"]*)"$`, c.iAmLoggedInAs)

	ctx.Step(`^I create a new collection called "([^"]*)" for manual publishing$`, c.iCreateANewCollectionCalledForManualPublishing)
	ctx.Step(`^I should be presented with a editable collection titled "([^"]*)"$`, c.iShouldBePresentedWithAEditableCollectionTitled)
	ctx.Step(`^the collection publishing schedule should be "([^"]*)"$`, c.theCollectionShouldBe)
	ctx.Step(`^a collection with these details should be created:$`, c.theseCollectionCreationDetailsShouldHaveBeenSent)

}

// This steps actually logs in to Florence by entering a dummy username and password
func (c *Component) iAmLoggedInAs(username string) error {

	err := c.publisher.logIn(username)
	if err != nil {
		return err
	}

	c.LoggedInUser = username
	return nil
}

// This step actives the browser UI, entering a collection name
// and presses the "Create Collection" button
// consequently, the form data is sent to Florence back and and outwards to the
// collection creating API
func (c *Component) iCreateANewCollectionCalledForManualPublishing(collectionName string) error {
	collectionAction := NewCollectionAction(c.FakeApi, c.chrome.ctx)

	err := collectionAction.create(collectionName)
	if err != nil {
		return err
	}

	return c.StepError()
}

// This step asserts that the instructions for creating the collection
// have been sent correctly from Florence backend to the API that creates the collection
func (c *Component) theseCollectionCreationDetailsShouldHaveBeenSent(collectionDetails *godog.DocString) error {
	for _, outboundRequestBody := range c.FakeApi.outboundRequests {
		assert.JSONEq(c, collectionDetails.Content, outboundRequestBody)
	}

	return c.StepError()
}

// This step checks that the browser UI shows the correct new
// title of the collection
func (c *Component) iShouldBePresentedWithAEditableCollectionTitled(collectionTitle string) error {

	collectionAction := NewCollectionAction(c.FakeApi, c.chrome.ctx)

	if err := collectionAction.assertHasTitle(collectionTitle); err != nil {
		return err
	}

	return c.StepError()
}

// This step checks that the browser UI shows the type
// of collection schedule created (e.g. "Manual")
func (c *Component) theCollectionShouldBe(collectionPublishSchedule string) error {
	collectionAction := NewCollectionAction(c.FakeApi, c.chrome.ctx)

	if err := collectionAction.assertHasPublishSchedule(collectionPublishSchedule); err != nil {
		return err
	}

	return c.StepError()
}

func (c *Component) Reset() *Component {
	c.FakeApi.Reset()

	c.FakeApi.setJsonResponseForPost("/ping", `{"hasSession":true}`)
	c.FakeApi.setJsonResponseForGet("/collections", `[]`)
	c.FakeApi.setJsonResponseForGet("/teams", `{"teams":[{"id":3,"name":"Some team","members":["test@ons.com"]}]}`)

	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,
		// set this to false to be able to watch the browser in action
		chromedp.Flag("headless", true),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	c.chrome.execAllocatorCanceller = cancel

	ctx, cancel := chromedp.NewContext(allocCtx, chromedp.WithLogf(log.Printf))
	c.chrome.ctxCanceller = cancel

	log.Print("re-starting chrome ...")

	c.chrome.ctx = ctx

	c.publisher.chromeCtx = ctx
	c.publisher.fakeApi = c.FakeApi
	return c
}

func (c *Component) Close() error {
	dplog.Event(c.ctx, "Shutting down app from test ...")
	if c.svc != nil {
		_ = c.svc.Close(c.ctx)
	}

	c.FakeApi.Close()
	c.chrome.ctxCanceller()
	c.chrome.execAllocatorCanceller()

	return nil
}

func (c *Component) InitialiseService() (http.Handler, error) {
	return c.HTTPServer.Handler, nil
}

func (c *Component) DoGetHTTPServer(bindAddr string, router http.Handler) service.HTTPServer {
	c.HTTPServer.Addr = bindAddr
	c.HTTPServer.Handler = router
	return c.HTTPServer
}

func (c *Component) runApplication(cfg *config.Config, serviceList *service.ExternalServiceList, signals chan os.Signal) {
	go func() {
		c.svc, _ = service.Run(c.ctx, cfg, serviceList, "1", "", "", c.errorChan)

		// blocks until an os interrupt or a fatal error occurs
		select {
		case err := <-c.errorChan:
			dplog.Event(c.ctx, "service error received", dplog.ERROR, dplog.Error(err))
		case sig := <-signals:
			dplog.Event(c.ctx, "os signal received", dplog.Data{"signal": sig}, dplog.INFO)
		}
	}()
}

// DoGetHealthCheck creates a healthcheck with versionInfo
func DoGetHealthcheckOk(cfg *config.Config, buildTime, gitCommit, version string) (service.HealthChecker, error) {
	return &mock.HealthCheckerMock{
		AddCheckFunc: func(name string, checker healthcheck.Checker) error { return nil },
		StartFunc:    func(ctx context.Context) {},
		StopFunc:     func() {},
	}, nil
}

// GetHealthClient returns a healthclient for the provided URL
func DoGetHealthClient(name, url string) *health.Client {
	return &health.Client{}
}
