// App.js or where you define your routes
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyValentine from './pages/MyValentine';
import { WillYouBeMine } from './components/WillYouBeMine';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MyValentine />} />
        <Route exact path="/will-you-be-my-valetine" element={<WillYouBeMine />} />
      </Routes>
    </Router>
  );
}

export default App;
