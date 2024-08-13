import { Box, Typography } from "@mui/material";
import MainNav from "../components/main-nav/MainNav";
import { RestaurantBoard } from "../components/restaurant-board/RestaurantBoard";

export default function Restaurants () {
    return (
        <>
            <MainNav/>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", height: "90vh", mt: "100px" }}>
                <Typography variant="h2" component="h1" sx={{margin: "50px", fontSize: "4rem"}}>Restaurants</Typography>
                <RestaurantBoard />
            </Box>
        </>

    )
}