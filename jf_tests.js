if (Meteor.isClient) {

  Meteor.subscribe("articles");


  bonusMode = {
    mode: 'normal',
    get: function () {
      return this.mode;
    },
    set: function (newValue){
      this.mode = newValue;
      return this.mode;
    }
  };

  Deps.autorun(function (){
    console.log('bonusMode is now:', bonusMode.get());
  });

  handle = Deps.autorun(function (){
    console.log(bonusMode.get(), 'is your mode. (play with my handle)');
  });


  Template.navBrand.title = function () {
    console.log('template helper ran.');
    return "You are in " + bonusMode.get() + " mode.";
  };


  Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      //console.log("test " + currentRoute.lookupTemplate());
      return currentRoute &&
        template ===  currentRoute.route.getName()  ? 'active' : '';
    }
  });


   //make sure you are in the `if (Meteor.isClient)` block
  Template.articles.helpers({
    maybeSelected: function () {
      var currentRoute = Router.current();
      return currentRoute &&
        this._id === currentRoute.params._id ? 'selected' : '';
    }
  });




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


 Router.configure({
   layoutTemplate: 'layout'  //can be any template name
 });



Router.map(function () {
  this.route('home', {
    path: '/',
  });
  this.route('about');
  this.route('articles', {
    // articles now under `articleList` instead of `this`
    data: {
      articleList: function () {return Articles.find()},
      selectedArticle: {}
    }
  });
  this.route('article', {
    path: '/article/:_id',
    // provide data for both `articleList` and `selectedArticle`
    data: function () {
      return {
        articleList: Articles.find(),
        selectedArticle: Articles.findOne({_id: this.params._id})
      }
    },
    template: 'articles'  //change template target
  });
});



