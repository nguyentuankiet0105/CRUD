import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TUser } from "@interfaces/user-interface"
import Table from "@components/users/UserList"
import Form from "@components/users/Form"
import SearchForm from "@components/users/Search"
import { getAllUser, deleteUser } from "@service/userService"
import { setPage, setRowsPerPage, clearError } from "@store/reducer/user/userReducer"
import { RootState } from "@store/index"

function UserManagement() {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.user.listUser)
  const pagination = useSelector((state: RootState) => state.user.pagination)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<TUser | null>(null)
  const [userDelete, setUserDelete] = useState<TUser | null>(null)
  const [typeSearch, setTypeSearch] = useState<string>('name')

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

  const handleGetAllUser = useCallback((data?: object) => {
    const conditionSearch = (data && data?.[typeSearch])
    const params = {
      _page: Number(pagination.page),
      _limit: pagination.rowsPerPage,
      ...(conditionSearch && { [typeSearch]: data?.[typeSearch] }),
    };
    dispatch(getAllUser(params));
  }, [dispatch, pagination.page, pagination.rowsPerPage, typeSearch])

  useEffect(() => {
    handleGetAllUser()
  }, [handleGetAllUser])

  const handleDeleteUser = (userId: string) => {
    dispatch(clearError())
    setOpenDialog(true)
    const userSelect = data.find((item: { userId: string }) => item.userId === userId)
    setUserDelete(userSelect)
  }
  const handleConfirmDelete = () => {
    dispatch(deleteUser(userDelete?.userId))
      .then(() => {
        handleGetAllUser()
        setShowAlert(true)
        setOpenDialog(false)
      }
      )
  }

  const handleEditUser = (userId: string) => {
    const userToEdit: TUser = data.find((item: { userId: string }) => item.userId === userId)
    setEditingUser(userToEdit)
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleSearch = (data: object) => {
    handleGetAllUser(data)
  }

  const handleSelectTypeSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeSearch(e.target.value);
  }

  return (
    <>
      <SearchForm
        handleSearch={handleSearch}
        typeSearch={typeSearch}
        setTypeSearch={setTypeSearch}
        handleSelectTypeSearch={handleSelectTypeSearch}
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

export default UserManagement
