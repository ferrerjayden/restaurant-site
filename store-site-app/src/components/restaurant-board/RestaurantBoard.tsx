
import { Box, Button, ButtonBase, Card, CardActions, CardContent, CardMedia, Pagination, styled, Typography } from "@mui/material";
import { QueryCache, useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../../api/restaurants/req-methods";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
`


export function RestaurantBoard() {
    const { data, error, isLoading } = useQuery({ queryKey: ["restaurants"], queryFn: async () => await fetchRestaurants() },)
    const location = useLocation()
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 20;
    const paginatedData = data ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage) : [];
    const handleButtonClick = (restaurantId: any) => {
        navigate(`${location.pathname}/view/${restaurantId}`)
    }
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error.message}</p>
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }


    return (
        <Box>
             { !data.length && <Typography>There is no restaurants to view!</Typography>}
            <Box sx={{marginLeft: "150px", boxShadow: 3, width: "85%", marginTop: "20px"}}>

            { data &&

                paginatedData.map((restaurant: any) => (
                    <ButtonBase onClick={() => { handleButtonClick(restaurant._id)}}>
                    <Card key={restaurant.id} sx={{ width: "310px", maxWidth: 360, display: "inline-block", margin: "20px"}}>
                       <CardMedia sx={{height: 140}} image="/images/mcdonalds-again.jpeg"/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {restaurant.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {restaurant.description}
                            </Typography>
                        </CardContent>
                    </Card></ButtonBase>))}

            </Box>
           <StyledLink to={`${location.pathname}/create`}>
                <Button sx={{
                    background: '#5A5656',
                    color: "white",
                    ":hover": {
                        color: "black"
                    },
                    fontWeight: 800,
                    padding: "10px",
                    position: "fixed",
                    right: 10,
                    bottom: 10
                }}>
                    NEW RESTAURANT
                </Button>
            </StyledLink>
            {data && (
                <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={handlePageChange} sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}/>
            )}
        </Box>
    )
}

