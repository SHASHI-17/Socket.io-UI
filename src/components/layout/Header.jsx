import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, useState } from 'react'
import {
  Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon
  , Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon
} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { server } from '../../lib/config';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducer/auth';
import { setIsMobile, setIsNotification, setIsSearch } from '../../redux/reducer/misc';
const SearchDialog = lazy(()=>import('../specific/Search'));
const NotificationDialog = lazy(()=>import('../specific/Notifications'));
const NewGroupDialog = lazy(()=>import('../specific/NewGroup'));

const Header = () => {

  const navigate = useNavigate();

const {isSearch,isNotification} = useSelector(state=>state.misc);

  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleMobile = () => dispatch(setIsMobile(true));
  
  const openSearchDialog = () => dispatch(setIsSearch(true));
  

  const openNewGroup = () => {
    console.log('openNewGroup');
    setIsNewGroup(!isNewGroup)
  }
  const openNotification = () => dispatch(setIsNotification(true))

  const navigateToGroup = () => navigate('/groups');


  const dispatch = useDispatch();

  const logoutHandler = async() => {
    try {
      const {data}=await axios.get(`${server}/user/logout`,{withCredentials:true});
      toast.success(data.message);
      dispatch(userNotExists())
    } catch (e) {
        toast.error(e?.response?.data?.message || 'Something Went Wrong')
    }
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"} fontFamily={'cursive'}>
        <AppBar position='static' sx={{
          bgcolor: "#ea7070"
        }} >
          <Toolbar>
            <Typography  variant='h6' sx={{
              display: { xs: "none", sm: "block" },cursor:'pointer'
            }} fontFamily={'cursive'} >
             <span onClick={()=>navigate('/')}> WeChat</span>
            </Typography>

            <Box sx={{
              display: { xs: "block", sm: "none" }
            }}>
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn title={'Search'} icon={<SearchIcon />} onClick={openSearchDialog} />
              <IconBtn title={'New Group'} icon={<AddIcon />} onClick={openNewGroup} />
              <IconBtn title={'Manage Groups'} icon={<GroupIcon />} onClick={navigateToGroup} />
              <IconBtn title={'Notifications'} icon={<NotificationsIcon />} onClick={openNotification} />
              <IconBtn title={'Logout'} icon={<LogoutIcon />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {
        isSearch && (
          <Suspense fallback={<Backdrop open/>}>
            <SearchDialog />
          </Suspense>
        )
      }

      {
        isNewGroup && (
          <Suspense fallback={<Backdrop open/>}>
            <NewGroupDialog />
          </Suspense>
        )
      }

      {
        isNotification && (
          <Suspense fallback={<Backdrop open/>}>
            <NotificationDialog />
          </Suspense>
        )
      }
    </>
  )
}


const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header