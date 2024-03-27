import { Box, Typography } from '@mui/material';
import moment from 'moment';
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';

const MessageComponent = ({ message, user }) => {

    const { sender, content, attachments=[], createdAt } = message;
    console.log(attachments);
    const sameSender = sender?._id === user?.data?._id;

    const timeAgo=moment(createdAt).fromNow()

    return (
        <div style={{
            alignSelf: sameSender ? 'flex-end' : 'flex-start',
            backgroundColor:'white',
            color:'black',
            borderRadius:'5px',
            width:'fit-content',
            padding:'0.5rem'
        }}>
            {
                !sameSender  && <Typography color={'#2694ab'} variant='caption' fontWeight={"600"}>{sender.name}</Typography>
            }
            {
                content && <Typography>{content}</Typography>
            }
            {
                attachments.length > 0  && attachments.map((attachment,index)=>{
                    const url=attachment.url;
                    const file=fileFormat(url);
                    console.log(file);
                    return <Box key={index}>
                        <a href={url} target='_blank' download style={{
                            color:'black'
                        }}>
                            {
                                RenderAttachment(file,url)
                            }
                        </a>
                    </Box>
                })
            }
            {
                <Typography variant='caption' color={'text.secondary'}>{timeAgo}</Typography>
            }
        </div>
    )
}

export default memo(MessageComponent)