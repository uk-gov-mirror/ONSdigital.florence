/**
 * Manages related data
 * @param collectionId
 * @param data
 * @param templateData
 * @param field - JSON data key
 * @param idField - HTML id for the template
 */

function editRelated(collectionId, data, templateData, field, idField) {
  var list = templateData[field];
  var dataTemplate = createRelatedTemplate(idField, list);
  var html = templates.editorRelated(dataTemplate);
  $('#' + idField).replaceWith(html);
  initialiseRelated(collectionId, data, templateData, field, idField);
  resolveTitle(collectionId, data, templateData, field, idField);
  $(".workspace-edit").scrollTop(Florence.globalVars.pagePos);
}

function refreshRelated(collectionId, data, templateData, field, idField) {
  var list = templateData[field];
  var dataTemplate = createRelatedTemplate(idField, list);
  var html = templates.editorRelated(dataTemplate);
  $('#sortable-' + idField).replaceWith($(html).find('#sortable-' + idField));
  initialiseRelated(collectionId, data, templateData, field, idField);
}

function createRelatedTemplate(idField, list) {
  var dataTemplate;
  if (idField === 'article') {
    dataTemplate = {list: list, idField: idField, idPlural: 'articles (DO NOT USE. TO BE DELETED)'};
  } else if (idField === 'bulletin') {
    dataTemplate = {list: list, idField: idField, idPlural: 'bulletins (DO NOT USE. TO BE DELETED)'};
  } else if (idField === 'dataset') {
    dataTemplate = {list: list, idField: idField, idPlural: 'datasets'};
  } else if (idField === 'document') {
    dataTemplate = {list: list, idField: idField, idPlural: 'bulletins | articles | compendia'};
  } else if (idField === 'methodology') {
    dataTemplate = {list: list, idField: idField, idPlural: 'methodologies'};
  } else {
    dataTemplate = {list: list, idField: idField};
  }
  return dataTemplate;
}

