import React, { useCallback, useEffect } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../specific/ChatList'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/reducer/misc'
import { useErrors, useSocketEvents } from '../../hooks/hooks'
import { getSocket } from '../../../Socket.jsx'
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from '../../constants/events.js'
import { incrementNotification } from '../../redux/reducer/chat.js'

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const socket = getSocket();

    const { isMobile } = useSelector(state => state.misc);
    const { user } = useSelector(state => state.auth);

    const { isLoading, data, isError, error ,refetch} = useMyChatsQuery(user?.id || "");
    // Invalidate data when user ID changes
    useEffect(() => {
      refetch(); // Assuming refetch is a function from useMyChatsQuery that fetches fresh data
    }, [user?.id]); // Watch for changes in user ID

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log('deleted chat ', _id, groupChat);
    }

    const handleMobileClose = () => dispatch(setIsMobile(false));


    const newMessageAlertHandler = useCallback(()=>{

    },[])
    const newRequestHandler = useCallback(()=>{
        dispatch(incrementNotification());
    },[dispatch])


    const eventHandlers = {
       [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
       [NEW_REQUEST]: newRequestHandler,
      }

    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        {
          isLoading ? <Skeleton /> : (
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList w='70vw' chats={data?.chats} chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            </Drawer>
          )
        }
        <Grid container height={"calc(100vh - 4rem)"}  >
          <Grid item sm={4} md={3} sx={{
            display: {
              xs: "none", sm: "block"
            }
          }} height={"100%"} >
            {
              isLoading ? (<Skeleton />) : <ChatList chats={data?.chats} chatId={chatId}
                onlineUsers={["1", "2"]}
                handleDeleteChat={handleDeleteChat}
              />
            }
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} ><WrappedComponent user={user} {...props} chatId={chatId} /></Grid>
          <Grid item md={4} lg={3} height={"91vh"} sx={{
            display: {
              xs: "none", md: "block", padding: "2rem", backgroundColor: "rgba(0,0,0,0.85)",
              overflow: "auto",
            }
          }}>
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AppLayout;
