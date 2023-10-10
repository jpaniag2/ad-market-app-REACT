import React from 'react';
import '../style/components/Home.css'; // Import the CSS file
import Dashboard from './Dashboard'
import NewDashboard from './NewDashboard'

function Home() {
  return (
    <div className="home"> {/* Use the 'home' class for styling */}
      <h2>Dashboard</h2>
      {/* <Dashboard/> */}
      //this is the new dashboard
      <NewDashboard />
    </div>
  );
}

export default Home;
