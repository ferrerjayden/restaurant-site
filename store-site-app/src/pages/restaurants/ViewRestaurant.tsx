import MainNav from "../../components/main-nav/MainNav";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRestaurantWithReview } from "../../api/restaurants/req-methods";
import { Box, Button, Card, CardContent, Container, Grid, Rating, Typography } from "@mui/material";

export function ViewRestaurant() {


    const { id } = useParams()
    const { data: restaurant, isLoading, error } = useQuery({ queryKey: ["fetchRestaurantWithReviews"], queryFn: async () => await fetchRestaurantWithReview(id as string) })
  const navigate = useNavigate()

    const handleClick = (restaurantId: string) => {
      console.log("Add Review")
      navigate(`/restaurants/${restaurantId}/reviews/create`)
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
        <Box>
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={4.5} readOnly /> {/* Placeholder for the rating */}
        </Box>
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
              <Typography variant="body2">By {review.user}</Typography>
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