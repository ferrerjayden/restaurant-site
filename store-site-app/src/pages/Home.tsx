import { Box, Container, Typography, Button, Grid } from "@mui/material";
import MainNav from "../components/main-nav/MainNav";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <MainNav />
      <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Discover the Best Restaurants
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Explore reviews, ratings, and more from top eateries in your area.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mb: 6 }}
            onClick={() => {
              navigate("/restaurants");
            }}
          >
            Find a Restaurant
          </Button>
          <Box
            component="img"
            src="https://via.placeholder.com/600x400"
            alt="Hero Image Placeholder"
            sx={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          />
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Restaurants
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/300x200"
                alt="Restaurant 1 Placeholder"
                sx={{ width: "100%", borderRadius: "8px", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Restaurant 1</Typography>
              <Typography color="text.secondary">
                A brief description of Restaurant 1.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/300x200"
                alt="Restaurant 2 Placeholder"
                sx={{ width: "100%", borderRadius: "8px", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Restaurant 2</Typography>
              <Typography color="text.secondary">
                A brief description of Restaurant 2.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/300x200"
                alt="Restaurant 3 Placeholder"
                sx={{ width: "100%", borderRadius: "8px", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Restaurant 3</Typography>
              <Typography color="text.secondary">
                A brief description of Restaurant 3.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            About Us
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Learn more about our mission to connect food lovers with the best
            dining experiences.
          </Typography>
          <Box
            component="img"
            src="https://via.placeholder.com/800x400"
            alt="About Us Image Placeholder"
            sx={{
              width: "100%",
              maxWidth: "800px",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          />
        </Box>
      </Container>
    </>
  );
}
