// https://github.com/CollectionFS/Meteor-CollectionFS
// https://github.com/CollectionFS/Meteor-CollectionFS/wiki/Getting-Started
// FileSystem store: https://github.com/CollectionFS/Meteor-CollectionFS/tree/devel/packages/filesystem
var imageStore = new FS.Store.FileSystem("images", {
  path: "/Users/jason/Documents/upload/method2", //optional, default is "/cfs/files" path within app container
  //transformWrite: myTransformWriteFunction, //optional
  //transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});