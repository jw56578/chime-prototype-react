import React from 'react';
import { useState, useEffect } from 'react';


function ListAudioDevices() {
  let divs = null;
  let [audioInputDevices, setAudioInputDevices] = useState([]);
  useEffect(() => {
    async function getAudioDevices() {
      // An array of MediaDeviceInfo objects
      const devices = await window.meetingSession.audioVideo.listAudioInputDevices();
      setAudioInputDevices(devices);
      console.log(devices);
    }
    getAudioDevices();
  }, [])
  divs = audioInputDevices.map(mediaDeviceInfo => {
    return <div>Device ID: {mediaDeviceInfo.deviceId} Microphone: {mediaDeviceInfo.label}</div>
  });
  return (
    <div>
      {divs}
    </div>
  );
}

export default ListAudioDevices;
