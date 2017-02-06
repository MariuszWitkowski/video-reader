import styles from './video.css'

import React from 'react'

const mapPause = {
  '2.3': {
    timeout: 3000,
    x: 650,
    y: 60,
    r: 115
  },
  '5.0': {
    timeout: 2000,
    x: 400,
    y: 280,
    r: 20
  }
}

export default class VideoReader extends React.Component {
  componentDidMount() {
    console.log('mount', this)
    this.ctx = this.refs.canvasNode.getContext('2d')
  }

  loadFile(event) {
    let file = event.target.files[0],
        canPlay = this.refs.videoNode.canPlayType(file.type) !== ''

    if (!canPlay) {
      return
    }

    this.refs.videoNode.src = window.URL.createObjectURL(file)
  }

  play(event) {
    if (!this.refs.videoNode.src) {
      return
    }

    let video = this.refs.videoNode
    if (video.paused) {
      this.refs.videoNode.play()
      event.target.innerHTML = 'Pause'
    }
    else {
      this.refs.videoNode.pause()
      event.target.innerHTML = 'Play'
    }
  }

  fullScreen() {
    if (this.refs.videoNode.requestFullscreen) {
      this.refs.videoNode.requestFullscreen()
    } else if (this.refs.videoNode.mozRequestFullScreen) {
      this.refs.videoNode.mozRequestFullScreen() // Firefox
    } else if (this.refs.videoNode.webkitRequestFullscreen) {
      this.refs.videoNode.webkitRequestFullscreen() // Chrome and Safari
    }
  }

  changeDuration(event) {
    if (!this.refs.videoNode.src) {
      return
    }

    let time = this.refs.videoNode.duration * (event.target.value / 100)
    this.refs.videoNode.currentTime = time
  }

  updateDuration(event) {
    let value = (100 / this.refs.videoNode.duration) * this.refs.videoNode.currentTime
    this.refs.seekBar.value = value
    console.log('duration:%s; mapPause:%s;',
      this.refs.videoNode.currentTime.toFixed(1),
      !!mapPause[this.refs.videoNode.currentTime.toFixed(1)])
    let pauseParams = mapPause[this.refs.videoNode.currentTime.toFixed(1)]
    if (pauseParams) {
      this.refs.videoNode.pause()
      this.loadMap(pauseParams)
    }
  }

  loadMap(params) {
    this.ctx.clearRect(0, 0, this.refs.canvasNode.width, this.refs.canvasNode.height)
    this.ctx.fillStyle = 'green'
    // this.ctx.fillRect(10, 10, 100, 100)
    this.ctx.arc(params.x, params.y, params.r, 0, 2 * Math.PI, false)
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = '#f00'
    this.ctx.stroke()
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.refs.canvasNode.width, this.refs.canvasNode.height)
      this.refs.videoNode.play()
    }, params.timeout)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>HTML5 local video file player example</div>
        <input className={styles.input} type="file" accept="video/*" onChange={this.loadFile.bind(this)}/>
        <video ref="videoNode" className={styles.video} onTimeUpdate={this.updateDuration.bind(this)}></video>
        <canvas ref="canvasNode" width="800" height="560" className={styles.canvas}></canvas>
        <div className={styles.controls}>
          <button type="button" onClick={this.play.bind(this)}>Play</button>
          <input ref="seekBar" type="range" onChange={this.changeDuration.bind(this)}/>
          <button type="button" onClick={this.fullScreen.bind(this)}>Full-Screen</button>
        </div>
      </div>
    )
  }
}
