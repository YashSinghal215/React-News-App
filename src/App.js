import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 12;
  country = 'in';

  state={
    progress : 0,
  }

  setProgress= (progress) =>{
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>

        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Navbar />
        <Routes>
          <Route exact path='/' element={ <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general" />} ></Route>
          <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country={this.country} category="business" />} >  </Route>
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country={this.country} category="entertainment" />}>  </Route>
          <Route exact path='/general' element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country={this.country} category="general" />}>  </Route>
          <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country={this.country} category="health" />}>  </Route>
          <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country={this.country} category="science" />}>  </Route>
          <Route exact path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country={this.country} category="sports" />}>  </Route>
          <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country={this.country} category="technology" />}>  </Route>
        </Routes>
      </div>
    )
  }
}