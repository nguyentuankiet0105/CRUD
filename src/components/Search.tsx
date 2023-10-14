import { Button, Stack, TextField, Divider } from '@mui/material'
import { useForm, Controller, FieldValues } from "react-hook-form"

type TProps = {
 handleSearch: (data: string) => void,
}

const SearchForm = (props: TProps) => {
 const { handleSearch } = props
 const { handleSubmit, control } = useForm()

 return (
  <>
   <form onSubmit={handleSubmit(handleSearch)}>
    <Stack direction="row" spacing={1}>
     <Controller
      name="name"
      control={control}
      render={({ field }: FieldValues) =>
       <TextField
        {...field}
        fullWidth
        id="outlined-required"
        placeholder='search name ...'
       />
      }
     />
     <Button type="submit" variant="contained" style={{ color: 'white', backgroundColor: '#424242' }} >Search</Button>
    </Stack>
   </form>
   <Divider style={{ margin: "20px 0" }} />
  </>
 )
}

export default SearchForm