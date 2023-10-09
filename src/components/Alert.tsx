import { Snackbar, Alert } from '@mui/material'

type TProps = {
 showAlert: boolean,
 setShowAlert: (showAlert: boolean) => void,
 typeAlert: string,
 message: string,
}

const AlertMessage = (props: TProps) => {
 const { showAlert, setShowAlert, typeAlert, message } = props;

 const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
   return;
  }
  setShowAlert(false);
 };

 return (
  <Snackbar
   open={showAlert}
   autoHideDuration={3000}
   onClose={handleClose}
   anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
   <Alert onClose={handleClose} severity={typeAlert} sx={{ width: '100%' }} variant="filled" elevation={6} >
    {message}
   </Alert>
  </Snackbar >
 )
}

export default AlertMessage