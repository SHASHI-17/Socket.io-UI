import { Avatar, Icon, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from 'moment'
import { transformImage } from '../../lib/features'

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
            src={transformImage(user?.data?.avatar?.url)}
             />
            <ProfileCard heading={"bio"} text={user?.data?.bio} />
            <ProfileCard heading={"username"} text={user?.data?.username} Icon={<UserNameIcon />} />
            <ProfileCard heading={"name"} text={user?.data?.name} Icon={<FaceIcon />} />
            <ProfileCard heading={"joined"} text={moment(user?.data?.createdAt).fromNow()} Icon={<CalenderIcon />} />
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