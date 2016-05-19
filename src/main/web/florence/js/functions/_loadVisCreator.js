/**
 * Creates data visualisation's JSON
 * @param collectionId
 * @param parentUrl
 */

function loadVisualisationCreator(collectionId, pageType, parentUrl, collectionData) {
    var pageType, pageData, pageTitle, pageId, newUri, safeNewUri, uriSection, pageIdTrimmed;
    var parentUrlData = "/data";
    $.ajax({
        url: parentUrlData,
        dataType: 'json',
        crossDomain: true,
        success: function (checkData) {
            //Checks page is built in correct location TODO switch homepage to check for visualisation directory
            if (checkData.type === 'home_page') {
                submitFormHandler();
                return true;
            } else {
                sweetAlert("This is not a valid place to create this page.");
                //TODO load data vis directory
            }
        },
        error: function () {
            console.log('No page data returned');
        }
    });

    function submitFormHandler() {
        pageData = pageTypeDataVisualisation(pageType);

        // Prepend unique code field into create form
        var codeInput = "<label for='visualisation-uid'>Unique ID</label><input placeholder='Eg DVC126' type='text' id='visualisation-uid'>";
        $('.edition').after(codeInput);

        $('form').submit(function(e) {
            e.preventDefault();
            var nameValid = validatePageName();
            if (!nameValid) {
                return false;
            }

            // Update page title and UID
            pageTitle = $('#pagename').val();
            pageData.description.title = pageTitle;
            pageId = $('#visualisation-uid').val();
            pageData.uid = pageId;

            // Save the new page
            pageIdTrimmed = pageId.replace(/[^A-Z0-9]+/ig, "").toLowerCase();
            newUri = makeUrl(parentUrl, pageIdTrimmed);
            safeNewUri = checkPathSlashes(newUri);
            Florence.globalVars.pagePath = safeNewUri;
            saveContent(collectionId, safeNewUri, pageData, collectionData);
        });

    }
}

function pageTypeDataVisualisation(pageType) {
    return {
        description: {
            title: ""
        },
        uid: "",
        type: pageType,
        fileUri: ""
    };
}


