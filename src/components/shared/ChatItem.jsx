import React from 'react'
import { Link } from '../styles/StyledComponents'
import { Box, Typography } from '@mui/material'
import { memo } from 'react'
import AvatarCard from './AvatarCard'
import { motion } from 'framer-motion'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {

    return (
        <Link
            key={_id}
            sx={{
                padding: '0'
            }}
            to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: sameSender ? 'black' : 'unset',
                    color: sameSender ? 'white' : 'unset',
                    position: 'relative',
                }}>
                <AvatarCard avatar={avatar} />
                <Typography fontFamily={'cursive'}>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography fontFamily={'cursive'}>{newMessageAlert.count} New Message</Typography>
                    )
                }
                {
                    isOnline && <Box sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        position: 'absolute',
                        top: '50%',
                        right: "1rem",
                        transform: 'translateY(-50%)'
                    }} />
                }
            </motion.div>
        </Link>
    )
}

export default memo(ChatItem)