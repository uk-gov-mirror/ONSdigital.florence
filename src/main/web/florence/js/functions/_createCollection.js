function createCollection() {
  var publishDay, publishMonth, publishYear, publishTime, collectionName, collectionType;
  publishDay   = $('#day').val();
  publishMonth = $('#month').val();
  publishYear  = $('#year').val();
  publishTime  = $('#time').val();
  collectionName = $('#collectionname').val();
  collectionType = $('form input[type=radio]:checked').val();

  if (collectionType === 'manual') {
    var publishDate = null;
  } else {
    var publishDate = new Date(publishYear, publishMonth, publishDay, 9, 30, 0, 0);
  };


  // Create the collection
  $.ajax({
    url: "/zebedee/collection",
    dataType: 'json',
    type: 'POST',
    data: JSON.stringify({name: collectionName, publishDate: publishDate, type: collectionType}),
    success: function (collection) {
      console.log("Collection " + collection.name + " created");

      Florence.setActiveCollection(collection);

      //localStorage.setItem("collection", collectionName);
      createWorkspace('', collection.id, 'browse');
    },
    error: function (response) {
      if(response.status === 409) {
        alert('A collection already exists with the name ' + collectionName);
      }
      else {
        handleApiError(response);
      }
    }
  });
}
