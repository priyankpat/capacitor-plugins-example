import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Plugins } from '@capacitor/core';

import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const { SpeechRecognition } = Plugins;

SpeechRecognition.available()
.then((data: any) => {
  const { available } = data;

  console.warn('Speech Recognition is ' + (available ? 'Available' : 'Not Available'));
})
.catch((err: any) => {
  console.error('Failed to check for Speech Recognition availability with error: ' + err);
});

SpeechRecognition.getSupportedLanguages()
.then((data: any) => {

  console.warn('Supported languages: ' + JSON.stringify(data));
})
.catch((err: any) => {
  console.error('Failed to get list of supported languages: ' + err);
});

SpeechRecognition.hasPermission()
.then((data: { permission: boolean; }) => {
  const { permission } = data;
  if (permission) {
    console.warn('Already have permissions.');
  } else {
    console.warn('Does not have permissions. Requesting...');

    SpeechRecognition.requestPermission();
  }
})
.catch((err: any) => {
  console.error('Failed to check for permission due to ' + err);
});

SpeechRecognition.start({
  language: 'en-US',
  maxResults: 2,
  prompt: 'Say something',
  partialResults: false,
  popup: true,
})
.then((data: any) => {
  console.warn("Results: " + data);
})
.catch((err: any) => {
  console.error('Failed to listen to speech due to ' + err);
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
