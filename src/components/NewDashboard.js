import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NewModal from './NewAdModal';
import { verifyPasscode, getUniqueAdId } from '../authUtils';
import RequestPasscodeModal from './RequestPasscode';

function NewDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRequestPasscodeModal = () => {
    setIsRequestModalOpen(true);
  };

  const closeRequestPasscodeModal = () => {
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <Button onClick={openRequestPasscodeModal} style={{margin: '1rem'}}>Request Passcode</Button>
      <RequestPasscodeModal 
        isOpen={isRequestModalOpen}
        onClose={closeRequestPasscodeModal}
      />

      <Button onClick={openModal} style={{margin: '1rem'}}>Already have Passcode?</Button>
      <NewModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onUpdate={closeModal} // Handle modal close after successful update
        verifyPasscode={verifyPasscode}
        getUniqueAdId={getUniqueAdId}
      />
    </>
  );
}

export default NewDashboard;

