import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  styled
} from '@mui/material';
import { tableForm } from '@constants/constant'
import { TUser } from "@interfaces/user-interface"
import Alert from "@components/common/Alert"
import Dialog from '@components/common/Dialog';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Image = styled("img")({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "2px solid cornflowerblue",
})

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
  handleEditUser: (userId: string) => void,
  handleDeleteUser: (userId: string) => void,
  handleConfirmDelete: () => void,
}

const TableCustom = (props: TProps) => {
  const navigate = useNavigate();

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

  const errors = useSelector((state: RootState) => state.user.error);

  const alertMessage = useMemo(() => {
    if (errors.code) {
      return {
        typeAlert: 'error',
        message: errors.message
      }
    } else {
      return {
        typeAlert: 'info',
        message: `You has been deleted user: ${userDelete?.name} !`
      }
    }
  }, [errors, userDelete?.name])

  const goToUserDetail = (user: TUser) => () => {
    navigate(`/users/${user.userId}`, { state: { user } })
  }

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
              <TableRow key={item.userId} >
                <TableCell align="center">{item.userId}</TableCell>
                <TableCell
                  align="center"
                  sx={{ cursor: 'pointer' }}
                  onClick={goToUserDetail(item)}
                >
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.role}</TableCell>
                <TableCell align="center">
                  <Image src={item.image ?? "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"} alt="avt" />
                </TableCell>
                <TableCell align="center">
                  <Button variant="outlined" onClick={() => handleEditUser(item.userId)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteUser(item.userId)}>Delete</Button>
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
      <>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          typeAlert={alertMessage.typeAlert}
          message={alertMessage.message}
        />
        <Dialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleConfirm={handleConfirmDelete}
          title={`Are you sure you want to delete user ${userDelete?.name} ?`}
          content={`This action will remove user ${userDelete?.name} from the list, and it cannot be undone. Please proceed with caution !`}
        />
      </>
    </>
  )
}

export default TableCustom