import { Alert, Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createRestaurant } from "../../api/restaurants/req-methods";
import { useNavigate } from "react-router-dom";

export function CreateRestaurantForm () {

   const queryClient = useQueryClient()

    const navigate = useNavigate()
    const mutation = useMutation<any, unknown, any>({
        mutationFn: (formData) => createRestaurant(formData),
        onSuccess: () => {
          queryClient.refetchQueries()
        }
    })

    const [formData, setFormData] = useState({

    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
         setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        mutation.mutate(formData)
        navigate('/restaurants')
    }



    return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '50%',
          padding: 4,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: 800 }}>CREATE A NEW RESTAURANT</Typography>
        <form style={{ width: '100%' }}>
          <FormControl
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              name="name"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="City"
              name="city"
              onChange={handleChange}
              fullWidth
            />
          </FormControl>
          <Button
            type="submit"
            onClick={handleSubmit}

          >
            Submit
          </Button>
        </form>

        {/* have to take a look at this.. not working */}
        {mutation.isError && <Alert severity="error">Error creating restaurant!</Alert>}
        {mutation.isSuccess && <Alert severity="success">Restaurant Created!</Alert>}
      </Box>
    </Box>
  );
}