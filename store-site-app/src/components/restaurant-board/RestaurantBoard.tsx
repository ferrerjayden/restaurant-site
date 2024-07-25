
import { Box, Button, Card, CardActions, CardContent, CardMedia, Pagination, styled, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../../api/restaurants/req-methods";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
`

export function RestaurantBoard() {
    const { data, error, isLoading } = useQuery({ queryKey: ["restaurants"], queryFn: async () => await fetchRestaurants() })
    const location = useLocation()

    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    const paginatedData = data ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];
    return (
        <Box>
            <h1>All Restaurants</h1>
            <StyledLink to={`${location.pathname}/create`}>
                 <Button>New Restaurant</Button>
            </StyledLink>
            { data &&
            <Box>
                {paginatedData.map((restaurant: any) => (
                    <Card key={restaurant.id} sx={{ width: "320px", maxWidth: 360, display: "inline-block", margin: "20px"}}>
                       <CardMedia sx={{height: 140}} image="mcdonalds-logo.jpg"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {restaurant.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {restaurant.description}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{background: "#403d3d", display: "flex", justifyContent: "space-around"}} >
                            <StyledLink to={`${location.pathname}/view/${restaurant._id}`}>
                                <Button sx={{color: "white", fontWeight: 800}} size="small">View</Button>
                            </StyledLink>
                            <Button sx={{color: "white", fontWeight: 800}} size="small">Reviews</Button>
                        </CardActions>
                    </Card>))}
            </Box>}

            {data && (
                <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={handlePageChange} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}/>
            )}
        </Box>
    )
}

