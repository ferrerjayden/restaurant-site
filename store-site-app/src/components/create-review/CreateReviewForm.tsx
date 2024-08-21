import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createReview } from "../../api/restaurants/req-methods";
import { useNavigate, useParams } from "react-router-dom";

export function CreateReviewForm () {

    const { restaurantId } = useParams()
    const navigate = useNavigate()
     const [formData, setFormData] = useState({})

     const queryClient = useQueryClient()

     const mutation = useMutation<any, unknown, any>({
        mutationFn: (formData) => createReview(restaurantId as string, formData),
        onSuccess: () => {
          queryClient.refetchQueries()
        }
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
        navigate(`/restaurants/view/${restaurantId}`)
        mutation.mutate(formData)
    }



    return (
          <Box
            sx={{
                display: 'grid',
                placeItems: 'center',
                height: '100vh',
            }}>
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
        <Typography sx={{ mb: 2, fontWeight: 800 }}>WRITE A REVIEW</Typography>
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
              label="Title"
              name="title"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Comment"
              name="comment"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Rating"
              name="rating"
              type="number"
              InputProps={{
                inputProps: {
                    max: 5, min: 0
                }
            }}
              onChange={handleChange}
              fullWidth
              required
            />
          </FormControl>
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{ mt: 2, width: '100%', backgroundColor: '#403d3d', color: "white", fontWeight: 800 }}
          >
            Submit
          </Button>
        </form>

        {/* have to take a look at this.. not working */}
        {/* {mutation.isError && <Alert severity="error">Error creating restaurant!</Alert>}
        {mutation.isSuccess && <Alert severity="success">Restaurant Created!</Alert>} */}
      </Box>
    </Box>
    )
}