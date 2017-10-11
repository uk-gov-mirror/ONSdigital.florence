import log, {eventTypes} from '../utilities/log'
import notifications from './notifications'

export default class url {
    /**
    * Makes a safe URL by removing non a-z and 0-9 characters, replacing them with an '_'
    * 
    * @param {string} - String of proposed URL or URL part
    * @returns {string}
    */
    static sanitise(url) {
        const safeURL = url.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        return encodeURIComponent(safeURL);
    }

    /**
     * Return the absolute URL of the parent path of a pathname
     * 
     * @param {string} - (Optional) a path to work out the parent of. Other current location is used
     * @returns {string} - Absolute URL of parent path of current location.pathname
     */
    static parent(path) {
        const splitPath = path ? path.split('/') : location.pathname.split('/');
        splitPath.splice(splitPath.length-1, 1);
        return splitPath.join('/');
    }

    /**
     * Takes a relative path and resolves it to an absolute path (root is considered '/florence', so the returned path will always be prefixed with this)
     * 
     * @param {string} path - Path that we want to resolve 
     * @returns {string} - An absolute pathname (excluding host)
     */
    static resolve(path) {

        if (typeof path !== "string") {
            console.error("Unable to parse relative URL path because non-string type given");
            log.add(eventTypes.unexpectedRuntimeError, {message: "Unable to parse relative URL path because non-string type given"});
            return location.pathname;
        }

        try {
            // Handle URL for root - prefix it with '/florence'
            if (path === '/') {
                return '/florence';
            }
            if (path[0] === '/') {
                path = '/florence' + path;
            }
            if (location.pathname === "/florence") {
                path = '/florence/' + path;
            }

            // Handle paths going up levels, so that it considers any route
            // not ending in '/' to still be within that directory
            // e.g. url.resolve("../") from location "/florence/teams" = "/florence";
            if (path.indexOf('../') === 0) {
                return new URL(path, location.href + "/").pathname.replace(/\/+$/, "");
            }

            let newURL = new URL(path, location.href).pathname;

            return newURL;
        } catch (error) {
            console.error("Error trying to parse relative URL:\n", error);
            const notification = {
                type: "warning",
                message: `There was an unexpected error trying to resolve the path '${path}' ... ¯\\_(ツ)_/¯`
            };
            notifications.add(notification);
            log.add(eventTypes.unexpectedRuntimeError, {message: error.message});
            return;
        }
    }
}