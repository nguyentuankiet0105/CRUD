import { useRouteError } from "react-router-dom";
import { Box } from "@mui/material"

const ErrorPage = () => {
 const error = useRouteError() as { statusText?: string; message?: string };
 console.error(error);

 return (
  <Box id="error-page" sx={{ textAlign: 'center' }}>
   <h1>Oops!</h1>
   <p>Sorry, an unexpected error has occurred.</p>
   <p>
    <i>{error.statusText || error.message}</i>
   </p>
  </Box>
 );
}

export default ErrorPage