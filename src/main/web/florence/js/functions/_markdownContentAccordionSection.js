/**
 * Manages markdown content
 * @param collectionId
 * @param data
 * @param field - JSON data key
 * @param idField - HTML id for the template
 */
function renderMarkdownContentAccordionSection (collectionId, data, field, idField) {

  // the list of content sections to render in accordion section.
  var list = data[field];

  // a view model including the list and field name the list is contained in.
  var dataTemplate = {list: list, idField: idField};

  // render the HTML for the accordion section.
  var html = templates.editorContent(dataTemplate);

  // inject the HTML into the accordion section
  $('#'+ idField).replaceWith(html);

  // attach event handlers for the buttons.
  initialiseMarkdownContentAccordionSection(collectionId, data, field, idField)
}

function refreshMarkdownContentAccordionSection (collectionId, data, field, idField) {
  var list = data[field];
  var dataTemplate = {list: list, idField: idField};
  var html = templates.editorContent(dataTemplate);
  $('#sortable-'+ idField).replaceWith($(html).find('#sortable-'+ idField));
  initialiseMarkdownContentAccordionSection(collectionId, data, field, idField)
}

function initialiseMarkdownContentAccordionSection(collectionId, data, field, idField) {

  // for each entry in the list
  $(data[field]).each(function(index){

    // attach edit handler
    $('#' + idField +'-edit_'+index).click(function() {
      var editedSectionValue = {
        "title": $('#' + idField +'-title_' + index).val(),
        "markdown": $('#' + idField + '-markdown_' + index).val()
      };

      var saveContent = function(updatedContent) {
        data[field][index].markdown = updatedContent;
        data[field][index].title = $('#' + idField +'-title_' + index).val();
        saveMarkdown (collectionId, data.uri, data, field, idField);
        refreshPreview(data.uri);
      };

      loadMarkdownEditor(editedSectionValue, saveContent, data);
    });

    // attach delete handler
    $('#' + idField + '-delete_'+index).click(function() {
      swal ({
        title: "Warning",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false
      }, function(result) {
        if (result === true) {
          var position = $(".workspace-edit").scrollTop();
          Florence.globalVars.pagePos = position + 300;
          $(this).parent().remove();
          data[field].splice(index, 1);
          saveMarkdown(collectionId, data.uri, data, field, idField);
          refreshPreview(data.uri);
          console.log(idField);
          swal({
            title: "Deleted",
            text: "This " + idField + " has been deleted",
            type: "success",
            timer: 2000
          });
        }
      });
    });
  });

  // Attach add new handler.
  $('#add-' + idField).off().one('click', function () {
    var position = $(".workspace-edit").scrollTop();
    Florence.globalVars.pagePos = position + 300;
    data[field].push({markdown:"", title:""});
    saveMarkdown(collectionId, data.uri, data, field, idField);
  });

  function sortable() {

    var sortableStartPosition;

    $('#sortable-' + idField).sortable({
      stop: function(event, ui){
        $('#' + idField + ' .edit-section__sortable-item--counter').each(function(index) {
          $(this).empty().append(index + 1);
        });
        console.log("sortable update: Start: " + sortableStartPosition + " now: " + ui.item.index());
      },
      start: function(event, ui) {
        sortableStartPosition = ui.item.index();
        console.log("sortable start: " + sortableStartPosition);
      }
    });
  }
  sortable();


  function saveMarkdown (collectionId, path, data, field, idField) {
    putContent(collectionId, path, JSON.stringify(data),
      success = function () {
        Florence.Editor.isDirty = false;
        refreshMarkdownContentAccordionSection (collectionId, data, field, idField);
      },
      error = function (response) {
        if (response.status === 400) {
          sweetAlert("Cannot edit this page", "It is already part of another collection.");
        }
        else {
          handleApiError(response);
        }
      }
    );
  }
}

