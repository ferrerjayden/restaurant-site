import { Box, Container, Typography, Grid } from "@mui/material";
import MainNav from "../components/main-nav/MainNav";

export default function About() {
  return (
    <>
      <MainNav />
      <Container maxWidth="md" sx={{ marginTop: "100px" }}>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Welcome to our website, your go-to destination for discovering and
            reviewing the best restaurants in your area. Our mission is to
            connect food lovers with unforgettable dining experiences by
            providing comprehensive reviews, ratings, and insights.
          </Typography>
          <Box
            component="img"
            src="https://via.placeholder.com/600x300"
            alt="About Us Image Placeholder"
            sx={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              boxShadow: 3,
              my: 4,
            }}
          />
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas ullam
            velit molestiae, sunt ducimus iusto placeat eligendi repudiandae
            asperiores provident, expedita amet maiores dolorem rem ab vitae in
            quibusdam. Est. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Quas ullam velit molestiae, sunt ducimus iusto placeat
            eligendi repudiandae asperiores provident, expedita amet maiores
            dolorem rem ab vitae in quibusdam. Est.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
            officia earum ipsa. Repellat vel sunt maiores voluptates asperiores,
            ipsa libero magni aut iste odit aliquam, voluptatem odio veritatis
            ullam doloribus.
          </Typography>
        </Box>

        <Box sx={{ py: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Meet the Team
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/200x200"
                alt="Team Member 1 Placeholder"
                sx={{ width: "100%", borderRadius: "50%", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Team Member 1</Typography>
              <Typography color="text.secondary">Founder & CEO</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/200x200"
                alt="Team Member 2 Placeholder"
                sx={{ width: "100%", borderRadius: "50%", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Team Member 2</Typography>
              <Typography color="text.secondary">Head of Marketing</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                component="img"
                src="https://via.placeholder.com/200x200"
                alt="Team Member 3 Placeholder"
                sx={{ width: "100%", borderRadius: "50%", boxShadow: 3, mb: 2 }}
              />
              <Typography variant="h6">Team Member 3</Typography>
              <Typography color="text.secondary">Lead Developer</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
