import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdmin } from '../../redux/thunks/admin';



const AdminLogin = () => {

    const {isAdmin} =useSelector(state=>state.auth);
    const dispatch=useDispatch();

    const secretKey = useInputValidation('')

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))
        console.log('Submit ');
    }


    useEffect(()=>{
        dispatch(getAdmin())
    },[])

    if(isAdmin) return <Navigate to={'/admin/dashboard'}/>

    return <Container component={'main'} maxWidth='xs' sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <>
                <Typography variant='h5'>Admin Login</Typography>
                <form onSubmit={submitHandler} style={{
                    width: '100%', marginTop: "1rem"
                }}>
                    <TextField
                        value={secretKey.value} onChange={secretKey.changeHandler}
                        required fullWidth label='Secret Key' margin='normal' variant='outlined' />
                    <Button variant='contained' color='primary' type='submit'
                        sx={{
                            marginTop: '0.5rem'
                        }}
                        fullWidth
                    >Login</Button>
                </form>
            </>

        </Paper>
    </Container>
}

export default AdminLogin