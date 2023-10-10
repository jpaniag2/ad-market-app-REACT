import React, { useState, useEffect } from 'react';
import '../style/components/Dashboard.css'; // Import the CSS file
import AdFormModal from './AdFormModal';
import { Button, Modal, Form } from 'react-bootstrap';
import { verifyPasscode } from '../authUtils';

function Dashboard() {
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasscodeValid, setPasscodeValid] = useState(false);
  const [isPasscodeRequired, setIsPasscodeRequired] = useState(true); // State to track passcode requirement
  const [passcode, setPasscode] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT_GET_ADS) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setAds(data);
      })
      .catch((error) => {
        console.error('Error fetching ad data:', error);
      });
  }, []);

  const openModal = async () => {
      setIsModalOpen(true); // Close the modal (if open)
      setIsPasscodeRequired(true); // Make sure passcode input is shown

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAd = (formData) => {
    setAds([...ads, formData]);
    closeModal();
  };

  const handlePasscodeSubmit = async () => {
    if (passcode.trim() !== '') {
      const isPasscodeValid = await verifyPasscode(passcode);

      if (isPasscodeValid) {
        setIsPasscodeRequired(false); // Close the passcode input
        setIsModalOpen(true); // Open the modal
        setPasscode('');
      } else {
        alert('Invalid passcode. Please try again.');
        setPasscode('');
      }
    } else {
      alert('Please enter a passcode.');
      setPasscode('');
    }
  };

  return (
    <div className="dashboard">
      <h2>Ads</h2>
      <Button onClick={openModal}>Create New Ad</Button>
      <ul>
        {ads.map((ad) => (
          <li key={ad.adId}>
            <h3>{ad.companyName}</h3>
            <p>{ad.description}</p>
            <p>Price: ${ad.priceOfSubscription}</p>
            <Button>Update</Button>
            <Button>Delete</Button>
          </li>
        ))}
      </ul>

      <Modal show={isModalOpen} onHide={closeModal} size='sm'>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isPasscodeRequired ? (
            <Form>
              <Form.Group controlId="passcode">
                <Form.Label>Enter Passcode:</Form.Label>
                <Form.Control
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handlePasscodeSubmit}>
                Submit Passcode
              </Button>
            </Form>
          ) : (
            <AdFormModal/>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {!isPasscodeRequired && (
            <Button variant="primary" onSubmit={handleCreateAd}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
