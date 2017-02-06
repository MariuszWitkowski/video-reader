import React, { Component } from 'react'
import { render } from 'react-dom'

import VideoReader from './components/video/video'

class App extends Component {
  render() {
    return (
      <VideoReader/>
    )
  }
}

render(<App/>, document.getElementById('app'))
