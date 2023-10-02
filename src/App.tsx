import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TUser } from "@interfaces/user-interface"
import Table from "@components/Table"
import Form from "@components/Form"
import { getAllUser, deleteUser } from "@service/userService"

function App() {
  const data = useSelector(state => state.user.listUser)
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingUser, setEditingUser] = useState<TUser | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  const handleOpenForm = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id)).then(dispatch(getAllUser()))
  }

  const handleEditUser = (id: string) => {
    const userToEdit: TUser = data.find(item => item.id === id)
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
        handleEditUser={handleEditUser} />
    </>
  )
}

export default App
