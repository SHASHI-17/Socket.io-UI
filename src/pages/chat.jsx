import { AttachFile, Send } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { getSocket } from '../../Socket';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { NEW_MESSAGE } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useInfiniteScrollTop } from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducer/misc';
import { useEffect } from 'react';


const Chat = ({ chatId, user }) => {

  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });


  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });


  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef,
    oldMessagesChunk.data?.totalPages,
    page, setPage, oldMessagesChunk?.data?.messages)

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ]


  console.log("oldMessages", oldMessages);

  const members = chatDetails?.data?.chat?.members;


  useEffect(()=>{



   return ()=>{
      setMessages([]);
      setMessage('');
      setPage(1);
      setOldMessages('');
    }
  },[chatId])


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
    if(data.chatId !== chatId) return;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const eventHandlers = { [NEW_MESSAGE]: newMessagesHandler }

  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? <Skeleton /> : (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'}
        spacing={'1rem'} bgcolor={'rgba(247,247,247,1)'} height={'90%'} sx={{
          overflowX: "hidden", overflowY: 'auto'
        }}>
        {
          allMessages.map((i, index) => (
            <MessageComponent key={index} message={i} user={user} />
          ))
        }
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
          <InputBox placeholder='Type your message here...' value={message} onChange={e => setMessage(e.target.value)} />
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

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>

    </Fragment>
  )
}

export default AppLayout(Chat)