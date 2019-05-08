import React, { Component } from "react";
// import logo from './logo.svg';
import Header from "../components/Header";
import TimeForm from "./TimeForm";
import TimingList from "../components/TimingList";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timings: [],
      showForm: true
    };

    this.updateTimings = this.updateTimings.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  updateTimings = (timings) => {
    this.setState({
      timings: timings
    });
  };

  restart = () => {
    window.location.reload();
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  goBack = () => {
    this.toggleForm();
  };

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.showForm && (
          <TimeForm
            timings={this.state.timings}
            updateTimings={this.updateTimings}
            toggleForm={this.toggleForm}
            listLength={this.listLength}
          />
        )}
        {!this.state.showForm && <TimingList timings={this.state.timings} />}
        {!this.state.showForm && (
          <div>
            <button onClick={this.goBack}>Back</button>
          </div>
        )}
        {!this.state.showForm && (
          <div>
            <button onClick={this.restart}>Start again</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
