import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { setIsNewGroup } from '../../redux/reducer/misc'
import UserItem from '../shared/UserItem'

const NewGroup = () => {

  const dispatch = useDispatch();

  const { isNewGroup } = useSelector(state => state.misc)

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers(prev => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
  }
  console.log(selectedMembers);
  const groupName = useInputValidation("");

  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers < 2) return toast.error("Please Select Atleast 3 Members.");

    newGroup("Creating New Group ...",{
      name: groupName.value, members: selectedMembers
    })

    closeHandler();
  }
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }

  const errors = [{
    isError, error
  }]
  useErrors(errors);
  return <Dialog open={isNewGroup} onClose={closeHandler}>
    <Stack p={{ xs: '1rem', sm: "3rem" }} width={'25rem'} spacing={'2rem'}>
      <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>
      <TextField value={groupName.value} onChange={groupName.changeHandler} label="Group Name" />
      <Typography variant='body1'>Members</Typography>
      <Stack>
        {
          isLoading ? <Skeleton /> :
            data?.friends?.map((user, index) => (
              <UserItem user={user} key={index} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
            ))
        }
      </Stack>
      <Stack direction={'row'} justifyContent={'space-evenly'}>
        <Button style={{
                        fontFamily:'cursive'
                    }} variant='text' color='error' onClick={closeHandler}>Cancel</Button>
        <Button style={{
                        fontFamily:'cursive'
                    }} variant='contained' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
      </Stack>
    </Stack>
  </Dialog>
}

export default NewGroup