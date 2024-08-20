import MainNav from "../../components/main-nav/MainNav";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRestaurant, deleteReviewFromRestaurant, fetchRestaurantWithReview } from "../../api/restaurants/req-methods";
import { Box, Button, Card, CardContent, Container, Grid, Rating, Typography } from "@mui/material";

export function ViewRestaurant() {


    const { id } = useParams()
    const { data: restaurant, isLoading, error } = useQuery({ queryKey: ["fetchRestaurantWithReviews", id], queryFn: async () => await fetchRestaurantWithReview(id as string) })

    const queryClient = useQueryClient()

    const deleteMutation = useMutation<any, unknown, any>({
        mutationFn: (restaurantId) => deleteRestaurant(restaurantId),
        onSuccess: () => {
          queryClient.refetchQueries()
        }
     })

      const deleteReviewMutation = useMutation<any, unknown, any>({
        mutationFn: ({reviewId, restaurantId}: {reviewId: string, restaurantId: string}) => { return deleteReviewFromRestaurant(reviewId, restaurantId)},
        onSuccess: () => {
          queryClient.refetchQueries()
        }
      })


  const navigate = useNavigate()

    const handleClick = (restaurantId: string) => {
      navigate(`/restaurants/${restaurantId}/reviews/create`)
    }

    const handleDelete = (restaurantId: string) => {
      deleteMutation.mutate(restaurantId)
      navigate("/restaurants")
    }

    const handleUpdate = (restaurantId: string) => {
      navigate(`/restaurants/update/${restaurantId}`)
    }

    const handleUpdateReview = (reviewId: string) => {
      navigate(`/reviews/update/${reviewId}`)
    }

    const handleDeleteReview = (reviewId: string, restaurantId: string) => {
      deleteReviewMutation.mutate({reviewId, restaurantId})
    }

   return (
    <>
    <MainNav/>
    {restaurant && <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Grid container spacing={2} sx={{ width: "100%", padding: 4, marginTop: "100px", boxShadow: 3 }}>
      <Grid item xs={12} sm={6}>
        <img src={"/images/mcdonalds-again.jpeg"} alt={restaurant.name} style={{ width: '100%', height: 'auto' }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4">{restaurant.name}</Typography>
        <Typography variant="body1" gutterBottom>{restaurant.description}</Typography>
        <Typography variant="subtitle1">{restaurant.city}</Typography>
        <Typography variant="subtitle1">{restaurant.address}</Typography>
        <Button color="error" onClick={() => {handleDelete(restaurant._id)}}>Delete</Button>
        <Button color="info" onClick={() => {handleUpdate(restaurant._id)}}>Edit</Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Reviews</Typography>
        {restaurant.reviews.length === 0 && <Typography variant="body1">No reviews yet</Typography>}
        {restaurant.reviews.map((review: any, index: any) => (
          <Card key={index} variant="outlined" sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{review.title}</Typography>
              <Typography variant="body2" gutterBottom>{review.comment}</Typography>
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography variant="body2">By {review.user.username}</Typography>
              <Button color="info" onClick={() => { handleUpdateReview(review._id)}}>Edit</Button>
              <Button color="error" onClick={() => {handleDeleteReview(review._id, restaurant._id)}}>Delete</Button>
            </CardContent>
          </Card>
        ))}
         <Button color="primary" onClick={() => { handleClick(id as string)}}>Add Review</Button>
      </Grid>

    </Grid>
    </Container>}

        </>
  );
}