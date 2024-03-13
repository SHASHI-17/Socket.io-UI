import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material"
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { Suspense, lazy, memo, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { sampleChats, sampleUsers } from '../components/constants/sample'
import AvatarCard from '../components/shared/AvatarCard'
import UserItem from '../components/shared/UserItem'
import { Link } from '../components/styles/StyledComponents'
const AddMemberDialog = lazy(()=>import('../components/dialogs/AddMemberDialog'))
const ConfirmDeleteDialog = lazy(()=>import('../components/dialogs/ConfirmDeleteDialog'))

const isAddMember=false;

const Groups = () => {

  const chatId = useSearchParams()[0].get('group');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => { setIsMobileMenuOpen(!isMobileMenuOpen) }
  const handleMobileClose = () => { setIsMobileMenuOpen(false) }

  const updateGroupName = () => {
    setIsEdit(false);
    console.log('Group Name Updated');
  }

  const openConfirmDeleteHandler = () => {
    console.log('confirmDeleteHandler');
    setConfirmDeleteDialog(true);
  }
  const closeConfirmDeleteHandler = () => {
    console.log('closeConfirmDeleteHandler');
    setConfirmDeleteDialog(false);
  }
  const openAddMemberHandler = () => { }
  const deletehandler = () => { 
    closeConfirmDeleteHandler();
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
        <IconButton onClick={updateGroupName}>
          <Done />
        </IconButton>
      </> :
        <>
          <Typography variant='h4'>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
    }
  </Stack>

  useEffect(() => {
    if(chatId){
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }

  }, [chatId])

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


    const removeMemberHandler=()=>{}


  return (
    <Grid container height={'100vh'} >
      <Grid item sx={{
        display: {
          xs: "none",
          sm: 'block'
        },
        overflow:"auto",
        height:"100vh"
      }} sm={4}  >
        <GroupList myGroups={sampleChats} chatId={chatId} />
      </Grid>

      <Grid item xs={12} sm={8} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        position: 'relative',
        padding: '1rem 3rem'
      }}>

        {IconBtns}
        {
          groupName && <>
            {GroupName}
            <Typography margin={'2rem'} alignSelf={'flex-start'} variant='body1'>Members</Typography>
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
                sampleUsers.map((i)=>(
                  <UserItem key={i._id} user={i} isAdded handler={removeMemberHandler} styling={{
                    boxShadow:'0 0 0.5rem rgba(0,0,0,0.2)',
                    padding:"1rem 2rem",
                    borderRadius:"1rem"
                  }}/>
                ))
              }
            </Stack>
            {ButtonGroup}
          </>

        }
      </Grid>


        {
          isAddMember && <Suspense fallback={<Backdrop open/>}>
            <AddMemberDialog/>
          </Suspense>
        }

      {
        confirmDeleteDialog && <Suspense fallback={<Backdrop open/>}>
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
        <GroupList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid>
  )
}

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{
    backgroundImage:"linear-gradient(rgb(255 255 209),rgb(249 159 159))",
    height:"100vh" ,overflow:"auto"
  }}>
    {
      myGroups.length > 0 ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
        : (<Typography>No Groups</Typography>)
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
        <Typography>{name}</Typography>

      </Stack>
    </Link>
  }
)

export default Groups