function loadPageDataIntoEditor(){

  var pageurl = $('.fl-panel--preview__content').contents().get(0).location.href;
    var newSections = [];
  var pageurldata = "/data" + pageurl.split("#!")[1];
  var data;
  var lastIndex;

  loadData();

  function loadData() {
    $.ajax({
      url: pageurldata,
      dataType: 'json',
      crossDomain: true,

      success: function(response) {
        data = response;
        //console.log(response);
        makeEditSections(response);
      },

      error: function() {
        console.log('No page data returned');
        $('.fl-editor').val('');
      }
    });
  }

  function makeEditSections(response){
    if (response.type == 'bulletin'){
      bulletinSections(response);
    } else {
      $('.fl-editor__headline').val(JSON.stringify(response, null, 2));
      $('.fl-panel--editor__nav__save').click(function() {
        pageData = $('.fl-editor__headline').val();
        save("testCollection", pageData);
      });
    }
  }

  function bulletinSections(data){
    $('.fl-editor__headline').remove();

    $(data.sections).each(function(index, section){
      var element = $('.fl-editor__sections').append(
          '<div id="' + index + '" class="list" style="background-color:grey; color:white;">' +
          '<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
          'Title' +
          '<textarea id="section__' + index + '">' + section.title + '</textarea>' +
          '<textarea style="visibility:hidden; height:2px;" id="section_markdown_' + index + '">' +
          section.markdown + '</textarea>' +
          '<button class="fl-panel--editor__sections__section-item__edit_' + index + '">Edit</button>' +
          '</div>');

      $(".fl-panel--editor__sections__section-item__edit_"+index).click(function() {
        editedValue = $("#section_markdown_" + index).val();

        $('body').prepend('<div style="float: right; margin-top: 50px; height:905px; overflow: scroll;" id="wmd-preview" class="wmd-panel wmd-preview"></div>');

        $('body').prepend('<div style="float: left; margin-top: 50px;" id="wmd-edit" class="wmd-panel">' +
                              '<div id="wmd-button-bar"></div>' +
                              '<textarea style="height:845px;" class="wmd-input" id="wmd-input">' + editedValue + '</textarea>' +
                              '<button id="finish">Finish editing</button>' +
                              '</div>');

        $("#finish").click(function(){
          editedText = $('#wmd-input').val();
          data.sections[index].markdown = editedText;
          $("#wmd-preview").remove();
          $("#wmd-edit").remove();
        });

        var converter = Markdown.getSanitizingConverter();

        Markdown.Extra.init(converter, {
          extensions: "all"
        });

        var editor = new Markdown.Editor(converter);

        editor.hooks.chain("onPreviewRefresh", function () {
          MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        });
        editor.run();
        });

      lastIndex = index + 1;
    });
  }

  // Save ordered sections
  $(".fl-panel--editor__nav__save").click(function() {
    var order = $(".fl-editor__sections").sortable('toArray');
    $(order).each(function(index, name){
      var title = $('#section__'+name).val();
      var markdown = data.sections[index].markdown;
      newSections[parseInt(index)] = {title: title, markdown: markdown};
    });
    data.sections = newSections;
    //save("testCollection", JSON.stringify(data));
    console.log(data);
  });

  function sortable() {
    $(".fl-editor__sections").sortable();
  }

  sortable();
    //Add new sections
  $(".fl-panel--editor__nav").prepend('<button id="addSection">Add new section</button>');

  $("#addSection").click(function() {
    $('.fl-editor__sections').append(
        '<div id="' + lastIndex + '" class="list" style="background-color:grey; color:white;">' +
        '<div style="background-color:grey; color:white;">' +
        '<span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' +
        'Title' +
        '<textarea id="section__' + lastIndex + '"></textarea>' +
        '<textarea style="visibility:hidden; height:2px;" id="section_markdown_' + lastIndex + '"></textarea>' +
        '<button class="fl-panel--editor__sections__section-item__edit_' + lastIndex + '">Edit</button>' +
        '</div>');
    sortable();
    saveNewSection();
  });

  function saveNewSection() {
    var order = $(".fl-editor__sections").sortable('toArray');
    $(order).each(function(index, name){
      var title = $('#section__'+name).val();
      var markdown = $('#section_markdown_'+name).val();
      newSections[parseInt(index)] = {title: title, markdown: markdown};
    });
    data.sections = newSections;
    $(".list").remove();
    bulletinSections(data);
  }
}


