
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
`


const pages = ['Home', 'About', 'Restaurants', 'Contact']
const settings = ['Profile', 'Log out']

const MainNav = () => {
    const [anchorUserBox, setAnchorUserBox] = useState<null | HTMLElement>(null);

    const handleUserOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorUserBox(event.currentTarget);
    }

    const handleCloseUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorUserBox(null);
    }

    return (
    <AppBar sx={{backgroundColor: '#403d3d'}}>
        <Container maxWidth="xl">
            <Toolbar>
              <Typography
              sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: {xs: 'none', md: 'flex'}
            }}>
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end"}}>
                {pages.map((page) => (
                    <StyledLink to={`/${page.toLowerCase()}`} key={page}>
                        <Button
                        key={page}
                        sx={{ my: 2, color: 'white', display: 'block',  fontWeight: 'bold'}}
                        >
                            {page}
                        </Button>
                    </StyledLink>

                ))}
            </Box>
            <Box sx={{ flexGrow: 0, paddingLeft: "10px" }}>
                <Tooltip title="Settings">
                    <IconButton onClick={handleUserOnClick}>
                        <Avatar/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{marginLeft: "100px"}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorUserBox)}
                    onClose={handleCloseUserMenu}
                    anchorEl={anchorUserBox}>
                    {settings.map((setting) => (
                        <StyledLink to={`/${setting.toLowerCase()}`} key={setting}>
                            <MenuItem key={setting}>
                            <Typography textAlign={"center"}>{setting}</Typography>
                            </MenuItem>
                        </StyledLink>

                    ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
    </AppBar>)


}

export default MainNav