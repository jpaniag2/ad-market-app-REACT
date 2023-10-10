import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from 'styled-components'


function NewAdModal({ isOpen, onClose, onUpdate, verifyPasscode, getUniqueAdId }) {
  const [AdData, setAdData] =useState('');
  const [passcode, setPasscode] = useState('');
  const [isPasscodeValid, setIsPasscodeValid] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    nameOfCustomer: '',
    phoneNumber: '',
    image: '',
    description: '',
    typeOfMonthlySubscription: '',
    priceOfSubscription: 0.0,
    paymentStatus: '',
    daysLeftOfSubscription: 0,
  });

  // Whenever the modal is opened, reset the passcode validation
  useEffect(() => {
    setIsPasscodeValid(false);
    setPasscode('');
    setAdData('');
  }, [isOpen]);

  const handlePasscodeSubmit = async () => {
    if (passcode.trim() !== '') {
      const isPasscodeValid = await verifyPasscode(passcode);

      if (isPasscodeValid) {
        // Passcode is valid, allow displaying the form for updating customer information
        setIsPasscodeValid(true);
        setAdData(await getUniqueAdId(passcode));

      } else {
        alert('Invalid passcode. Please try again.');
        setPasscode('');
      }
    } else {
      alert('Please enter a passcode.');
    }
  };

  const handleFormSubmit = () => {
    // Make a PUT request to update customer information
    // Replace 'YOUR_UPDATE_ENDPOINT' with your actual API endpoint

    const numericPrice = parseFloat(formData.priceOfSubscription);
    const numericDaysLeft = parseInt(formData.daysLeftOfSubscription);
    const AccountNumber = AdData.adId;
    setFormData({
        ...formData,
        priceOfSubscription: numericPrice,
        daysLeftOfSubscription: numericDaysLeft,
      });

    const endpoint = `ads/${AccountNumber}`  
    const url = `http://localhost:3000/${endpoint}`
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Send the populated formData object
    })
      .then((response) => response.json())
      .then((updatedData) => {
        onUpdate(updatedData)
        // Handle the response or update state as needed
        // For example, you can call a callback function to update parent state
        // onUpdate(updatedData);
        onClose(); // Close the modal after a successful update
      })
      .catch((error) => {
        console.error('Error updating customer information:', error);
      });
  };

  const Style = styled.div`

`

  return (
    <Modal show={isOpen} onHide={onClose} backdrop={false} size='xl' centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Ad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isPasscodeValid ? (
          <Form>
            <Form.Group>
            <Form.Label>Enter Passcode:</Form.Label>
            <Form.Control
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            
            </Form.Group>
          </Form>
        ) : (
          <Form>
            {/* Customer information form fields */}
            <h3>Account Number: {AdData.adId}</h3>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="nameOfCustomer">
              <Form.Label>Name of Customer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of customer"
                value={formData.nameOfCustomer}
                onChange={(e) =>
                  setFormData({ ...formData, nameOfCustomer: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="typeOfMonthlySubscription">
              <Form.Label>Type of Monthly Subscription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type of subscription"
                value={formData.typeOfMonthlySubscription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    typeOfMonthlySubscription: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="priceOfSubscription">
              <Form.Label>Price of Monthly Subscription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price of subscription"
                value={formData.priceOfSubscription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceOfSubscription: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="paymentStatus">
              <Form.Label>Payment Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter payment status"
                value={formData.paymentStatus}
                onChange={(e) =>
                  setFormData({ ...formData, paymentStatus: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="daysLeftOfSubscription">
              <Form.Label>Days Left of Subscription</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter days left of subscription"
                value={formData.daysLeftOfSubscription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daysLeftOfSubscription: e.target.value,
                  })
                }
              />
            </Form.Group>
            {/* Add more form fields for other customer information */}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {!isPasscodeValid && (
          <Button variant="primary" onClick={handlePasscodeSubmit}>
              Submit Passcode
            </Button>)}
        {isPasscodeValid && (
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default NewAdModal;

