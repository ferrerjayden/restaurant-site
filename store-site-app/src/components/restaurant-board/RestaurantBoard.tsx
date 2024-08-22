import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../../api/restaurants/req-methods";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function RestaurantBoard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => await fetchRestaurants(),
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const paginatedData = data
    ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : [];

  const handleButtonClick = (restaurantId: any) => {
    navigate(`${location.pathname}/view/${restaurantId}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleNewRestaurantClick = () => {
    if (user) {
      navigate(`${location.pathname}/create`);
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography align="center">Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {!data.length && (
        <Typography align="center" variant="h6">
          There are no restaurants to view!
        </Typography>
      )}
      <Grid container spacing={3} justifyContent="center">
        {data &&
          paginatedData.map((restaurant: any) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardMedia
                  sx={{ height: 200 }}
                  image={restaurant.image || "/images/mcdonalds-again.jpeg"}
                  title={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.description}
                  </Typography>
                </CardContent>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => handleButtonClick(restaurant._id)}
                >
                  View Restaurant
                </Button>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Button
        onClick={handleNewRestaurantClick}
        sx={{
          background: "#5A5656",
          color: "white",
          ":hover": {
            color: "black",
          },
          fontWeight: 800,
          padding: "10px",
          position: "fixed",
          right: 10,
          bottom: 10,
        }}
      >
        NEW RESTAURANT
      </Button>

      {data && (
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        />
      )}
    </Box>
  );
}
