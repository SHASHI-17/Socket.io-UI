import { useInfiniteScrollTop } from '6pp';
import { AttachFile, Send } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSocket } from '../../Socket';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { removeNewMessagesAlert } from '../redux/reducer/chat';
import { setIsFileMenu } from '../redux/reducer/misc';
import { TypingLoader } from '../components/layout/Loaders';
import { useNavigate } from 'react-router-dom';


const Chat = ({ chatId, user }) => {

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);


  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const bottomRef = useRef(null)

  // console.log(userTyping);

  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });


  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef,
    oldMessagesChunk.data?.totalPages,
    page, setPage, oldMessagesChunk?.data?.messages)

  const errors = [
    { isError: chatDetails?.isError, error: chatDetails?.error },
    { isError: oldMessagesChunk?.isError, error: oldMessagesChunk?.error },
  ]

  const members = chatDetails?.data?.chat?.members;

  useEffect(() => {
    console.log(user?.data?._id);
    socket.emit(CHAT_JOINED,{
      userId:user?.data?._id,members
    })

    dispatch(removeNewMessagesAlert(chatId));
    return () => {
      setMessages([]);
      setMessage('');
      setPage(1);
      setOldMessages([]);
      socket.emit(CHAT_LEAVED,{
        userId:user?.data?._id,members
      });
      
    }
  }, [chatId])


  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])


  useEffect(()=>{
    if(chatDetails.isError) return navigate('/');
  },[chatDetails?.isError])

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage('');
  }


  const newMessagesHandler = useCallback((data) => {
    if (data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data?.message]);
  }, [chatId]);

  const startTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    console.log('start - typing', data);
    setUserTyping(true);
  }, [chatId]);

  const stopTypingListener = useCallback((data) => {
    if (data.chatId !== chatId) return;
    console.log('stop - typing', data);
    setUserTyping(false);
  }, [chatId]);

  const alertListener = useCallback((data) => {

    if (data.chatId !== chatId) return;
    const messageForAlert = {
      content:data.message,
      sender: {
        _id: "dlakskfa",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, messageForAlert]);

  }, [chatId]);

  const eventHandlers = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesHandler,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  }

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  }


  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'}
        spacing={'1rem'} bgcolor={'rgba(247,247,247,1)'} height={'90%'} sx={{
          overflowX: "hidden", overflowY: 'auto'
        }}>
        {
          allMessages?.map((i, index) => (
            <MessageComponent key={index} message={i} user={user} />
          ))
        }
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form style={{
        height: '10%'
      }}
        onSubmit={submitHandler}
      >
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{
            position: 'absolute',
            left: '1.5rem',
            rotate: '30deg'
          }}
            onClick={handleFileOpen}>
            <AttachFile />
          </IconButton>
          <InputBox placeholder='Type your message here...' value={message}
            onChange={messageOnChange}
          />
          <IconButton type='submit' sx={{
            backgroundColor: '#D04848',
            color: 'whitesmoke',
            marginLeft: '1rem',
            padding: '0.5rem',
            "&:hover": {
              bgcolor: "error.dark"
            },
            rotate: '-30deg'
          }}>
            <Send />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />

    </Fragment>
  )
}

export default AppLayout(Chat)