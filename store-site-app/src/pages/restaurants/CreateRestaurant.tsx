import { Box, FormControl, TextField } from "@mui/material";
import MainNav from "../../components/main-nav/MainNav";
import { CreateRestaurantForm } from "../../components/create-restaurant/CreateRestaurant";

export function CreateRestaurant () {
    return (
        <>
            <MainNav />
            <Box>
                <h1>Create Restaurant</h1>
            </Box>
         <CreateRestaurantForm/>
        </>
    )
}