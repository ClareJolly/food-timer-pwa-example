import React, { Component } from 'react';
// import logo from './logo.svg';


import '../containers/App.css';

class TimingList extends Component {

	constructor(props) {
		super(props)

		this.state = {
			timings:this.props.timings,
			late: false
		}

		// this.updateTimings = this.updateTimings.bind(this);
	}

	checkLate() {
		var now = new Date()
		if(this.state.timings[0].ovenTime < now) {
			// console.log("too late")
			this.setState({
				late: true
			})
			// return "Too late to cook this"
		}
	}

	componentDidMount(){
		this.checkLate()
	}

	render() {

		var timingsrows = []
		// console.log(this.state.timings)
		for (var a = 0; a < this.state.timings.length; a++) {
			// console.log(this.state.timings[a])
			timingsrows.push( <div key={a}><b>{this.state.timings[a].food}</b> start cooking @ <b>{('0' + (this.state.timings[a].ovenTime.getHours())).slice(-2)}:{('0' + (this.state.timings[a].ovenTime.getMinutes())).slice(-2)}</b></div>);
		}

		return (

			<div className="timingList">
				{this.state.late && <h2 className="late">Too late - better eat later or have something else</h2>}
				{timingsrows}
			</div>

		);
	}
}

export default TimingList;
