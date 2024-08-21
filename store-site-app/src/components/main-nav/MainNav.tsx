
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import { useState, MouseEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const StyledLink = styled(Link)`
    text-decoration: none;
`


const pages = ['Home', 'About', 'Restaurants', 'Contact']

const MainNav = () => {
    const [settings, setSettings] = useState<string[]>([])
    const navigate = useNavigate()
    const {logout, user} = useAuth()
    const [anchorUserBox, setAnchorUserBox] = useState<null | HTMLElement>(null);

    const handleUserOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorUserBox(event.currentTarget);
    }

    const handleCloseUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorUserBox(null);
    }

    const handleLogOut = (event: any) => {
        logout()
        navigate("/")
    }

    useEffect(() => {
        if (user) {
            setSettings(["Profile", "Logout"])
        } else {
            setSettings(["Register", "Login"])
        }
    }, [user])

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
                    sx={{marginRight: "100px"}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    open={Boolean(anchorUserBox)}
                    onClose={handleCloseUserMenu}
                    anchorEl={anchorUserBox}>
                    {settings.map((setting) => (
                        setting === "Logout" ? (
                  <MenuItem
                    key={setting}
                    onClick={handleLogOut}
                  >
                    <Typography textAlign={"center"}>{setting}</Typography>
                  </MenuItem>
                ):
                        <StyledLink to={`/${setting.toLowerCase()}`} key={setting}>
                            <MenuItem key={setting} onClick={() => {console.log("sup")}}>
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