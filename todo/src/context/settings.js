import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  let [title, setTitle] = useState('Random Title');
  let [twitter, setTwitter] = useState('@CodeFellows');

  const state = {
    title,
    twitter,
    changeTitle: setTitle,
    changeTwitter: setTwitter,
  }

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;