
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


Template.navItems.rendered = function ()
{
    $(document).ready(function(){
      console.log('ready');
      //$('[data-toggle="tooltip"]').tooltip();
      $('.has-tooltip').tooltip();
    });
}
