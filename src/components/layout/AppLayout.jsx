import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../specific/ChatList'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducer/misc'
import { useErrors, useSocketEvents } from '../../hooks/hooks'
import { getSocket } from '../../../Socket.jsx'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events.js'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducer/chat.js'
import { getOrSaveFromStorage } from '../../lib/features.js'
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx'

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = getSocket();

    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobile } = useSelector(state => state.misc);
    const { user } = useSelector(state => state.auth);
    const { newMessagesAlert } = useSelector(state => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery(user?.id || "");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    }

    const handleMobileClose = () => dispatch(setIsMobile(false));


    const newMessageAlertHandler = useCallback((data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    }, [chatId]);

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch])


    const refetchListener = useCallback(() => {
      refetch();
      navigate('/');
    }, [refetch, navigate])

    const onlineUsersListeners = useCallback((data) => {
      console.log("onlineUsersListeners", data);
      setOnlineUsers(data);
    }, [dispatch])

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListeners,
    }

    useSocketEvents(socket, eventHandlers);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT, value: newMessagesAlert
      })
    }, [newMessagesAlert])



    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor} />
        {
          isLoading ? <Skeleton /> : (
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList key={data?.chats?.[0]?._id || 'defafsult-key'} w='70vw' chats={data?.chats} chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
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
              isLoading ? (<Skeleton />) : <ChatList key={data?.chats?.[0]?._id || 'defaczult-key'} chats={data?.chats} chatId={chatId}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
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
