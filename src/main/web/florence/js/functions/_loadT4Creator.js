function loadT4Creator (collectionId, releaseDate, pageType, parentUrl) {
  var pageType, pageTitle, uriSection, pageTitleTrimmed, releaseDate, releaseDateManual, isInheriting, newUri, pageData, breadcrumb, natStat, contactName, contactEmail, contactTel, keyWords, metaDescr, relatedData;
  var parentUrlData = parentUrl + "/data";
  $.ajax({
    url: parentUrlData,
    dataType: 'json',
    crossDomain: true,
    success: function (checkData) {
      if (checkData.type === 'product_page') {
        var inheritedBreadcrumb = checkData.breadcrumb;
        var parentBreadcrumb = {
          "uri": checkData.uri
        };
        inheritedBreadcrumb.push(parentBreadcrumb);
        breadcrumb = inheritedBreadcrumb;
        submitFormHandler ();
        return true;
      } if ((checkData.type === 'bulletin' && pageType === 'bulletin') || (checkData.type === 'article' && pageType === 'article')) {
        var contentUrlTmp = parentUrl.split('/');
        contentUrlTmp.splice(-1, 1);
        var contentUrl = contentUrlTmp.join('/');
        parentUrl = contentUrl;
        breadcrumb = checkData.breadcrumb;
        natStat = checkData.description.nationalStatistic;
        contactName = checkData.description.contact.name;
        contactEmail = checkData.description.contact.email;
        contactTel = checkData.description.contact.telephone;
        pageTitle = checkData.description.title;
        keyWords = checkData.description.keywords;
        metaDescr = checkData.description.metaDescription;
        if (checkData.type === 'bulletin' && pageType === 'bulletin') {
          relatedData = checkData.relatedData;
        }
        isInheriting = true;
        submitFormHandler (pageTitle, contentUrl, isInheriting);
        return true;
      } else {
        alert("This is not a valid place to create this page.");
        loadCreateScreen(collectionId);
      }
    },
    error: function () {
      console.log('No page data returned');
    }
  });

  function submitFormHandler (title, uri, isInheriting) {

    $('.edition').append(
      '<label for="edition">Edition</label>' +
      '<input id="edition" type="text" placeholder="August 2010, Q3 2015, 1978, etc." />'
    );
    if (!releaseDate) {
      $('.edition').append(
        '<br>' +
        '<label for="releaseDate">Release date</label>' +
        '<input id="releaseDate" type="text" placeholder="day month year" />'
      );
      $('#releaseDate').datepicker({dateFormat: 'dd MM yy'});
    }
    if (title) {
      pageTitle = title;
      $('#pagename').val(title);
    }

    $('form').submit(function (e) {
      releaseDateManual = $('#releaseDate').val();
      pageData = pageTypeDataT4(pageType);
      pageData.description.edition = $('#edition').val();
      if (title) {
        //do nothing;
      } else {
        pageTitle = $('#pagename').val();
      }
      pageData.description.title = pageTitle;
      uriSection = pageType + "s";
      pageTitleTrimmed = pageTitle.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
      if (releaseDateManual) {                                                          //Manual collections
        date = $.datepicker.parseDate("dd MM yy", releaseDateManual);
        releaseUri = $.datepicker.formatDate('yy-mm-dd', date);
      } else {
        releaseUri = $.datepicker.formatDate('yy-mm-dd', new Date(releaseDate));
      }

      if (!releaseDate) {
        pageData.description.releaseDate = new Date($('#releaseDate').val()).toISOString();
      } else {
        pageData.description.releaseDate = releaseDate;
      }
      if (isInheriting) {
        pageData.description.nationalStatistic = natStat;
        pageData.description.contact.name = contactName;
        pageData.description.contact.email = contactEmail;
        pageData.description.contact.telephone = contactTel;
        pageData.description.keywords = keyWords;
        pageData.description.metaDescription = metaDescr;
        if (pageType === 'bulletin') {
          pageData.relatedData = relatedData;
        }
        newUri = makeUrl(parentUrl, releaseUri);
      } else {
        newUri = makeUrl(parentUrl, uriSection, pageTitleTrimmed, releaseUri);
      }
      checkPathSlashes(newUri);
      pageData.uri = newUri;
      pageData.breadcrumb = breadcrumb;

      if (pageType === 'bulletin' && !pageData.description.edition) {
        alert('Edition can not be empty');
        return true;
      } if (!pageData.description.releaseDate) {
        alert('Release date can not be empty');
        return true;
      } if (pageTitle.length < 4) {
        alert("This is not a valid file title");
        return true;
      }
      else {
        Florence.globalVars.pagePath = newUri;              //Delete this after test
        checkSaveContent(collectionId, newUri, pageData);
      }
      e.preventDefault();
    });
  }

  function pageTypeDataT4(pageType) {

    if (pageType === "bulletin") {
      return {
        "description": {
          "headline1": "",
          "headline2": "",
          "headline3": "",
          "nationalStatistic": false,
          "contact": {
            "name": "",
            "email": "",
            "telephone": ""
          },
          "title": "",
          "summary": "",
          "keywords": [],
          "edition": "",
          "releaseDate": "",
          "nextRelease": "",
          "metaDescription": "",
        },
        "sections": [],
        "accordion": [],
        "relatedBulletins": [],
        "relatedData": [],
        "links": [],
        "charts": [],
        "tables": [],
        "correction": [],
        type: pageType,
        "uri": "",
        "breadcrumb": [],
      };
    }

    else if (pageType === "article") {
      return {
        "description": {
          "edition": "",
          "nextRelease": "",
          "contact": {
            "name": "",
            "email": "",
            "telephone": ""
          },
          "_abstract": "",
          "authors": [],
          "keywords": [],
          "metaDescription": "",
          "nationalStatistic": false,
          "title": "",
          "releaseDate": "",
        },
        "sections": [],
        "accordion": [],
        "relatedArticles": [],
        "relatedData": [],
        "links": [],
        "charts": [],
        "tables": [],
        "correction": [],
        type: pageType,
        "uri": "",
        "breadcrumb": [],
      };
    }

    else {
      alert('unsupported page type');
    }
  }
}

