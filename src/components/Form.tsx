import { useState } from 'react'
import Button from '@mui/material/Button';
import { Modal, Box } from '@mui/material';

const Form = () => {
 const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 };
 const [isOpen, setIsOpen] = useState(false)

 const handleOpen = () => {
  setIsOpen(true)
 }
 const handleClose = () => {
  setIsOpen(false)
 }
 return (
  <>
   {!isOpen ?
    (<Button variant="contained" onClick={handleOpen}>
     Add New
    </Button>)
    :
    (<Modal
     open={isOpen}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
    >
     <Box sx={style}>
      <h1>xxxx</h1>
     </Box>
    </Modal>)}
  </>
 )
}

export default Form