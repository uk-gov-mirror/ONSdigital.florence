import url from './url';

function setLocation(href) {
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: href,
    });
    Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: href.substring(href.indexOf("/florence")),
    });
}
setLocation('http://publishing.onsdigital.co.uk/florence/datasets');

jest.mock('../utilities/log', () => {
    return {
        add: function() {
            // do nothing
        },
        eventTypes: {
            unexpectedRuntimeError: ""
        }
    }
});

jest.mock('../utilities/notifications', () => {
    return {
        add: function() {
            // do nothing
        }
    }
});

afterEach(() => {
    setLocation('http://publishing.onsdigital.co.uk/florence/datasets');
});

describe("'../' should remove one route from the path", () => {
    it("'../' will go up one level", () => {
        expect(url.resolve("../")).toBe("/florence");
    })

    it("'../../' will go up two levels", () => {
        setLocation('http://publishing.onsdigital.co.uk/florence/datasets/an-id-12345/metadata');
        expect(url.resolve("../../")).toBe("/florence/datasets");
    })
    it("'../../../teams' will go up three levels and to the teams path", () => {
        setLocation('http://publishing.onsdigital.co.uk/florence/datasets/an-id-12345/metadata');
        expect(url.resolve("../../../teams")).toBe("/florence/teams");
    })
});

test("Routes relative to the root are prefixed with '/florence'", () => {
    expect(url.resolve('/teams')).toBe("/florence/teams");
    expect(url.resolve('/')).toBe("/florence");
});

test("Replacing the last route at the root of the app still prefixes the path with '/florence'", () => {
    setLocation('http://publishing.onsdigital.co.uk/florence');
    expect(url.resolve("datasets")).toBe("/florence/datasets");
})

test("Path from current location replaces the last route with the new path", () => {
    expect(url.resolve("teams")).toBe("/florence/teams");
})

