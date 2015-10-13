function loadT7Creator(collectionId, releaseDate, pageType, parentUrl) {
  var releaseDate = null;             //overwrite scheduled collection date
  var pageName, pageNameTrimmed, newUri, pageData;
  if (parentUrl === '/') {        //to check home page
    parentUrl = '';
  }
  var parentUrlData = parentUrl + "/data";
  $.ajax({
    url: parentUrlData,
    dataType: 'json',
    crossDomain: true,
    success: function(checkData) {
      if (pageType === 'static_landing_page' && checkData.type === 'home_page' ||
        (pageType === 'static_qmi' || pageType === 'static_adhoc' || pageType === 'static_methodology') && checkData.type === 'product_page') {
        submitFormHandler();
        return true;
      } else if ((pageType === 'static_foi' || pageType === 'static_page' || pageType === 'static_landing_page' || pageType === 'static_article') && checkData.type.match(/static_.+/)) {
        submitFormHandler();
        return true;
      } else {
        alert("This is not a valid place to create this page.");
        loadCreateScreen(collectionId);
      }
    },
    error: function() {
      console.log('No page data returned');
    }
  });

  function submitFormHandler() {
    if (!releaseDate && (pageType === 'static_qmi')) {
      $('.edition').append(
        '<br>' +
        '<label for="releaseDate">Last revised</label>' +
        '<input id="releaseDate" type="text" placeholder="day month year" />'
      );
      $('#releaseDate').datepicker({dateFormat: 'dd MM yy'});
    }
    else if (!releaseDate && !(pageType === 'static_page' || pageType === 'static_landing_page')) {
      $('.edition').append(
        '<br>' +
        '<label for="releaseDate">Release date</label>' +
        '<input id="releaseDate" type="text" placeholder="day month year" />'
      );
      $('#releaseDate').datepicker({dateFormat: 'dd MM yy'});
    }

    $('form').submit(function(e) {
      e.preventDefault();
      pageData = pageTypeDataT7(pageType);
      pageName = $('#pagename').val().trim();
      pageData.description.title = pageName;
      pageNameTrimmed = pageName.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
      pageData.fileName = pageNameTrimmed;
      if (pageType === 'static_qmi' && !Florence.globalVars.welsh) {
        newUri = makeUrl(parentUrl, 'qmis', pageNameTrimmed);
      } else if (pageType === 'static_adhoc' && !Florence.globalVars.welsh) {
        newUri = makeUrl(parentUrl, 'adhocs', pageNameTrimmed);
      } else if (pageType === 'static_methodology' && !Florence.globalVars.welsh) {
        newUri = makeUrl(parentUrl, 'methodologies', pageNameTrimmed);
      } else if (!Florence.globalVars.welsh){
        newUri = makeUrl(parentUrl, pageNameTrimmed);
      } else {
        alert('You can not perform that operation in Welsh.');
      }
      var safeNewUri = checkPathSlashes(newUri);
      if (releaseDate && (pageType === 'static_qmi')) {
        date = new Date(releaseDate);
        pageData.description.lastRevised = $.datepicker.formatDate('dd/mm/yy', date);
      } else if (releaseDate && (pageType !== 'static_page' || pageType !== 'static_landing_page')) {
        date = new Date(releaseDate);
        pageData.description.releaseDate = $.datepicker.formatDate('dd/mm/yy', date);
      } else if (!releaseDate && (pageType === 'static_qmi')) {
        pageData.description.lastRevised = new Date($('#releaseDate').val()).toISOString();
      } else if (!releaseDate && !(pageType === 'static_page' || pageType === 'static_landing_page')) {
        pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
      }

      if (pageName.length < 5) {
        alert("This is not a valid file name");
      } else {
        checkSaveContent(collectionId, safeNewUri, pageData);
      }
    });
  }
}

function pageTypeDataT7(pageType) {

  if (pageType === "static_page") {
    return {
      "description": {
        "summary": "",
        "keywords": [],
        "metaDescription": "",
        "title": ""
      },
      "markdown": [],
      "downloads": [],
      type: pageType,
      "links" : []
    };
  } else if (pageType === "static_landing_page") {
    return {
      "description": {
        "summary": "",
        "keywords": [],
        "metaDescription": "",
        "title": "",
      },
      "sections": [],
      "markdown": [],
      type: pageType,
      "links": []
    };
  }
  else if ((pageType === "static_article") || (pageType === "static_methodology")) {
    return {
      "description": {
        "contact": {
          "name": "",
          "email": "",
          "telephone": ""
        },
        "summary": "",
        "keywords": [],
        "metaDescription": "",
        "title": "",
        "releaseDate": ""
      },
      "sections": [],
      "accordion": [],
      "charts": [],
      "tables": [],
      "images": [],
      type: pageType,
      "downloads":[],
      "links" : []
    };
  } else if (pageType === "static_qmi") {
    return {
      "description": {
        "contact": {
          "name": "",
          "email": "",
          "phone": ""
        },
        "surveyName": "",
        "frequency": "",
        "compilation": "",
        "geographicCoverage": "",
        "sampleSize": null,
        "lastRevised": "",
        "nationalStatistic": false,
        "keywords": [],
        "metaDescription": "",
        "title": ""
      },
      "markdown": [],
      "downloads": [],
      type: pageType,
      "fileName": "",
      "links" : []
    };
  } else if (pageType === "static_foi") {
    return {
      "description": {
        "keywords": [],
        "metaDescription": "",
        "title": "",
        "releaseDate": ""
      },
      "downloads": [],
      "markdown": [],
      type: pageType,
      "fileName": "",
      "links" : []
    };
  } else if (pageType === "static_adhoc") {
    return {
      "description": {
        "keywords": [],
        "metaDescription": "",
        "title": "",
        "releaseDate": "",
        "reference": null
      },
      "downloads": [],
      "markdown": [],
      type: pageType,
      "fileName": "",
      "links" : []
    };
  } else {
    alert('Unsupported page type. This is not a static page');
  }
}