import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SuccessModal(props) {
  const handleClose = () => props.closeModal();

  return (
    <Modal
        open={props.isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            That's right!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You got the word right! Take a screenshot, challenge your friends, and come back tomorrow for the next word!
          </Typography>
        </Box>
      </Modal>
  );
}