function loadTableBuilder(pageData, onSave, table) {
  var pageUrl = localStorage.getItem('pageurl');

  var html = templates.tableBuilder(table);
  $('body').append(html);

  //$('.table-builder').css("display", "block");

  //if (table) {
  //  $('#table-data').val(toTsv(table));
  //  refreshBarLineSection();
  //}

  //renderChart();

  var input = document.getElementById("files"), formdata = false;

$('#upload-table-form').submit(function(event) {

  event.preventDefault();

  var formData = new FormData($(this)[0]);
  var table = buildJsonObjectFromForm();
  var uriUpload = getPathName() + "/" + table.filename + ".xls";

  $.ajax({
    url: "/zebedee/content/" + Florence.collection.id + "?uri=" + uriUpload,
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (returndata) {
      renderTable(uriUpload);
    }
  });

  return false;
});

  function renderTable(uriUpload) {

    // call new api method - pass the json file path and get back html
    //$.ajax({
    //  url: "/zebedee/table/" + Florence.collection.id + "?uri=" + uriUpload,
    //  type: "GET",
    //  processData: false,
    //  contentType: false,
    //  success: function (res) {
    //    console.log(res);
    //    var table = $(res);
    //
    //
    //  }
    //});




    $('#chart').html('<iframe id="preview-frame" frameBorder ="0" scrolling = "yes" src="/zebedee/table/' + Florence.collection.id + '?uri=' + uriUpload + '"></iframe>');

    document.getElementById('preview-frame').height= "500px";
    document.getElementById('preview-frame').width= "100%";
  }

  $('.btn-table-builder-cancel').on('click', function () {
    $('.table-builder').stop().fadeOut(200).remove();
  });

  $('.btn-table-builder-create').on('click', function () {

    if (!pageData.tables) {
      pageData.tables = []
    } else {
      if (_.find(pageData.tables, function (existingTable) {
          return existingTable.filename === table.filename
        })) {
        alert("A table with this name already exists.");
        return;
      }
    }


    var uriUploadJSON = pageUrl + "/" + table.filename + ".json";
    $.ajax({
      url: "/zebedee/content/" + Florence.collection.id + "?uri=" + uriUploadJSON,
      type: "POST",
      data: JSON.stringify(buildJsonObjectFromForm()),
      processData: false,
      contentType: false,
      success: function (res) {

        // upload xls

        // create html from xls

        pageData.tables.push({title: table.title, filename: table.filename});
        if (onSave) {
          onSave(table.filename, '<ons-table path="' + getPathName() + '/' + table.filename + '" />');
        }
        $('.chart-builder').stop().fadeOut(200).remove();
      }
    });
  });

  function buildJsonObjectFromForm() {
    if (!table) {
      table = {};
    }

    table.title = $('#table-title').val();
    table.filename = table.title.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
    
    if (table.title === '') {
      table.title = '[Title]'
    }

    return table;
  }
}

