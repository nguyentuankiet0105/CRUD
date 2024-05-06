
import {
 Alert,
 AlertTitle,
 Button,
 Dialog as MuiDialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle
} from '@mui/material'

type TProps = {
 openDialog: boolean,
 setOpenDialog: (openDialog: boolean) => void,
 handleConfirm: () => void,
 title?: string,
 content?: string,
}

const Dialog = (props: TProps) => {
 const { openDialog, setOpenDialog, handleConfirm, title, content } = props

 const handleCloseDialog = () => {
  setOpenDialog(false)
 }

 return (
  <>
   <MuiDialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
   >
    <DialogTitle id="alert-dialog-title">
     <Alert severity="warning" variant="outlined" elevation={2} >
      <AlertTitle><strong>Warning</strong></AlertTitle>
      {title}
     </Alert>
    </DialogTitle>
    <DialogContent>
     <DialogContentText id="alert-dialog-description">
      {content}
     </DialogContentText>
    </DialogContent>
    <DialogActions>
     <Button onClick={handleCloseDialog}>Disagree</Button>
     <Button onClick={handleConfirm} autoFocus>
      Agree
     </Button>
    </DialogActions>
   </MuiDialog>
  </>
 )
}

export default Dialog