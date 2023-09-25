import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";
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

const TableCustom = () => {
  const [listUser, setListUser] = useState<TUser[]>([])

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res: AxiosResponse) => {
        setListUser(res.data as TUser[])

      }).catch((err: AxiosResponse) => {
        throw err
      });
  }, [])

  return (
    <>
      <TableContainer className="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableForm && tableForm.head.map((item, index) => (
                <TableCell key={index} align="center" className='table__label'>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser && listUser?.map((item: TUser) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.id}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.role}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined" color="error">Delete</Button>
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