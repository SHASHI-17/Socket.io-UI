import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material"
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LayoutLoader } from "../components/layout/Loaders"
import AvatarCard from '../components/shared/AvatarCard'
import UserItem from '../components/shared/UserItem'
import { Link } from '../components/styles/StyledComponents'
import { useAsyncMutation, useErrors } from "../hooks/hooks"
import { useChatDetailsQuery, useDeleteChatGroupMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api"
import { setIsAddMember } from "../redux/reducer/misc"
const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'))
const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'))

const Groups = () => {

  const dispatch = useDispatch();

  const { isAddMember } = useSelector(state => state.misc);

  const chatId = useSearchParams()[0].get('group');

  const myGroups = useMyGroupsQuery('');
  const groupDetails = useChatDetailsQuery({ chatId, populate: true }, {
    skip: !chatId
  })

  console.log(myGroups.data);
  console.log(groupDetails.data);

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatGroupMutation);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([])

  const navigate = useNavigate();

  const errors = [{
    isError: myGroups?.isError, error: myGroups?.error,
    isError: groupDetails?.isError, error: groupDetails?.error,
  }]

  useErrors(errors);

  useEffect(() => {
    if (groupDetails?.data) {
      setGroupName(groupDetails?.data?.chat.name);
      setGroupNameUpdatedValue(groupDetails?.data?.chat.name);
      setMembers(groupDetails?.data?.chat?.members)
    }

    return () => {
      setGroupName('');
      setGroupNameUpdatedValue('');
      setMembers([]);
      setIsEdit(false);
    }

  }, [groupDetails?.data])

  const handleMobile = () => { setIsMobileMenuOpen(!isMobileMenuOpen) }
  const handleMobileClose = () => { setIsMobileMenuOpen(false) }

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup('Updating Group Name...', {
      chatId, name: groupNameUpdatedValue
    });
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  }
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  }

  const deletehandler = () => {
    deleteGroup('Deleting Group...', chatId)
    closeConfirmDeleteHandler();
    navigate('/groups');
    setGroupName('');
    setGroupNameUpdatedValue('');
    setMembers([]);
    setIsEdit(false);
  }

  const removeMemberHandler = (userId) => {
    removeMember('Removing Member...', { chatId, userId });
  }
  const IconBtns = <>

    <Box sx={{
      display: {
        xs: "block",
        sm: "none",
        position: 'fixed',
        right: "1rem",
        top: "1rem"
      }
    }}>
      <IconButton onClick={handleMobile}>
        <Menu />
      </IconButton>
    </Box>

    <Tooltip title='back'>
      <IconButton sx={{
        position: "absolute",
        top: "2rem",
        left: "2rem",
        bgcolor: "#1c1c1c",
        color: "white",
        ":hover": {
          bgcolor: "rgba(0,0,0,0.7)"
        }
      }}
        onClick={() => navigate('/')}
      >
        <KeyboardBackspace />
      </IconButton>
    </Tooltip>
  </>

  const GroupName = <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
    {
      isEdit ? <>
        <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
        <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
          <Done />
        </IconButton>
      </> :
        <>
          <Typography fontFamily={'cursive'} variant='h4'>{groupName}</Typography>
          <IconButton disabled={isLoadingGroupName} onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
    }
  </Stack>


  const ButtonGroup = <Stack direction={{
    sm: 'row',
    xs: "column-reverse"
  }} spacing={'1rem'}
    p={{
      sm: '1rem',
      xs: '0',
      md: '1rem 4rem'
    }}
  >
    <Button size='large' color='error' startIcon={<Delete />} onClick={openConfirmDeleteHandler}>Delete Group</Button>
    <Button size='large' variant='contained' startIcon={<Add />} onClick={openAddMemberHandler}>Add Member</Button>
  </Stack>


  return myGroups.isLoading ? <LayoutLoader /> : (
    <Grid container height={'100vh'} >
      <Grid item sx={{
        display: {
          xs: "none",
          sm: 'block'
        },
        overflow: "auto",
        height: "100vh"
      }} sm={4}  >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        position: 'relative',
        padding: '1rem 3rem'
      }}>

        {IconBtns}
        {myGroups?.data?.groups.length > 0 ? groupDetails?.data?.chat.length > 0 : <Typography p={'2rem'} marginTop={'2rem'} variant='h5' height={'100%'} textAlign={'center'} fontFamily={'cursive'}>Select the Group to manage</Typography> }
        {
          groupName && <>
            {GroupName}
            <Typography  margin={'2rem'} alignSelf={'flex-center'} variant='h4' fontFamily={'cursive'}>Members</Typography>
            <Stack maxWidth={'45rem'}
              width={'100%'}
              boxSizing={'border-box'}
              padding={{
                sm: '1rem',
                xs: "0",
                md: '1rem 4rem'
              }}
              spacing={'2rem'}
              height={'50vh'}
              overflow={'auto'}
            >
              {/* Members  */}
              {
                isLoadingRemoveMember ? <CircularProgress /> :
                  members.map((i, index) => (
                    <UserItem key={index} user={i} isAdded handler={removeMemberHandler} styling={{
                      boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                      padding: "1rem 2rem",
                      borderRadius: "1rem"
                    }} />
                  ))
              }
            </Stack>
            {ButtonGroup}
          </>

        }
      </Grid>


      {
        isAddMember && <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}
            deletehandler={deletehandler}
          />
        </Suspense>
      }

      <Drawer sx={{
        display: {
          xs: "block",
          sm: 'none'
        }
      }} open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupList w={'50vw'} myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>

    </Grid>
  )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    backgroundImage: "linear-gradient(rgb(255 255 209),rgb(249 159 159))",
    height: "100vh", overflow: "auto"
  }}>
    {
      myGroups.length > 0 ? myGroups.map((group, index) => <GroupListItem group={group} chatId={chatId} key={index} />)
        : (<Typography p={'2rem'} variant='h5' height={'100%'} textAlign={'center'} fontFamily={'cursive'}
        >No Groups</Typography>)
    }
  </Stack>
);

const GroupListItem = memo(
  ({ group, chatId }) => {
    const { name, avatar, _id } = group;

    return <Link to={`?group=${_id}`} onClick={e => {
      if (chatId === _id) {
        e.preventDefault();
      }
    }}>
      <Stack direction={"row"} spacing={'1rem'} alignItems={'center'}>
        <AvatarCard avatar={avatar} />
        <Typography fontFamily={'cursive'}>{name}</Typography>

      </Stack>
    </Link>
  }
)

export default Groups