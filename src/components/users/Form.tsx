import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux"
import { useForm, SubmitHandler, Controller, FieldValues } from "react-hook-form"
import { Modal, Box, TextField, Button, MenuItem, Stack, Typography } from '@mui/material';
import Alert from "@components/Alert"
import { TUser } from '@interfaces/user-interface';
import { roles } from '@constants/constant';
import { createUser, editUser } from "@service/userService"


type TProps = {
  isEdit: boolean,
  isOpen: boolean,
  setIsEdit: () => void,
  setIsOpen: (isOpen: boolean) => void,
  handleOpenForm: () => void,
  editingUser: TUser | null
}

const Form = (props: TProps) => {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    border: '1px solid gray',
    boxShadow: 24,
    p: 4,
  };
  const { isOpen, isEdit, handleOpenForm, setIsOpen, editingUser } = props
  const dispatch = useDispatch()

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const { register, reset, setValue, handleSubmit, control, formState: { errors } } = useForm<TUser>(
    {
      defaultValues: {
        id: "",
        name: "",
        phone: "",
        role: "Admin",
      }
    }
  )

  useEffect(() => {
    if (editingUser && isEdit) {
      setValue("id", editingUser.id);
      setValue("name", editingUser.name);
      setValue("phone", editingUser.phone);
      setValue("role", editingUser.role);
    }
  }, [editingUser, setValue, isEdit])

  const handleCloseForm = () => {
    setIsOpen(!isOpen)
    reset()
  }
  const handlCreateUser: SubmitHandler = (data: TUser) => {
    if (editingUser && isEdit) {
      dispatch(editUser(data))
    } else {
      dispatch(createUser(data))
    }
    setShowAlert(true)
    handleCloseForm()
  }

  const message = useMemo(() => {
    if (editingUser && isEdit) return 'edited'
    return 'created'
  }, [editingUser, isEdit])

  return (
    <>
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        typeAlert="success"
        message={`The user has been successfully ${message}.`}
      />
      {!isOpen ?
        (<Button variant="contained" onClick={handleOpenForm}>
          Add New
        </Button>)
        :
        (<Modal
          open={isOpen}
          onClose={handleCloseForm}
          onBackdropClick={handleCloseForm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Box sx={style}>
            {isEdit ?
              <Typography color="#ff5722" variant="h4" component="h2" mb="25px">Edit User:  {editingUser?.name}</Typography>
              :
              <Typography color="#2196f3" variant="h4" component="h2" mb="25px">Create User</Typography>
            }
            <form onSubmit={handleSubmit(handlCreateUser)}>
              <Stack spacing={2}>
                <Controller
                  name="id"
                  control={control}
                  rules={{ required: '* Id is required' }}
                  render={({ field }: FieldValues) =>
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="Id"
                      error={Boolean(errors.id)}
                      helperText={errors.id ? errors.id.message : null}
                    />
                  }
                />
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: '* Name is required' }}
                  render={({ field }: FieldValues) =>
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="Name"
                      error={Boolean(errors.name)}
                      helperText={errors.name ? errors.name.message : null}
                    />
                  }
                />
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: '* Phone is required' }}
                  render={({ field }: FieldValues) =>
                    <TextField
                      {...field}
                      id="outlined-required"
                      label="Phone"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone ? errors.phone.message : null}
                    />
                  }
                />
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: '* Role is required' }}
                  render={({ field }: FieldValues) =>
                    <TextField
                      {...field}
                      select
                      id="outlined-required"
                      label="Role"
                      defaultValue="Admin"
                      {...register("role", { required: 'This is required' })}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  }
                />

                <Button variant="contained" type="submit">Submit</Button>
              </Stack>
            </form>
          </Box>
        </Modal>)}
    </>
  )
}

export default Form