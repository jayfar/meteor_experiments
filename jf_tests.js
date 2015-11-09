if (Meteor.isClient) {
  
}

Articles = new Meteor.Collection('articles');


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup

    if (! Articles.findOne()){
      var articles = [
        {title: 'Article 1', body: 'This is article 1'},
        {title: 'Article 2', body: 'This is article 2'},
        {title: 'Article 3', body: 'This is article 3'}
      ];
      articles.forEach(function (article) {
        Articles.insert(article);
      })
    }


  });
}


Router.map(function () {
  this.route('about');  // By default, path = '/about', template = 'about'
  this.route('home', {
    path: '/',  //overrides the default '/home'
  });
  this.route('articles', {
    data: function () {return Articles.find()}  //set template data context
  });
  this.route('article', {
    path: '/article/:_id',
    data: function () {return Articles.findOne({_id: this.params._id})},
    template: 'fullArticle'
  });
});


