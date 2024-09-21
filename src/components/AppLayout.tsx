import React from 'react';

import './App.scss';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar/>
      <MainContent/>
    </div>
  );
};

export default App;
