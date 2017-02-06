import styles from './index.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import VideoReader from './components/video/video'

class App extends Component {
  render() {
    return (
      <div className={styles.content}>
        <VideoReader/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