function initialiseRelated(collectionId, data, templateData, field, idField) {
  // Load
  if (!data[field] || data[field].length === 0) {
    editRelated['lastIndex' + field] = 0;
  } else {
    $(data[field]).each(function (index) {
      editRelated['lastIndex' + field] = index + 1;

      // Delete
      $('#' + idField + '-delete_' + index).click(function () {
        var result = confirm("Are you sure you want to delete this link?");
        if (result === true) {
          var position = $(".workspace-edit").scrollTop();
          Florence.globalVars.pagePos = position;
          $(this).parent().remove();
          data[field].splice(index, 1);
          templateData[field].splice(index, 1);
          postContent(collectionId, data.uri, JSON.stringify(data),
            success = function () {
              Florence.Editor.isDirty = false;
              refreshPreview(data.uri);
              refreshRelated(collectionId, data, templateData, field, idField)
            },
            error = function (response) {
              if (response.status === 400) {
                alert("Cannot edit this page. It is already part of another collection.");
              }
              else {
                handleApiError(response);
              }
            }
          );
        }
      });
    });
  }

  //Add
  $('#add-' + idField).off().one('click', function () {
    var latestCheck;
    var position = $(".workspace-edit").scrollTop();
    Florence.globalVars.pagePos = position;
    var result = confirm('If you do not come back to this page, you will loose any unsaved changes');
    if (result === true) {
      var iframeEvent = document.getElementById('iframe').contentWindow;
      iframeEvent.removeEventListener('click', Florence.Handler, true);
      createWorkspace(data.uri, collectionId, '', true);

      $('#sortable-' + idField).append(
        '<div id="' + editRelated['lastIndex' + field] + '" class="edit-section__sortable-item">' +
        '  <textarea id="' + idField + '-uri_' + editRelated['lastIndex' + field] + '" placeholder="Go to the related data and click Get or paste the link and click Get"></textarea>' +
        '  <div id="latest-container"></div>' +
        '  <button class="btn-page-get" id="' + idField + '-get_' + editRelated['lastIndex' + field] + '">Get</button>' +
        '  <button class="btn-page-cancel" id="' + idField + '-cancel_' + editRelated['lastIndex' + field] + '">Cancel</button>' +
        '</div>').trigger('create');

      if (idField === 'article' || idField === 'bulletin' || idField === 'articles' || idField === 'bulletins' || idField === 'document' || idField === 'highlights') {
        $('#latest-container').append('<label for="latest">Link to latest' +
          '<input id="latest" type="checkbox" value="value" checked/></label>');
        latestCheck = true;
      }

      $(function () {
        $('#' + idField + '-uri_' + editRelated['lastIndex' + field]).tooltip({
          items: '#' + idField + '-uri_' + editRelated['lastIndex' + field],
          content: 'Go to the related data and click Get or paste the link and click Get',
          show: "slideDown", // show immediately
          open: function (event, ui) {
            ui.tooltip.hover(
              function () {
                $(this).fadeTo("slow", 0.5);
              });
          }
        });
      });

      $('#' + idField + '-cancel_' + editRelated['lastIndex' + field]).one('click', function () {
        createWorkspace(data.uri, collectionId, 'edit');
      });

      $('#latest-container input:checkbox').change(function () {
        latestCheck = $(this).prop('checked');
      });

      $('#' + idField + '-get_' + editRelated['lastIndex' + field]).one('click', function () {
        var pastedUrl = $('#' + idField + '-uri_' + editRelated['lastIndex' + field]).val();
        if (!pastedUrl) {
          var baseUrl = getPathNameTrimLast();
        } else {
          var baseUrl = checkPathParsed(pastedUrl);
        }
        var dataUrlData = baseUrl + "/data";
        var latestUrl;
        if (latestCheck) {
          var tempUrl = baseUrl.split('/');
          tempUrl.pop();
          tempUrl.push('latest');
          latestUrl = tempUrl.join('/');
        } else {
          latestUrl = baseUrl;
        }

        $.ajax({
          url: dataUrlData,
          dataType: 'json',
          crossDomain: true,
          success: function (result) {
            if ((field === 'relatedBulletins' || field === 'statsBulletins') && result.type === 'bulletin') {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if (field === 'relatedArticles' && (result.type === 'article' || result.type === 'compendium_landing_page')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if ((field === 'relatedDocuments') && (result.type === 'article' || result.type === 'bulletin' || result.type === 'compendium_landing_page')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if ((field === 'relatedDatasets' || field === 'datasets') && (result.type === 'dataset' || result.type === 'reference_tables')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if ((field === 'items') && (result.type === 'timeseries')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if ((field === 'relatedData') && (result.type === 'timeseries_dataset' || result.type === 'timeseries' || result.type === 'dataset' || result.type === 'reference_tables')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if (field === 'relatedMethodology' && (result.type === 'static_methodology' || result.type === 'static_qmi')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else if (field === 'highlightedLinks' && (result.type === 'bulletin')) {
              if (!data[field]) {
                data[field] = [];
                templateData[field] = [];
              }
            }

            else {
              alert("This is not a valid document");
              createWorkspace(data.uri, collectionId, 'edit');
              return;
            }

            data[field].push({uri: latestUrl});
            templateData[field].push({uri: latestUrl});
            saveRelated(collectionId, data.uri, data, templateData, field, idField);

          },
          error: function () {
            console.log('No page data returned');
          }
        });
      });
    } else {
      initialiseRelated(collectionId, data, templateData, field, idField);
    }
  });

  function sortable() {
    $('#sortable-' + idField).sortable();
  }

  sortable();

}

function resolveTitle(collectionId, data, templateData, field, idField) {
  var ajaxRequest = [];
  $(templateData[field]).each(function (index, path) {
    templateData[field][index].description = {};
    var eachUri = path.uri;
    var latest = eachUri.match(/\/latest\/?$/) ? true : false;
    var dfd = $.Deferred();
    getPageDataTitle(collectionId, eachUri,
      success = function (response) {
        templateData[field][index].description.title = latest ? '(Latest) ' + response.title : response.title;
        if (response.edition) {
          templateData[field][index].description.edition = response.edition;
        }
        dfd.resolve();
      },
      error = function () {
        alert(field + ' address: ' + eachUri + ' is not found.');
        dfd.resolve();
      }
    );
    ajaxRequest.push(dfd);
  });

  $.when.apply($, ajaxRequest).then(function () {
    refreshRelated(collectionId, data, templateData, field, idField);
  });
}

