import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TUser } from "@interfaces/user-interface"
import Table from "@components/Table"
import Form from "@components/Form"
import { getAllUser, deleteUser } from "@service/userService"
import { setPage, setRowsPerPage, clearError } from "@store/reducer/user/userReducer"

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
    dispatch(clearError())
    setOpenDialog(true)
    const userSelect = data.find((item: { id: string }) => item.id === id)
    setUserDelete(userSelect)
  }
  const handleConfirmDelete = () => {
    dispatch(deleteUser(userDelete?.id))
      .then(() => {
        handleGetAllUser()
        setShowAlert(true)
        setOpenDialog(false)
      }
      )
  }

  const handleEditUser = (id: string) => {
    const userToEdit: TUser = data.find((item: { id: string }) => item.id === id)
    setEditingUser(userToEdit)
    setIsEdit(true)
    setIsOpen(true)
  }

  return (
    <>
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
        userDelete={userDelete}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  )
}

export default App
