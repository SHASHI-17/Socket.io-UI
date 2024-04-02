import { Close, Dashboard, ExitToApp, Groups, ManageAccounts, Menu, Message } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'
import { adminLogout } from '../../redux/thunks/admin'

const Link=styled(LinkComponent)`
    text-decoration:none;
    border-radius:2rem;
    padding:1rem 2rem;
    color:black;
    &:hover{
        color:rgba(0,0,0,0.54);
    };
`

const adminTabs = [
    {
        name: "Dashboard",
        path: '/admin/dashboard',
        icon: <Dashboard />
    },
    {
        name: "Users",
        path: '/admin/user-management',
        icon: <ManageAccounts />
    },
    {
        name: "Chats",
        path: '/admin/chat-management',
        icon: <Groups />
    },
    {
        name: "Messages",
        path: '/admin/messages',
        icon: <Message />
    },
]

const Sidebar = ({ w = '100%' }) => {

    const location = useLocation();

    const dispatch=useDispatch();

    const logoutHandler=()=>{
      dispatch(adminLogout());
    }

    return (
        <Stack width={w} direction={'column'} p='3rem' spacing={'3rem'} >
            <Typography variant='h5' textTransform={'uppercase'}>Admin</Typography>

            <Stack spacing={'1rem'} >
                    {
                        adminTabs.map(tab=>(
                            <Link key={tab.path} to={tab.path} sx={
                                location.pathname===tab.path && {
                                    bgcolor:'black',
                                    color:'white',
                                    ":hover":{
                                        color:'white'
                                    }
                                }
                            }>
                                <Stack direction={'row'} alignItems={"center"} spacing={"1rem"}>
                                    {tab.icon}
                                    <Typography>{tab.name}</Typography>
                                </Stack>
                            </Link>
                        ))
                    }
                    <Link onClick={logoutHandler}>
                                <Stack direction={'row'} alignItems={"center"} spacing={"1rem"}>
                                    <ExitToApp/>
                                    <Typography>Logout</Typography>
                                </Stack>
                            </Link>
            </Stack>
        </Stack>

    )
}



const AdminLayout = ({ children }) => {

    const [isMobile, setIsMobile] = useState(false);
    const {isAdmin} =useSelector(state=>state.auth);

    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);

    if(!isAdmin) return <Navigate to={'/admin'}/>

    return (
        <div>
            <Grid container minHeight={'100vh'} >

                <Box sx={{
                    display: { xs: "block", md: "none" },
                    position: 'fixed', right: "1rem", top: "1rem"
                }}>
                    <IconButton onClick={handleMobile}>
                        {isMobile ? <Close /> : <Menu />}
                    </IconButton>
                </Box>

                <Grid item md={4} lg={3} sx={{
                    display: { xs: "none", md: "block" }
                }} >
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={8} lg={9} sx={{
                    bgcolor: '#f5f5f5'
                }} >
                    {children}
                </Grid>

                <Drawer open={isMobile} onClose={handleClose}>
                    <Sidebar w='50vw' />
                </Drawer>
            </Grid>
        </div>
    )
}

export default AdminLayout