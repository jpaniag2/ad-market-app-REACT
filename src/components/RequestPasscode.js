// RequestPasscodeModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { verifyPasscode, getUniqueAdId } from '../authUtils';

function RequestPasscodeModal({ isOpen, onClose, onCreatePasscode }) {
  const [passcode, setPasscode] = useState('');
  const [adId, setAdId] = useState('');

  useEffect(() => {
    setPasscode('');
  }, [isOpen]);

  const handleCreatePasscode = async () => {
    try {
    // Make a POST request to create a passcode
    // Replace 'http://localhost:3000/newAd' with your actual API endpoint
    const response = await fetch('http://localhost:3000/newAd', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
    if (response.ok) {
        const data = await response.json();

        // Set the created passcode and associated adId in the local state
        setPasscode(data.passcode);

        // Use the created passcode to retrieve the associated adId
        const uniqueAdId = await getUniqueAdId(data.passcode);
        setAdId(uniqueAdId);
      } else {
        console.error('Error creating passcode:', response.status);
      }
    } catch (error) {
      console.error('Error creating passcode:', error);
    }
  };

  const handleCancel = async () => {
    try {

        // Make a POST request to create a passcode
        const url = `http://localhost:3000/ads/${adId}`
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })
        if (response.ok) {

          // Close the modal
          onClose();
        } else {
          console.error('Error deleting passcode:', response.status);
        }
      }
      catch(error) {
        console.error('Error deleting passcode:', error);
      }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Passcode</Modal.Title>
      </Modal.Header>
      <Button variant="primary" onClick={handleCreatePasscode}>
          Request Passcode
        </Button>
      <Modal.Body>
        {passcode && (
          <div>
            <h4>Passcode:</h4>
            <p>{passcode}</p>
          </div>
        )}
        {adId && (
          <div>
            <h4>Ad ID:</h4>
            <p>{adId}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestPasscodeModal;
