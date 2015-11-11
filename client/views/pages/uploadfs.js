// https://groups.google.com/forum/#!topic/meteor-talk/2l1zyZk4PxY
// https://github.com/CollectionFS/Meteor-CollectionFS/wiki/Getting-Started
Template.uploadfs.rendered = function() {
  Dropzone.autoDiscover = false;
        dictResponseError: 'Error uploading file!';
  $("#mydropzone").dropzone({
    addRemoveLinks : false,
    maxFilesize: 7,
    accept: function(file, done) {
      //FS.Utility.eachFile(event, function(file) {
        //MyCollection.insert(file);
        // This Images
        Images.insert(file, function (err, fileObj) {
          //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
          console.log("Error: " + err);
        });
      //});
      done();
    }
  });
}