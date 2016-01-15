function t1EditorCensus(collectionId, data, templateData) {

  var newBlocks = [], newImage = [];
  var setActiveTab, getActiveTab;
  var timeoutId;

  $(".edit-accordion").on('accordionactivate', function (event, ui) {
    setActiveTab = $(".edit-accordion").accordion("option", "active");
    if (setActiveTab !== false) {
      Florence.globalVars.activeTab = setActiveTab;
    }
  });

  getActiveTab = Florence.globalVars.activeTab;
  accordion(getActiveTab);

  // Metadata edition and saving
  if (Florence.globalVars.welsh) {
    $("#title").on('input', function () {
      $(this).textareaAutoSize();
      data.description.title = $(this).val();
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        autoSaveMetadata(collectionId, data);
      }, 3000);
    });
  } else {
    $(".title").remove();
  }
  $("#summary").on('input', function () {
    $(this).textareaAutoSize();
    data.description.summary = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  $("#keywordsTag").tagit({
    availableTags: data.description.keywords,
    singleField: true,
    allowSpaces: true,
    singleFieldNode: $('#keywords')
  });
  $('#keywords').on('change', function () {
    data.description.keywords = $('#keywords').val().split(',');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });
  $("#metaDescription").on('input', function () {
    $(this).textareaAutoSize();
    data.description.metaDescription = $(this).val();
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      autoSaveMetadata(collectionId, data);
    }, 3000);
  });

  // Save
  var editNav = $('.edit-nav');
  editNav.off(); // remove any existing event handlers.

  editNav.on('click', '.btn-edit-save', function () {
    save();
    updateContent(collectionId, data.uri, JSON.stringify(data));
  });

  // completed to review
  editNav.on('click', '.btn-edit-save-and-submit-for-review', function () {
    save();
    saveAndCompleteContent(collectionId, data.uri, JSON.stringify(data));
  });

  // reviewed to approve
  editNav.on('click', '.btn-edit-save-and-submit-for-approval', function () {
    save();
    saveAndReviewContent(collectionId, data.uri, JSON.stringify(data));
  });

  function save() {
    clearTimeout(timeoutId);
    // Blocks
    var orderBlocks = $("#sortable-block").sortable('toArray');
    $(orderBlocks).each(function (indexB, titleB) {
        if (!data.sections[parseInt(titleB)].title) {
          var uri = data.sections[parseInt(titleB)].uri;
          var size = data.sections[parseInt(titleB)].size;
          var safeUri = checkPathSlashes(uri);
          newBlocks[indexB] = {uri: safeUri, size: size};
        } else {
          var uri = data.sections[parseInt(titleB)].uri;
          var title = data.sections[parseInt(titleB)].title;
          var size = data.sections[parseInt(titleB)].size;
          var image = data.sections[parseInt(titleB)].image;
          var text = data.sections[parseInt(titleB)].text;
          newBlocks[indexB] = {uri: uri, title: title, text: text, image: image, size: size};
        }
      });
    data.sections = newBlocks;
    // images
    var orderImage = $("#sortable-image").sortable('toArray');
    $(orderImage).each(function (indexImage, nameImage) {
      var uri = data.images[parseInt(nameImage)].uri;
      var title = data.images[parseInt(nameImage)].title;
      var filename = data.images[parseInt(nameImage)].filename;
      var safeUri = checkPathSlashes(uri);
      newImage[indexImage] = {uri: safeUri, title: title, filename: filename};
    });
    data.images = newImage;
  }

}

