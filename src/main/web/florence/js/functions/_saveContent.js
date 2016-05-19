/**
 * Save new content.
 * @param collectionId
 * @param uri
 * @param data
 */
function saveContent(collectionId, uri, data, collectionData) {
    postContent(collectionId, uri, JSON.stringify(data), false,
        success = function (message) {
            console.log("Updating completed " + message);
            console.log(data);
            createWorkspace(uri, collectionId, 'edit', collectionData);
        },
        error = function (response) {
            if (response.status === 409) {
                sweetAlert("Cannot create this page", "It already exists.");
            }
            else {
                handleApiError(response);
            }
        }
    );
}
