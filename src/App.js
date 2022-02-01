import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import {fetchResponseJson} from './fetchResponseJson'

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
    }
  }
  
  componentDidMount() {
    return fetchResponseJson('http://localhost:8000/').then((responseJson) => {
      this.setState({
        items: responseJson
      })
    })
  }

  render() {
    
    if(this.state.items.length===0){
      return<span>Loading...</span>;
    } 
    else {
      return (
        <span>{JSON.stringify(this.state.items)}</span>
      )
    }
  }
}


export default App;
