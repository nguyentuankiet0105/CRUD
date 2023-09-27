import Table from "@components/Table"
import Form from "@components/Form"
import { useEffect, useState } from "react"
import { TUser } from "@interfaces/user-interface"
import axios, { AxiosResponse } from "axios"

function App() {
  const [data, setData] = useState<TUser[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingUser, setEditingUser] = useState<TUser | null>(null)

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res: AxiosResponse) => {
        setData(res.data as TUser[])
      }).catch((err: AxiosResponse) => {
        throw err
      });
  }, [])

  const handleOpenForm = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  const handleDeleteUser = (id: string) => {
   console.log(id);
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
