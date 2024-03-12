import { Avatar, Icon, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UserNameIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from 'moment'

const Profile = () => {
    return (
        <Stack  spacing={"2rem"} direction={"column"} alignItems={'center'}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white"
            }} />
            <ProfileCard heading={"bio"} text={"eafsfa dasf dgsggsd"} />
            <ProfileCard heading={"username"} text={"@idnhihai"} Icon={<UserNameIcon/>}/>
            <ProfileCard heading={"name"} text={"Shashi"} Icon={<FaceIcon/>}/>
            <ProfileCard heading={"joined"} text={moment('2023-11-11T00:00:00.000Z').fromNow()} Icon={<CalenderIcon/>}/>
        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack  direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"} >
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