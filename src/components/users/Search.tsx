import { Button, Stack, TextField, Divider, MenuItem } from '@mui/material'
import { useForm, Controller, FieldValues } from "react-hook-form"

type TProps = {
 handleSearch: (data: string) => void,
 typeSearch: string,
 setTypeSearch: (typeSearch: string) => void,
 handleSelectTypeSearch: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SearchForm = (props: TProps) => {
 const { handleSearch, typeSearch, handleSelectTypeSearch } = props
 const { handleSubmit, control } = useForm()

 return (
  <>
   <form onSubmit={handleSubmit(handleSearch)}>
    <Stack direction="row" spacing={1}>
     <Controller
      name={typeSearch}
      control={control}
      render={({ field }: FieldValues) =>
       <TextField
        {...field}
        fullWidth
        id="outlined-required"
        placeholder={`search ${typeSearch} ...`}
       />
      }
     />
     <Button type="submit" variant="contained" style={{ color: 'white', backgroundColor: '#424242' }} >Search</Button>
    </Stack>
   </form>
   <TextField
    style={{ width: '100px' }}
    margin='dense'
    select
    id="outlined-required"
    label="Type Search"
    defaultValue="name"
    onChange={handleSelectTypeSearch}
   >
    <MenuItem value="id">
     ID
    </MenuItem>
    <MenuItem value="name">
     Name
    </MenuItem>
    <MenuItem value="phone">
     Phone
    </MenuItem>
    <MenuItem value="role">
     Role
    </MenuItem>
   </TextField>
   <Divider style={{ margin: "20px 0" }} />
  </>
 )
}

export default SearchForm