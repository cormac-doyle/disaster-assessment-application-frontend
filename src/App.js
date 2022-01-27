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
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(json =>{
          this.setState({
            isLoaded: true,
            items: json,
          })
      });
  }

  render() {
    
    var{ isLoaded, items} = this.state;

    console.log( "items:" + JSON.stringify(items))

    if(!isLoaded){
      return<div>Loading...</div>;
    } 
    else {
      return (
        <div className ="App">
          {JSON.stringify(items)}
        </div>
      )
    }
  }
}

export default App;
