   	var SetIntervalMixin = {
	  	componentWillMount: function() {
	    	this.intervals = [];
	  	},
	  	setInterval: function() {
	    	this.intervals.push(setInterval.apply(null, arguments));
	  	},
	  	componentWillUnmount: function() {
	  		console.log("Tick Tock mixin componentWillUnmount " + this.props.name);
	    	this.intervals.map(clearInterval);
	  	}
	};

	TickTock = React.createClass({
		  	mixins: [SetIntervalMixin], // Use the mixin
		  	getInitialState: function() {
		    	return {seconds: 0};
		  	},
		  	componentDidMount: function() {
		  		console.log("Tick Tock componentDidMount " + this.props.name);
		    	this.setInterval(this.tick, 1000); // Call a method on the mixin
		  	},
		  	tick: function() {
		    	this.setState({seconds: this.state.seconds + 1});
		  	},
		  	componentWillUnmount: function() {
	  			console.log("Tick Tock componentWillUnmount " + this.props.name);
	    		
	  		},
		  	render: function() {
		    	return (
		      	<p>
		        React {this.props.name} has been running for {this.state.seconds} seconds.
		      </p>
		    );
		}
	});

	//React.render(<TickTock />, document.getElementById("container"));