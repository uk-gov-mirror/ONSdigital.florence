function checkPathSlashes (uri) {
  if (uri.charAt(uri.length-1) === '/') {
    uri = uri.slice(0, -1);
    console.debug('removed slash at the end here!');
  }
  if (uri.charAt(0) !== '/') {
    uri = '/' + uri;
  }
  return uri;
}

