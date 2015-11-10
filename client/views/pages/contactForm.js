// Setup a reactive-var. Need: meteor add reactive-var 
var formPostResultMessage = new ReactiveVar();
var formShow = new ReactiveVar(true);

// Called when the template is first shown to set the defaults
Template.contactForm.rendered = function ()
{
    $(document).ready(function(){
      	console.log('ready contact form');
      	formPostResultMessage.set("");
      	formShow.set(true);
    });
}


Template.contactForm.helpers({
	contactFormSchema: function() {
    	return Schema.contact;
  	},
  	showForm: function() {
  		return formShow.get();
  	}
});


Template.contactForm.contactFormMessage = function () {
    	return formPostResultMessage.get();
};


// https://github.com/aldeed/meteor-autoform/issues/107
var contactFormHooks = {
    
    //called when any operation succeeds, where operation will be
    //"insert", "update", "remove", or the method name.
    onSuccess: function(operation, result, template) {
     	console.log("email sent successfully");
    	this.resetForm();
     	formPostResultMessage.set("Email Sent successfully.");
      	formShow.set(false);
    },

    // called when any operation fails, where operation will be
    // "validation", "insert", "update", "remove", or the method name.
    onError: function(operation, error, template) {
      	console.log("email sent error: " + error);
      	formPostResultMessage.set("There was an error sending your email. Please try again later.");
      	formShow.set(true);
    }

}; 

AutoForm.addHooks('contactForm', contactFormHooks);