// App.js or where you define your routes
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyValentine from './pages/MyValentine';
import { WillYouBeMine } from './components/WillYouBeMine';
import { CreateYourOwn } from './components/CreateYourOwn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MyValentine />} />
        <Route exact path="/will-you-be-my-valentine" element={<WillYouBeMine />} />
        <Route exact path="/create-your-own" element={<CreateYourOwn />} />
      </Routes>
    </Router>
  );
}

export default App;
