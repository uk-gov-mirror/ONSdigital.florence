function loadPageDataIntoEditor(path, collectionId) {

  var safePath = checkPathSlashes(path);

  if (safePath === '/') {
    var pageUrlData = safePath + "data.json";
    var pageUrlDataTemplate = safePath + "data.json&resolve";
  } else {
    var pageUrlData = safePath + "/data.json";
    var pageUrlDataTemplate = safePath + "/data.json&resolve";
  }
  var pageData, pageDataTemplate, isPageComplete;
  var ajaxRequests = [];

  ajaxRequests.push(
    getPageData(collectionId, pageUrlData,
      success = function (response) {
        pageData = response;
      },
      error = function (response) {
        handleApiError(response);
      }
    )
  );

  ajaxRequests.push(
    getPageData(collectionId, pageUrlDataTemplate,
      success = function (response) {
        pageDataTemplate = response;
      },
      error = function (response) {
        handleApiError(response);
      }
    )
  );

  ajaxRequests.push(
    getCollection(collectionId,
      success = function (response) {
        var lastCompletedEvent = getLastCompletedEvent(response, pageUrlData);
        isPageComplete = !(!lastCompletedEvent || lastCompletedEvent.email === localStorage.getItem("loggedInAs"));
      },
      error = function (response) {
        handleApiError(response);
      })
  );

  $.when.apply($, ajaxRequests).then(function () {
    pageDataTemplate.isPageComplete = isPageComplete;
    makeEditSections(collectionId, pageData, pageDataTemplate);
  });
}
