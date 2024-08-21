import { Avatar, Box, Card, CardContent, CardMedia, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import MainNav from "../components/main-nav/MainNav";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsByUser, getReviewsByUser } from "../api/users/req-methods";
import { useAuth } from "../context/AuthContext";

export default function Profile () {

    const {user} = useAuth()
    console.log(user)
    const { data: restaurants, error: restaurantError, isLoading: restaurantLoading } = useQuery({ queryKey: ["restaurants"], queryFn: async () => await getRestaurantsByUser(user._id) })


     const { data: reviews, error: reviewError, isLoading: reviewLoading } = useQuery({ queryKey: ["review"], queryFn: async () => await getReviewsByUser(user._id) })

    return (
        <>
            <MainNav />
            <Box sx={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                    <Avatar sx={{ width: 100, height: 100, marginRight: "20px" }}>
                    </Avatar>
                    <Box>
                        { user && <Typography variant="h5">{user.username}</Typography>}
                        <Typography variant="body1">Bio placeholder</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" sx={{ mb: 2 }}>Your Restaurants</Typography>
                {restaurantLoading ? (
                    <CircularProgress />
                ) : restaurantError ? (
                    <Typography color="error">Error loading restaurants</Typography>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                         {!restaurants.length && <Typography>You haven't created any restaurants!</Typography>}
                        {restaurants.slice(0, 3).map((restaurant: any) => (
                            <Card key={restaurant._id} sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.image || "https://via.placeholder.com/140"} // Placeholder image
                                    alt={restaurant.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {restaurant.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {restaurant.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Your Reviews</Typography>
                {reviewLoading ? (
                    <CircularProgress />
                ) : reviewError ? (
                    <Typography color="error">Error loading reviews</Typography>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {!reviews.length && <Typography>You haven't created any reviews!</Typography>}
                        {reviews.slice(0, 3).map((review: any) => (
                            <Card key={review._id} sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Review for {review.restaurantName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {review.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    )
}