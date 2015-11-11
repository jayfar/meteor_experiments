Router.configure({
  layoutTemplate: 'layout'  //can be any template name
});



Router.map(function () {
  this.route('home', {
    path: '/',
  });
  
  this.route('about');
  
  this.route('form');

  this.route('uploadfs');

  this.route('contactForm');  

});