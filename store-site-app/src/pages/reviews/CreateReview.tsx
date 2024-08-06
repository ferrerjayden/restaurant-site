import { Box } from "@mui/material";
import MainNav from "../../components/main-nav/MainNav";
import { CreateReviewForm } from "../../components/create-review/CreateReviewForm";

export function CreateReview () {
    return (
        <>
            <MainNav />
            <Box sx={{paddingTop: "100px"}}>
                <h1>Create Review</h1>
            </Box>
            <CreateReviewForm/>

        </>
    )
}