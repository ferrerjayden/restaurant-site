import { Box } from "@mui/material";
import MainNav from "../components/main-nav/MainNav";

export default function Profile () {

    // queries to get restaurants and reviews by user
    return (
        <>
            <MainNav/>
            <Box>
                <h1>Profile</h1>
                <p>This is the profile</p>
            </Box>
        </>

    )
}