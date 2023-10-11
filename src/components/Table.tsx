import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination
} from '@mui/material';
import { tableForm } from '@constants/constant'
import { TUser } from "@interfaces/user-interface"
import Alert from "@components/Alert"
import Dialog from '@components/Dialog';

type TProps = {
  data: TUser[],
  userDelete: TUser,
  totalPage: number,
  page: number,
  rowsPerPage: number,
  showAlert: boolean,
  openDialog: boolean,
  handleChangePage: () => void,
  handleChangeRowsPerPage: () => void,
  setShowAlert: (showAlert: boolean) => void,
  setOpenDialog: (openDialog: boolean) => void,
  handleEditUser: (id: string) => void,
  handleDeleteUser: (id: string) => void,
  handleConfirmDelete: () => void,
}

const TableCustom = (props: TProps) => {
  const { data,
    userDelete,
    totalPage,
    page,
    rowsPerPage,
    showAlert,
    openDialog,
    handleChangePage,
    handleChangeRowsPerPage,
    setShowAlert,
    setOpenDialog,
    handleEditUser,
    handleDeleteUser,
    handleConfirmDelete
  } = props

  return (
    <>
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 320 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableForm && tableForm.head.map((item, index) => (
                <TableCell key={index} align="center" className='table__label'>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.map((item: TUser) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.role}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleEditUser(item.id)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20]}
        />
      </TableContainer>
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        typeAlert="info"
        message={`You has been deleted user: ${userDelete?.name} !`}
      />
      <Dialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete user ${userDelete?.name} ?`}
        content={`This action will remove user ${userDelete?.name} from the list, and it cannot be undone. Please proceed with caution !`}
      />
    </>
  )
}

export default TableCustom