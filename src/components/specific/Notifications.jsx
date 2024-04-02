import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../../hooks/hooks'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api'
import { setIsNotification } from '../../redux/reducer/misc'
import toast from 'react-hot-toast'

const Notifications = () => {

  const dispatch = useDispatch();

  const { isNotification } = useSelector(state => state.misc)

  const { isLoading, data, isError, error } = useGetNotificationsQuery();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ accept, requestId:_id});

      if(res.data?.success) {
        console.log('socket use krenge');
        toast.success(res.data.message)
      }else{
        toast.error(res.data?.error || 'Something went wrong')
      }

    } catch (e) {
      toast.error(e.message || 'Something went wrong')
    }
  }

  useErrors([{ error, isError }])

  const closeHandler = () => dispatch(setIsNotification(false))

  return <Dialog open={isNotification} onClose={closeHandler}>
    <Stack p={{ xs: '1rem', sm: "2rem" }} maxWidth={'25rem'}>
      <DialogTitle>Notifications</DialogTitle>
      {
        isLoading ? <Skeleton /> : <>
          {
            data?.allRequests.length > 0 ? (
              data?.allRequests.map((i, index) => (
                <NotificationItem notification={i} sender={i.sender} _id={i._id} key={index}
                  handler={friendRequestHandler}
                />
              ))
            ) : <Typography textAlign={'center'}>No Notifications</Typography>
          }
        </>
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
          <Avatar src={avatar} />
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
            xs: "column",
            // sm:"row"
          }}>
            <Button style={{
                        fontFamily:'cursive'
                    }} onClick={() => handler({ _id, accept: true })}>Accept</Button>
            <Button style={{
                        fontFamily:'cursive'
                    }} color='error' onClick={() => handler({ _id, accept: false })}>Reject</Button>
          </Stack>
        </Stack>
      </ListItem>
    )
  }
)

export default Notifications