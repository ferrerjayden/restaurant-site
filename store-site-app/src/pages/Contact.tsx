import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import MainNav from "../components/main-nav/MainNav";

export default function ContactUs() {
  return (
    <>
      <MainNav />
      <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            We'd love to hear from you! Whether you have questions, feedback, or
            just want to say hello, feel free to reach out.
          </Typography>
        </Box>

        <Box component="form" sx={{ py: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Email"
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" size="large">
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            Or reach us directly at: contact@yourwebsite.com
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Phone: +1 234 567 890
          </Typography>
        </Box>
      </Container>
    </>
  );
}
