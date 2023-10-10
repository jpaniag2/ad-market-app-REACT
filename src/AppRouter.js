import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AdList from './components/AdList';

function AppRouter() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/ads" element={<AdList/>} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default AppRouter;
