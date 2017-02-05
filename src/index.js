//Libraries
import React, { Component } from 'react';
import { style } from 'glamor';

//Styles
import styles from './styles';

class ScreenReader extends Component {
  constructor(props) {
    super(props);
    this.activateCamera = this.activateCamera.bind(this);
    this.captureImage = this.captureImage.bind(this);
    this.state = {
      stream: null,
      video: {
        src: ''
      },
      canvas: {
        el: document.getElementById('viewport'),
        width: 0,
        height: 0,
        style: {
          visibility: ''
        }
      },
      capturer: null,
      currentRaqId: null,
      scale: 0,
      currentFrame: null,
      videoSrc: ''
    }
  }

  activateCamera() {
    let self = this;
    return new Promise((resolve) => {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          let stream;
          for(let device of devices) {
            if (device.kind == 'videoinput') {
              stream = navigator.mediaDevices.getUserMedia({
                "video": {
                  deviceId: {exact : device.deviceId},
                  width: { max: 640 }
                }
              });
            }
          }
        return stream;
      }).then((stream) => {
        //window.URL.bind(options.context);
        self.setState({
          videoSrc: window.URL.createObjectURL(stream)
        });
        
        document.getElementById('start').disabled = true;
        
        self.setState({
          capturer: new ImageCapture(stream.getVideoTracks()[0])
        })

        //this.captureImage();
      })
    });
  }

  processFrame(options) {
    
  }

  captureImage() {
    return new Promise((resolve, reject) => {
      let self = this;
      try {
        this.setState({
          currentRaqId: requestAnimationFrame(() => {
            self.state.capturer.grabFrame()
              .then(bitmap => {
                let canvasWithUpdatedProps = Object.assign({
                  width: bitmap.width + 20,
                  height: bitmap.height + 20,
                  style: {
                    visibility: "visible"
                  },
                  el: document.getElementById('viewport')
                });
                self.setState({
                  canvas: canvasWithUpdatedProps
                })
                let ctx = self.state.canvas.el.getContext("2d");
                ctx.drawImage(bitmap, 10, 10, bitmap.width, bitmap.height);
                window.requestAnimationFrame.bind(self);
                let currentRadId = requestAnimationFrame(self.captureImage);
                self.setState({
                  scale: 1,
                  currentFrame: bitmap,
                  currentRaqId: currentRadId 
                });
              });
          })
        })
      } catch (err) {
        reject(err);
      }
    });
  }

  render() {
    return(
      <div>
        <h3>Screen Reader</h3>
        <button id="start" onClick={this.activateCamera} {...style(styles.general.clearfix)}>Start</button>
        {/*<canvas id="viewport"/>*/}
        <video id="video" src={this.state.videoSrc}></video>
      </div>
    )
  }
};

export default ScreenReader;