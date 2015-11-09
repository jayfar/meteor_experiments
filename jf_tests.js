if (Meteor.isClient) {

  Meteor.subscribe("articles");


  appName = {
    mode: 'initial value',
    dep: new Deps.Dependency,   //save dependent computations here
    get: function () {
      this.dep.depend();
      return this.mode;
    },
    set: function (newValue) {
      this.mode = newValue;
      this.dep.changed();
      return this.mode;
    }
  };

  Deps.autorun(function (){
    console.log('appName is now:', appName.get());
  });

  handle = Deps.autorun(function (){
    console.log(appName.get(), 'is the app name');
  });


  Template.navBrand.title = function () {
    console.log('template helper ran.');
    return "Current: " + appName.get();
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


  Template.about.events({
    'click .btnOnAmout': function () {  
      console.log("test");
      appName.set("Test 123");
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"

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

  Accounts.validateNewUser(function (user) {
    if (user.username && user.username.length >= 3)
      return true;
    throw new Meteor.Error(403, "Username must have at least 3 characters");
  });
  
  // Validate username, without a specific error message.
  Accounts.validateNewUser(function (user) {
    return user.username !== "root";
  });

  Accounts.onCreateUser(function(options, user) {
    var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    user.dexterity = d6() + d6() + d6();
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
      user.profile = options.profile;
    return user;
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



