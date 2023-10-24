import React from 'react';
import '../style/components/Home.css'; // Import the CSS file
import Dashboard from './Dashboard'
import NewDashboard from './NewDashboard'
import AdList from './AdList';
import {Container,Row, Col} from 'react-bootstrap'

function Home() {
  return (
    <div className="home"> {/* Use the 'home' class for styling */}
      <h2>Dashboard</h2>
      {/* <Dashboard/> */}
      <Container fluid>
      <Row>
        <Col>
        <AdList style={{margin: '0'}}/>
        </Col>
        <Col>
        <NewDashboard />
        </Col>
      </Row>
      
      
      </Container>
    </div>
  );
}

export default Home;
