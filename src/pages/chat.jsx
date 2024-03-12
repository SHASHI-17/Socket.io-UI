import React, { Fragment, useRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material'
import { AttachFile, Send } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';
import { sampleMessage } from '../components/constants/sample';
import MessageComponent from '../components/shared/MessageComponent';

const user = {
  _id: 'slflsfasfa',
  name: "shashi"
}

const Chat = () => {

  const containerRef = useRef(null);

  return (
    <Fragment>
      <Stack ref={containerRef} boxSizing={'border-box'} padding={'1rem'}
        spacing={'1rem'} bgcolor={'rgba(247,247,247,1)'} height={'90%'} sx={{
          overflowX: "hidden", overflowY: 'auto'
        }}>

        {
          sampleMessage.map((i,index) => (
            <MessageComponent key={index} message={i} user={user} />
          ))
        }
      </Stack>
      <form style={{
        height: '10%'
      }}>
        <Stack direction={'row'} height={'100%'} padding={'1rem'} alignItems={'center'} position={'relative'}>
          <IconButton sx={{
            position: 'absolute',
            left: '1.5rem',
            rotate: '30deg'
          }}>
            <AttachFile />
          </IconButton>
          <InputBox placeholder='Type your message here...' />
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

      <FileMenu />

    </Fragment>
  )
}

export default AppLayout(Chat)