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

const TableCustom = () => {
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
            {tableForm && tableForm.data.map(item => (
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