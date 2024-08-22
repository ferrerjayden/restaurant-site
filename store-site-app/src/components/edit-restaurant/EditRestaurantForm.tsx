import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import MainNav from "../main-nav/MainNav";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRestaurant,
  updateRestaurant,
} from "../../api/restaurants/req-methods";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../context/SnackbarContext";

export function EditRestaurantForm() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const { data } = useQuery({
    queryKey: ["getRestaurants", restaurantId],
    queryFn: async () => await getRestaurant(restaurantId as string),
  });
  const { showSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const mutation = useMutation<any, unknown, any>({
    mutationFn: (formData: any) =>
      updateRestaurant(restaurantId as string, formData),
    onSuccess: () => {
      queryClient.refetchQueries();
      showSnackbar("Updated restaurant!", "success");
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        description: data.description,
        address: data.address,
        city: data.city,
      });
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate(formData);
    navigate(`/restaurants/view/${restaurantId}`);
  };

  return (
    <>
      <MainNav />
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "50%",
            padding: 4,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography sx={{ mb: 2, fontWeight: 800 }}>
            EDIT RESTAURANT
          </Typography>
          <form style={{ width: "100%" }}>
            <FormControl
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </FormControl>
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{
                mt: 2,
                width: "100%",
                backgroundColor: "#403d3d",
                color: "white",
                fontWeight: 800,
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
