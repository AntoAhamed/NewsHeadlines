import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar height={3} color='red' progress={this.state.progress} />
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<News setProgress={this.setProgress} />} />
              <Route exact path="business" element={<News setProgress={this.setProgress} Key="business" category="business" />} />
              <Route exact path="entertainment" element={<News setProgress={this.setProgress} Key="entertainment" category="entertainment" />} />
              <Route exact path="general" element={<News setProgress={this.setProgress} Key="general" category="general" />} />
              <Route exact path="health" element={<News setProgress={this.setProgress} Key="health" category="health" />} />
              <Route exact path="science" element={<News setProgress={this.setProgress} Key="science" category="science" />} />
              <Route exact path="sports" element={<News setProgress={this.setProgress} Key="sports" category="sports" />} />
              <Route exact path="technology" element={<News setProgress={this.setProgress} Key="technology" category="technology" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
