import { Box } from "@mui/material";
import { EditRestaurantForm } from "../../components/edit-restaurant/EditRestaurantForm";

// wouldn't it make sense to just have the view restaurant page, and then have an edit button that would take us to the form if the user has the right access.?
export function EditRestaurant () {
    return (
        <>
              <Box>
                <h1>Edit Restaurant</h1>
            </Box>
            <EditRestaurantForm/>
        </>

    )
}