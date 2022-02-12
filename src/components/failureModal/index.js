import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ff236a',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FailureModal(props) {
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
            Oh no!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You weren't able to get the word. Do you want to try again?
          </Typography>
          <br/>
          <Button style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Gordita Medium' }} disableElevation variant="contained" onClick={() => window.location.reload()}>Yes!</Button>
        </Box>
      </Modal>
  );
}