import React, { Component } from 'react';

class ScreenReader extends Component {
  constructor(props) {
    super(props);
    this.activateCamera = this.activateCamera.bind(this);
  }

  componentDidMount() {
    this.activateCamera();
  }

  activateCamera() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        let thedevice;
        for(let device of devices) {
          if (device.kind == 'videoinput') {
            thedevice = navigator.mediaDevices.getUserMedia({
              "video": {
                deviceId: {exact : device.deviceId},
                width: { max: 640 }
              }
            });
          }
        }
        return thedevice;
    });
  }

  render() {
    return(
      <div>Screen Reader</div>
    )
  }
};

export default ScreenReader;