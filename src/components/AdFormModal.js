import React, { useState } from 'react';
import '../style/components/AdFormModal.css'; // Import the CSS file

function AdFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    nameOfCustomer: '',
    phoneNumber: '',
    image: '',
    description: '',
    typeOfMonthlySubscription: '',
    priceOfSubscription: 0,
    paymentStatus: '',
    daysLeftOfSubscription: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the API call to create a new ad with formData here
    // After creating the ad, you can close the modal by calling onClose()
  };

  return (
      <div >
        <h3>Create a New Ad</h3>
        <form onSubmit={handleSubmit}>
          {/* Add your input fields here */}
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          {/* Add other input fields similarly */}
          <button type="submit">Create</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
  );
}

export default AdFormModal;
