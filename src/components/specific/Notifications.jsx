import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { sampleNotifications } from '../constants/sample'

const Notifications = () => {

  const friendRequestHandler = ({ _id, accept }) => {

  }

  return <Dialog open>
    <Stack p={{ xs: '1rem', sm: "2rem" }} maxWidth={'25rem'}>
      <DialogTitle>Notifications</DialogTitle>
      {
        sampleNotifications.length > 0 ? (
          sampleNotifications.map((i,index) => (
            <NotificationItem notification={i} sender={i.sender} _id={i._id} key={index}
              handler={friendRequestHandler}
            />
          ))
        ) : <Typography textAlign={'center'}>No Notifications</Typography>
      }
    </Stack>
  </Dialog>
}

const NotificationItem = memo(
  ({ sender, _id, handler }) => {
    const { name, avatar } = sender;
    return (
      <ListItem>
        <Stack
          direction={'row'} alignItems={'center'} spacing={'1rem'} width={'100%'}>
          <Avatar src={avatar}/>
          <Typography
            sx={{
              flexGrow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: "100%"
            }}
          >{`${name} sent you a friend request.`}</Typography>
          <Stack direction={{
            xs:"column",
            // sm:"row"
          }}>
            <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
            <Button color='error' onClick={()=>handler({_id,accept:false})}>Reject</Button>
          </Stack>
        </Stack>
      </ListItem>
    )
  }
)

export default Notifications