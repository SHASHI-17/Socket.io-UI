import React from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import AvatarCard from './AvatarCard'

const ChatItem = ({
    avatar=[],
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat
}) => {
  return (
    <Link
    sx={{
        padding:'0'
    }}
     to={`/chat/${_id}`} onContextMenu={(e)=>handleDeleteChat(e,_id,groupChat)}>
        <div style={{
            display:'flex',
            gap:'1rem',
            alignItems:'center',
            padding:'1rem',
            backgroundColor:sameSender? 'black' :'unset',
            color:sameSender ? 'white' :'unset',
            position:'relative',
        }}>
                <AvatarCard avatar={avatar}/>
                <Typography fontFamily={'cursive'}>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography fontFamily={'cursive'}>{newMessageAlert.count} New Message</Typography>
                    ) 
                }
                {
                    isOnline && <Box sx={{
                        width:'10px',
                        height:'10px',
                        borderRadius:'50%',
                        backgroundColor:'green',
                        position:'absolute',
                        top:'50%',
                        right:"1rem",
                        transform:'translateY(-50%)'
                    }} />
                }
        </div>
    </Link>
  )
}

export default memo(ChatItem)