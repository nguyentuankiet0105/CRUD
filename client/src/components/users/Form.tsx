import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux"
import { useForm, SubmitHandler, Controller, FieldValues } from "react-hook-form"
import { Modal, Box, TextField, Button, MenuItem, Stack, Typography, styled } from '@mui/material';
import Alert from "@components/common/Alert"
import { TUser } from '@interfaces/user-interface';
import { roles } from '@constants/constant';
import { createUser, editUser } from "@service/userService"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const styleForm = {
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

const ImageUpload = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const ImagePreview = styled("img")({
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  border: "2px solid cornflowerblue",
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type TProps = {
  isEdit: boolean,
  isOpen: boolean,
  setIsEdit: () => void,
  setIsOpen: (isOpen: boolean) => void,
  handleOpenForm: () => void,
  editingUser: TUser | null
}

const Form = (props: TProps) => {
  const { isOpen, isEdit, handleOpenForm, setIsOpen, editingUser } = props
  const dispatch = useDispatch()

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const { register, reset, setValue, handleSubmit, control, formState: { errors }, watch } = useForm<TUser>(
    {
      defaultValues: {
        id: "",
        name: "",
        phone: "",
        role: "Admin",
        image: "",
      }
    }
  )

  const imageSource = watch("image")

  useEffect(() => {
    if (editingUser && isEdit) {
      setValue("id", editingUser.id);
      setValue("name", editingUser.name);
      setValue("phone", editingUser.phone);
      setValue("role", editingUser.role);
      setValue("image", editingUser.image);
    }
  }, [editingUser, setValue, isEdit])

  const handleCloseForm = useCallback(() => {
    setIsOpen(!isOpen)
    reset()
  }, [isOpen, reset, setIsOpen])

  const message = useMemo(() => {
    if (editingUser && isEdit) return 'edited'
    return 'created'
  }, [editingUser, isEdit])


  const customRegister = (key: 'id' | 'name' | 'phone' | 'role' | 'image') => {
    return {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file && file[0]) {
          const reader = new FileReader()
          reader.onload = () => {
            if (reader.result) {
              setValue(key, reader.result.toString());
            }
          };
          reader.readAsDataURL(file[0]);
        }
      }
    }
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
          <Box sx={styleForm}>
            {isEdit ?
              <Typography color="#ff5722" variant="h4" component="h2" mb="25px">EDIT USER:  {editingUser?.name}</Typography>
              :
              <Typography color="#2196f3" variant="h4" component="h2" mb="25px">CREATE USER</Typography>
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
                <ImageUpload>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }: FieldValues) =>
                      <>
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload file
                          <VisuallyHiddenInput
                            {...field}
                            {...customRegister("image")}
                            value={field.value?.fineName}
                            error={Boolean(errors.image)}
                            helperText={errors.image ? errors.image.message : null}
                            type="file"
                            accept="image/*"
                          />
                        </Button>
                      </>
                    }
                  />
                  {imageSource && <ImagePreview src={imageSource} alt="pic preview" />}
                </ImageUpload>
                <Button variant="contained" type="submit">Submit</Button>
              </Stack>
            </form>
          </Box>
        </Modal>)}
    </>
  )
}

export default Form