import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../constants/sample'
import UserItem from '../shared/UserItem'



const Search = () => {
  const search = useInputValidation('');

  const addFriendHandler=(id)=>{console.log(id);}
  let isLoadingSendFriendRequest=false;

  const [users,setUsers]=useState(sampleUsers);

  return <Dialog open>
    <Stack p={"2rem"} direction={'column'} width={'25rem'}>
      <DialogTitle textAlign={'center'}>Find People</DialogTitle>
      <TextField label='' value={search.value}
        onChange={search.changeHandler}
        variant='outlined'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Stack>
    <List>
      {
        users.map(user => (
          <UserItem user={user} key={user._id} handler={addFriendHandler}
           handlerIsLoading={isLoadingSendFriendRequest} />
        ))
      }
    </List>
  </Dialog>
}

export default Search