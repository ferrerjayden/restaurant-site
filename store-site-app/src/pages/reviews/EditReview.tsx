import { Box } from "@mui/material";
import MainNav from "../../components/main-nav/MainNav";
import { EditReviewForm } from "../../components/edit-review/EditReviewForm";

export function EditReview() {
  return (
    <>
      <MainNav />
      <Box>
        <h1>Edit Review</h1>
        <EditReviewForm />
      </Box>
    </>
  );
}
