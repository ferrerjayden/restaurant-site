import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Default() {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      height={"100vh"}
    >
      <h1>404 ERROR</h1>
      <p>Sorry, but this page doesn't exist!</p>
      <Button>
        <Link to="/home">Go back to the homepage</Link>
      </Button>
    </Box>
  );
}
