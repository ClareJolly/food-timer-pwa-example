import React, { Component } from "react";
import Grid from "react-css-grid";
// import TimeFields from '../components/TimeFields'
import "./App.css";

class TimeForm extends Component {
  constructor(props) {
    super(props);
    // const listLength = 5
    // console.log(this.props.timings)
    this.state = {
      foodList: [],
      endTime: "17:00",
      timings: []
    };
    this.handleFoodChange = this.handleFoodChange.bind(this);
    this.handleFoodTimeChange = this.handleFoodTimeChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFoodChange = idx => evt => {
    console.log(idx);
    const newFood = this.state.foodList.map((details, sidx) => {
      if (idx !== sidx) return details;
      return { ...details, food: evt.target.value };
    });

    this.setState({ foodList: newFood });
  };

  handleFoodTimeChange = idx => evt => {
    const newFood = this.state.foodList.map((details, sidx) => {
      if (idx !== sidx) return details;
      return { ...details, time: evt.target.value };
    });

    this.setState({ foodList: newFood });
  };

  handleAddFood = () => {
    this.setState({
      foodList: this.state.foodList.concat([
        { food: "", time: "", ovenTime: "" }
      ])
    });
  };

  cleanFoodList = () => {
    var foods = this.state.foodList.filter(f => f.food !== "");
    // console.log(foods)
    var foodDetailsOrder = foods.sort(function(a, b) {
      return a.time - b.time;
    });

    return foodDetailsOrder.reverse();
  };

  getEndTime = () => {
    var time = this.state.endTime.split(":");

    const now = new Date();
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      time[0],
      time[1]
    );
    return end;
  };

  setOventimes = (foodDetailsOrder, endTime) => {
    for (var x = 0; x < foodDetailsOrder.length; ++x) {
      var startdate = new Date(endTime);

      var durationInMinutes = foodDetailsOrder[x].time;

      startdate.setMinutes(endTime.getMinutes() - durationInMinutes);
      foodDetailsOrder[x].ovenTime = startdate;
      // console.log(foodDetailsOrder[x].food, startdate)
    }
    return foodDetailsOrder;
  };

  saveFinalTimings = foodDetailsOrder => {
    this.setState({
      timings: foodDetailsOrder,
      foodList: foodDetailsOrder
    });
  };

  calculateTimesDynamic = () => {
    var foodDetailsOrder = this.cleanFoodList();
    var endTime = this.getEndTime();

    this.setOventimes(foodDetailsOrder, endTime);
    this.saveFinalTimings(foodDetailsOrder);
    this.props.toggleForm();
    this.props.updateTimings(foodDetailsOrder);
  };

  setInitialFoodList = () => {
    var updatedFoodList = [];
    if (this.props.timings.length === 0) {
      for (var a = 0; a < 5; ++a) {
        updatedFoodList.push({ food: "", time: "", ovenTime: "" });
      }
    }

    for (var i = 0; i < this.props.timings.length; ++i) {
      updatedFoodList.push(this.props.timings[i]);
    }

    this.setState({
      foodList: updatedFoodList
    });
  };

  componentDidMount() {
    this.setInitialFoodList();
  }

  render() {
    // console.log(this.state.foodList)

    return (
      <div className="TimeForm">
        {/*<div id="mainContent" className="container" >*/}
        <h3>Add foods and cooking time</h3>

        {this.state.foodList.map((details, idx) => (
          // <TimeFields idx={idx} foodList={this.state.foodList} handleFoodTimeChange={this.handleFoodTimeChange} handleFoodChange={this.handleFoodChange} />
          <Grid key={idx} width={24} gap={24}>
            <div className="leftStyle">
              <input
                type="text"
                placeholder={`What food?`}
                value={details.food}
                onChange={this.handleFoodChange(idx)}
              />
            </div>
            <div className="rightStyle">
              <input
                type="number"
                placeholder={`minutes to cook`}
                value={details.time}
                min="0"
                onChange={this.handleFoodTimeChange(idx)}
              />
              {idx === this.state.foodList.length - 1 && (
                <button className="addButton" onClick={this.handleAddFood}>
                  <img src="/plus-1270001_640.png" width="13px" alt="Add"/>
									Add{/**/}
								</button>
              )}
            </div>
          </Grid>
        ))}
        <div>
          <label htmlFor="endTime">Time to finish?</label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            className="timefield"
            onChange={this.handleChange}
          />
        </div>

        <button onClick={this.calculateTimesDynamic}>Go</button>
      </div>
    );
  }
}

export default TimeForm;
