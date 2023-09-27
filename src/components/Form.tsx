import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import { TUser } from '@interfaces/user-interface';
import { roles } from '@constants/constant';

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
  const { register, handleSubmit } = useForm<TUser>()

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<TUser> = (data: TUser) => {
    console.log(data);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                id="outlined-required"
                label="Id"
                {...register("id")}
              />
              <TextField
                required
                id="outlined-required"
                label="Name"
                {...register("name")}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone"
                {...register("phone")}
              />
              <TextField
                required
                select
                id="outlined-required"
                label="Role"
                defaultValue="2"
                {...register("role")}
              >
                {roles.map((option) => (
                  <MenuItem  key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button variant="contained" type="submit">Submit</Button>
            </form>
          </Box>
        </Modal>)}
    </>
  )
}

export default Form