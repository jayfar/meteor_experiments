////////////////////////
// articles (List)

Template.articles.helpers({
	maybeSelected: function () {
	  var currentRoute = Router.current();
	  return currentRoute &&
	    this._id === currentRoute.params._id ? 'selected' : '';
	}
});


Template.articles.events({
	'click .deleteArticle': function (event) {  
  		console.log("Delete Goes Here " + this._id);	
		var confirm = window.confirm("Delete this article (" + this.title  + ")?");
	    if(confirm){
			Articles.remove({_id: this._id});
	    }
	},

	'click .addNewArticle': function (event) {
		// globalFunctionTest();
		// Set session variables that will be used in the articleForm.helpers
		Session.set("selectedArticleId", null);
		Session.set("articleFormType", "insert");
  		// Navigate to a route in code
  		// https://github.com/iron-meteor/iron-router/blob/master/Guide.md#using-javascript
  		Router.go('/articleAddEdit');
	},


	'click .editArticle': function (event) {  
		console.log("Edit Goes Here " +  this._id);
		// Set session variables that will be used in the articleForm.helpers
		Session.set("selectedArticleId", this._id);
		Session.set("articleFormType", "update");

		Router.go('/articleAddEdit');
  		
	}
});

////////////////////////
// articlesForm

Template.articleForm.helpers({
	articleFormType: function() {
    	return Session.get("articleFormType");
    },
    selectedArticleDoc: function() {
    	var ret = Articles.findOne(Session.get("selectedArticleId"));
    	console.log("Found " + ret);
    	return ret;
    }
})


// Add a insert Form hook to redirect after submission is done
// https://github.com/aldeed/meteor-autoform#callbackshooks
var itemHooks = {
	onSuccess: function(formType, result) {
		Router.go('/articles');
	},
}
AutoForm.addHooks('insertArticleForm', itemHooks);

