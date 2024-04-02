import { useFetchData } from '6pp';
import { AdminPanelSettings, Group, Message, Notifications, Person } from '@mui/icons-material';
import { Box, Container, Paper, Skeleton, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { DoughNut, LineChart } from '../../components/shared/Charts';
import { CurveButton, SearchField } from '../../components/styles/StyledComponents';
import { useErrors } from '../../hooks/hooks';
import { server } from '../../lib/config';

const Dashboard = () => {

  const { loading, data, error } = useFetchData(
    `${server}/admin/stats`,
    "dashboard-stats"
  );

  const { stats } = data || {};
  console.log(data);

  useErrors([
    { isError: error, error }
  ])

  const Appbar = (
    <Paper elevation={3} style={{
      borderRadius: "1rem", padding: "1.5rem", margin: '1rem 0'
    }}>
      <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
        <AdminPanelSettings sx={{
          fontSize: "3rem"
        }} />
        <SearchField type="text" placeholder='Search...' />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography display={{
          xs: "none",
          lg: "block"
        }} color={'rgba(0,0,0,0.7)'} textAlign={'center'}
        >{moment().format('dddd, D MMMM YYYY')}</Typography>
        <Notifications />
      </Stack>
    </Paper>
  )

  const Widgets = <Stack direction={{
    sx: "column", sm: "row"
  }} spacing={'2rem'} justifyContent={'space-between'} alignItems={'center'} margin={'1.3rem 0'}
  >
    <Widget title={"Users"} value={stats?.usersCount} Icon={<Person />} />
    <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<Group />} />
    <Widget title={"Messages"} value={stats?.messagesCount} Icon={<Message />} />
  </Stack>



  return (
    <AdminLayout>
      {loading ? <Skeleton height={'100vh'}/> : <Container component={'main'}>
        {
          Appbar
        }

        <Stack direction={{
          xs: "column",
          lg: "row"
        }} style={{ gap: "2rem" }} flexWrap={'wrap'} justifyContent={'center'} alignItems={{
          xs: "center", lg: "stretch"
        }}>
          <Paper elevation={3} sx={{
            padding: '2rem 3.5rem', borderRadius: '1rem',
            width: "100%", maxWidth: "42rem",
          }} >
            <Typography variant='h5'>Last Messages</Typography>
            <LineChart value={stats?.messageChart || []} />
          </Paper>

          <Paper elevation={3} sx={{
            padding: "1rem",
            borderRadius: "1rem",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%" },
            position: "relative",
            maxWidth: '24rem',
          }}>
            <DoughNut labels={['Single Chat', 'Group Chats']} value={[stats?.totalChatsCount - stats?.groupsCount || 0, stats?.groupsCount || 0]} />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={'center'}
              spacing={'0.5rem'}
              width={'100%'}
              height={'100%'}
            >
              <Group /> <Typography>Vs</Typography> <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>}
    </AdminLayout>
  )
}


const Widget = ({ title, value, Icon }) => <Paper elevation={3}
  sx={{
    padding: '2rem', margin: "2rem 0", borderRadius: "1.5rem", width: "20rem"
  }}
>
  <Stack alignItems={'center'} spacing={'1rem'}>
    <Typography sx={{
      color: 'rgba(0,0,0,0.7)',
      borderRadius: '50%',
      border: "5px solid rgba(0,0,0,0.9)",
      width: "5rem",
      height: "5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>{value}</Typography>
    <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
      {Icon}
      <Typography>{title}</Typography>
    </Stack>
  </Stack>
</Paper>

export default Dashboard