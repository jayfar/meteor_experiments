Template.about.rendered = function() {
    if(!this._rendered) {
      this._rendered = true;
      console.log('Template onLoad');

      // JSX Style
      //ReactDOM.render(<TickTock />, document.getElementById("container"));
      // JS Style: https://jsfiddle.net/reactjs/5vjqabv3/
		ReactDOM.render(
       		React.createElement(TickTock, {name: "C1"}),
       		document.getElementById("container1")
       	);

       	ReactDOM.render(
       		React.createElement(TickTock, {name: "C2"}),
       		document.getElementById("container2")
       	);

       	ReactDOM.render(
       		React.createElement(TickTock, {name: "C3"}),
       		document.getElementById("container3")
       	);
    }
}

  Template.about.events({
    'click .btnOnAmout': function () {  
      console.log("test");
      appName.set("Test 123");
    }
  });
