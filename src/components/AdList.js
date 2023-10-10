import React, { useState, useEffect } from 'react';
import '../style/components/AdList.css'; // Import the CSS file
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdList() {
  const [ads, setAds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

  // Fetch ad data from your API when the component mounts
  useEffect(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT_GET_ADS) // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched ad data
        setAds(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching ad data:', error);
      });
  }, []);

  const handleDelete = (adId) => {
    // Make a DELETE request to your API to delete the ad with the given adId
    fetch(`${process.env.REACT_APP_API_ENDPOINT_DELETE_AD_BY_ID}${adId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // After successful deletion, update the state by removing the deleted ad
        setAds((prevAds) => prevAds.filter((ad) => ad.adId !== adId));
        handleCloseDeleteModal(); // Close the delete confirmation modal
        console.log(adId + ' has been successfully deleted.');
      })
      .catch((error) => {
        console.error('Error deleting ad:', error);
      });
  };

  const handleEdit = (adId) => {
    // Implement your edit functionality here, e.g., navigate to an edit page or open a modal
    console.log(`Editing ad with ID: ${adId}`);
  };

  const handleShowDeleteModal = (adId) => {
    setAdToDelete(adId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setAdToDelete(null);
  };

  return (
    <div className="ad-list" style={{margin: '10% 30% 0% 18%'}}>
      <h1 style={{textAlign: 'left'}}>Running Ads</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.adId}>
          <div style={{display:'flex', textAlign: 'left', marginLeft: '15%'}}>
            <div style={{flex: '1'}}>
            <h3>{ad.companyName} - {ad.typeOfMonthlySubscription}</h3>
            <p>{ad.description}</p>
            <p>Payment Status: ${ad.priceOfSubscription} - {ad.paymentStatus}</p>
            </div>
            <div style={{flex:'1', textAlign: 'right'}}>
            <Button variant="primary" onClick={() => handleEdit(ad.adId)}>
              Edit
            </Button>{' '}
            <Button variant="danger" onClick={() => handleShowDeleteModal(ad.adId)}>
              Delete
            </Button>
            </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ad?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(adToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdList;


