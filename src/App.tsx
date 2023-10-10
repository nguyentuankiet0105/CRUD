import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TUser } from "@interfaces/user-interface"
import Table from "@components/Table"
import Form from "@components/Form"
import AlertMessage from "@components/Alert"
import Dialog from '@components/Dialog';

import { getAllUser, deleteUser } from "@service/userService"
import { setPage, setRowsPerPage } from "@store/reducer/user/userReducer"

function App() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.user.listUser)
  const pagination = useSelector(state => state.user.pagination)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<TUser | null>(null)
  const [userDelete, setUserDelete] = useState<TUser | null>(null)

  const handleOpenForm = () => {
    setIsEdit(false)
    setIsOpen(true)
  }
  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(setPage(newPage))
  };
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setRowsPerPage(parseInt(e.target.value, 10)))
  };

  const handleGetAllUser = useCallback(() => {
    dispatch(getAllUser({
      _page: Number(pagination.page) + 1,
      _limit: pagination.rowsPerPage,
    }))

  }, [dispatch, pagination.page, pagination.rowsPerPage])

  useEffect(() => {
    handleGetAllUser()
  }, [handleGetAllUser])

  const handleDeleteUser = (id: string) => {
    setOpenDialog(true)
    const userSelect = data.find(item => item.id === id)
    setUserDelete(userSelect)
  }
  const handleConfirmDelete = () => {
    dispatch(deleteUser(userDelete?.id)).then(handleGetAllUser())
    setShowAlert(true)
    setOpenDialog(false)
  }

  const handleEditUser = (id: string) => {
    const userToEdit: TUser = data.find(item => item.id === id)
    setEditingUser(userToEdit)
    setIsEdit(true)
    setIsOpen(true)
  }

  return (
    <>
      <AlertMessage
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        typeAlert="info"
        message={`You has been deleted user: ${userDelete?.name} !`}
      />
      <Form
        handleOpenForm={handleOpenForm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        editingUser={editingUser}
      />
      <Table
        data={data}
        handleDeleteUser={handleDeleteUser}
        handleEditUser={handleEditUser}
        totalPage={pagination.total}
        page={pagination.page}
        rowsPerPage={pagination.rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
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

export default App
