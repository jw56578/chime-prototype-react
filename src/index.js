import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';

async function init(){
  const logger = new ConsoleLogger('MyLogger', LogLevel.INFO);
  const deviceController = new DefaultDeviceController(logger);

  // this is the object that is create by calling chime.createMeeting on the server
  // it is currently hard coded for simplicity sake
  /* The response from the CreateMeeting API action */;
  const meetingResponse = {"Meeting":{"MeetingId":"ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","ExternalMeetingId":"75b84173-28c4-4c17-a34c-6d5c35f2a2b1","MediaPlacement":{"AudioHostUrl":"0c7d426b8dcd85570964a97d1e5f4af6.k.m1.ue1.app.chime.aws:3478","AudioFallbackUrl":"wss://haxrp.m1.ue1.app.chime.aws:443/calls/ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","ScreenDataUrl":"wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","ScreenSharingUrl":"wss://bitpw.m1.ue1.app.chime.aws:443/v2/screen/ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","ScreenViewingUrl":"wss://bitpw.m1.ue1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","SignalingUrl":"wss://signal.m1.ue1.app.chime.aws/control/ca02aaf4-cb3d-4114-b8eb-6d88c5f75709","TurnControlUrl":"https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions"},"MediaRegion":"us-east-1"}};
  // this is the object that is create by calling chime.createAttendee on the server
  /* The response from the CreateAttendee or BatchCreateAttendee API action */;
  const attendeeResponse = {"Attendee":{"ExternalUserId":"e10b7011-f568-4229-b8b5-b480ba9490a3","AttendeeId":"00dbd8bc-5076-030b-e064-7f757d07a3d6","JoinToken":"MDBkYmQ4YmMtNTA3Ni0wMzBiLWUwNjQtN2Y3NTdkMDdhM2Q2OjkwNzNiM2VjLTM0NTQtNDAzYS1hNTAwLTM2Njk4NjM3NTA2MA"}};

  const configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);

  // In the usage examples below, you will use this meetingSession object.
  const meetingSession = new DefaultMeetingSession(
    configuration,
    logger,
    deviceController
  );
 
  // this has to be done if you want javascript to be able to get a list of audio devices
  // there is no other way to get he permission pop up to show
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  // i'm not sure if this is working, video = false
  // this is just part of the chime api, need to investigate further
  meetingSession.audioVideo.setDeviceLabelTrigger(
    async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      return stream;
    }
  );


try{
  stream = await navigator.mediaDevices.getUserMedia({ video: true });
}
catch{
console.log("there is no camera")
}




  window.meetingSession = meetingSession;
  console.log(window.meetingSession)
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
}
init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
