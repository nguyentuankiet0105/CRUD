import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { tableForm } from '@constants/constant'
import { TUser } from "@interfaces/user-interface"

type TProps = {
  data: TUser[],
  handleEditUser: (id: string) => void
  handleDeleteUser: (id: string) => void
}

const TableCustom = (props: TProps) => {
  const { data, handleEditUser, handleDeleteUser } = props
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
      </TableContainer>
    </>
  )
}

export default TableCustom