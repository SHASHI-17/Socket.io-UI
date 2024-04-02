import { CalendarMonth as CalenderIcon, Face as FaceIcon, AlternateEmail as UserNameIcon } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const Profile = ({ user }) => {
    return (
        <Stack spacing={"2rem"} direction={"column"} height={'100%'} alignItems={'center'}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white"
            }}
            src={user?.data?.avatar?.url || user?.avatar?.url }
             />
            <ProfileCard heading={"bio"} text={user?.data?.bio  || user?.bio } />
            <ProfileCard heading={"username"} text={user?.data?.username ||user?.username } Icon={<UserNameIcon />} />
            <ProfileCard heading={"name"} text={user?.data?.name || user?.name } Icon={<FaceIcon />} />
            <ProfileCard heading={"joined"} 
            text={moment(user?.data?.createdAt).fromNow() || moment(user?.createdAt).fromNow()} Icon={<CalenderIcon />} />
        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"} >
        {
            Icon && Icon
        }
        <Stack>
            <Typography fontFamily={'cursive'} variant='p'>{text}</Typography>
            <Typography fontFamily={'cursive'} variant='caption' color={'gray'}
                fontSize={'0.8rem'} fontWeight={'200'}
            >{heading}</Typography>
        </Stack>
    </Stack>
)

export default Profile