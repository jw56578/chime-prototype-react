import React from 'react';
import './App.css';
import ListAudioDevices from './components/ListDevices/ListAudioDevices'

function App() {
  return (
    <div className="App">
      <ListAudioDevices></ListAudioDevices>
    </div>
  );
}

export default App;
