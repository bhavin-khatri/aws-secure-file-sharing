import React, { Component } from 'react';
import { Logger } from '../Components/Logger/Logger'
// import ck from 'classnames';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 42,
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }
  incrementCounter() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  }

  componentDidMount() {
    fetch('https://product-bucket-user-abwm.s3.ap-south-1.amazonaws.com/Mobile-app/CMS_API/cms_API_response.json')
      .then((response) => response.text())
      .then((text) => {
        try {
          const json = JSON.parse(text);
          Logger('Parsed JSON: ', json);
        } catch (parseError) {
          Logger("JSON parsing failed: ", parseError.message);
        }
      })
      .catch((error) => {
        Logger("Fetch failed: ", error.message || error);
      });
  }

  render() {
    return (
      <div>
        <h2 className="counter">{this.state.counter}</h2>
        <button className="counter-button" onClick={this.incrementCounter}>
          Click
        </button>
        <style>{`.counter-button{
           font-size:1rem;
           padding:5px 10px;
           color:#585858
        }`}</style>
      </div>
    );
  }
}
