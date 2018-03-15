import notifications from '../../../utilities/notifications';

/**
 * 
 * @param {Error} metadataUpdateFailure - Any error responses returned by the metadata update request.
 * @param {Error} reviewStateUpdateFailure - Any error responses returned by the metadata update request.
 * @param {boolean} isSubmittingForReview - Whether the request was submitting the dataset/version for review.
 * @param {boolean} isMarkingAsReviewed - Whether the request was marking the dataset/version as reviewed.
 * @param {string} collectionID - Collection name that the user is updating the dataset/version in.
 * 
 * @returns {boolean} - Whether there were errors or not;
 */

export default function handleMetadataSaveErrors(metadataUpdateFailure = {}, reviewStateUpdateFailure = {}, isSubmittingForReview, isMarkingAsReviewed, collectionID) {

    if (reviewStateUpdateFailure.status === 401 || metadataUpdateFailure.status === 401) {
        // Handled by utility request function
        return true;
    }

    // Both requests have failed but for different reasons so we need to give two seperate notifications to give enough detail.
    if ((reviewStateUpdateFailure.status && metadataUpdateFailure.status) && reviewStateUpdateFailure.status !== metadataUpdateFailure.status) {
        const metadataUpdateNotification = {
            type: 'warning',
            message: getErrorMessage(metadataUpdateFailure, {}, isSubmittingForReview, isMarkingAsReviewed, collectionID),
            isDismissable: true,
            autoDismiss: 8000
        };
        const reviewStateUpdateNotification = {
            type: 'warning',
            message: getErrorMessage({}, reviewStateUpdateFailure, isSubmittingForReview, isMarkingAsReviewed, collectionID),
            isDismissable: true,
            autoDismiss: 8000
        };

        notifications.add(metadataUpdateNotification);
        notifications.add(reviewStateUpdateNotification);
        return;
    }

    // One or both requests have failed (for the same reason) so show a single custom notification
    if (metadataUpdateFailure.status || reviewStateUpdateFailure.status) {
        const notification = {
            type: 'warning',
            message: getErrorMessage(metadataUpdateFailure, reviewStateUpdateFailure, isSubmittingForReview, isMarkingAsReviewed, collectionID),
            isDismissable: true,
            autoDismiss: 8000
        };
        notifications.add(notification);
        return true;
    }

    return false;
}

function getErroredActions(metadataUpdateFailure, reviewStateUpdateFailure, isSubmittingForReview, isMarkingAsReviewed) {
    const metadataError = metadataUpdateFailure.status;
    const reviewStateError = reviewStateUpdateFailure.status;
    let newReviewState = "the next state";

    if (reviewStateError && isSubmittingForReview) {
        newReviewState = "review";
    }
    if (reviewStateError && isMarkingAsReviewed) {
        newReviewState = "approval";
    }

    if (reviewStateError && metadataError) {
        return `submit for ${newReviewState} and save your metadata updates`;
    }
    
    if (reviewStateError && !metadataError) {
        return `submit for ${newReviewState}`;
    }

    if (!reviewStateError && metadataError) {
        return "save your metadata updates";
    }
}


function getErrorMessage(metadataUpdateFailure, reviewStateUpdateFailure, isSubmittingForReview, isMarkingAsReviewed, collectionID) {
    const attemptedActions = getErroredActions(metadataUpdateFailure, reviewStateUpdateFailure, isSubmittingForReview, isMarkingAsReviewed);
    const status = reviewStateUpdateFailure.status || metadataUpdateFailure.status;

    switch (status) {
        case(400): {
            return `Unable to ${attemptedActions} due to invalid values being submitted. Please check your updates for any issues and try again`;
        }
        case(403): {
            return `Unable to ${attemptedActions} because you do not have the correct permissions`;
        }
        case(404): {
            return `Unable to ${attemptedActions} because this ${reviewStateUpdateFailure.status ? "collection (" + collectionID + ")" : ""}${reviewStateUpdateFailure.status && metadataUpdateFailure.status ? " and " : ""}${metadataUpdateFailure.status ? "dataset" : ""} couldn't be found`;
        }
        case('FETCH_ERR'): {
            return `Unable to ${attemptedActions} due to a network issue. Please check your internet connection and try again`;
        }
        default: {
            return `Unable to ${attemptedActions} due to an unexpected error`;
        }
    }
}