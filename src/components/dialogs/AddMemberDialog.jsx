import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api'
import { setIsAddMember } from '../../redux/reducer/misc'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({ chatId }) => {

    const dispatch = useDispatch();

    const { isAddMember } = useSelector(state => state.misc);

    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMembersMutation);

    const [selectedMembers, setSelectedMembers] = useState([]);

    const selectMemberHandler = (id) => {
        setSelectedMembers(prev => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
    }

    const addMemberSubmitHandler = () => {
        addMember("Adding Members...", { chatId, members: selectedMembers });
        closeHandler();
    }
    const closeHandler = () => {
        dispatch(setIsAddMember(false))
    }

    useErrors([{
        isError, error
    }]);

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p={'2rem'} width={'20rem'} spacing={'2rem'}>
                <DialogTitle textAlign={'center'}>Add Member</DialogTitle>
                <Stack spacing={'1rem'}>
                    {
                        isLoading ? <Skeleton /> : data?.friends?.length > 0 ? data?.friends?.map((i, index) => (
                            <UserItem key={index} user={i} handler={selectMemberHandler}
                                isAdded={selectedMembers.includes(i._id)} />
                        )) : <Typography textAlign={'center'}>No Friends</Typography>
                    }
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
                    <Button color='error' style={{
                        fontFamily:'cursive'
                    }} onClick={closeHandler}>Cancel</Button>
                    <Button style={{
                        fontFamily:'cursive'
                    }} onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMember}>Submit Changes</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog