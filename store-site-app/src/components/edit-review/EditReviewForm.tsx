import { useMutation, useQuery } from "@tanstack/react-query"
import { getReview, updateRestaurant, updateReviewOnRestaurant } from "../../api/restaurants/req-methods"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"

export function EditReviewForm () {

    const navigate = useNavigate()
    const { reviewId } = useParams()


    console.log(reviewId)
    const { data, error, isLoading} = useQuery({ queryKey: ["getReview", reviewId], queryFn: async () => await getReview(reviewId as string) })


    console.log(reviewId, "hi")
    const updateReviewMutation = useMutation<any, unknown, any>({
    mutationFn: ({formData, reviewId}: {formData: any, reviewId: string}) => {
        console.log(reviewId, "sup")
        return updateReviewOnRestaurant(reviewId as string, formData)}
    })

     const [formData, setFormData] = useState({
        title: "",
        comment: "",
        rating: "",
    })

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                comment: data.comment,
                rating: data.rating
            })
        }
    }, [data])



    const handleChange = (e: any) => {
        const { name, value } = e.target
         setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        updateReviewMutation.mutate({formData, reviewId})
        navigate(-1)
        // console.log(formData)
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
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              fullWidth
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