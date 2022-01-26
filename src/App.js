import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import HelloWorldText from './HelloWorldText';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
    }
  }

  componentDidMount(){
    fetch('http://127.0.0.1:8000/')
      .then((res) => res.json())
      .then((json) =>{
          this.setState({
            isLoaded: true,
            items: json,
          })
      });
  }

  render() {

    var{ isLoaded, items} = this.state;

    if(!isLoaded){
      return<div>Loading...</div>;
    } 
    else {
      return (
        <div className ="App">
          Data has been loaded
        </div>
      )
    }
  }

}

export default App;
