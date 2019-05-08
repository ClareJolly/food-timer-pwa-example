import React, { Component } from 'react';
import Grid from 'react-css-grid'
import '../containers/App.css';

class TimeFields extends Component {

  constructor(props) {
    super(props)

    console.log(this.props)
    this.state = {
      food:'',
      time:''
    }

  }

  handleChange = (event) => {
    console.log(event.target.name)
    this.setState({
      [event.target.name] : event.target.value
    })
  }



  render() {

    console.log(this.state)


    return (
      <div className="TimeFields" key={this.props.idx}>
      <div id="mainContent" className="container" >
          <Grid

        width={24}
        gap={24}>

            <div className="leftStyle"><input
            name="food"
              type="text"
              placeholder={`What food TEST?`}
              value={this.state.food}
              // {/*onChange={this.props.handleFoodChange}*/}
              onChange={() => this.props.handleFoodChange(this.props.idx)}
            />
            </div><div className="rightStyle">
            <input
            name="time"
              type="number"
              placeholder={`minutes to cook`}
              value={this.state.time}
              min="0"
              // {/*onChange={this.props.handleFoodTimeChange}*/}
              onChange={() => this.props.handleFoodTimeChange(this.props.idx)}
            />
            {this.props.idx === this.props.foodList.length-1 && <button className="addButton" onClick={this.handleAddFood}>Add</button>}
            </div>
            {/*// <div className="rightStyle">
            //
            //
            // &nbsp;
            // </div>*/}
            </Grid>
            </div>



      </div>
    );
  }
}

export default TimeFields;
