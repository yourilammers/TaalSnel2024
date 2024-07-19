import React from 'react';
import {Hero, Frontdemo} from './components'
import AppAppBar from './components/AppAppBar';


function App() {
  
  return (
    <div className="App">
      <AppAppBar/>
      <Hero />
      <Frontdemo/>
    </div>
  );
}

export default App;
