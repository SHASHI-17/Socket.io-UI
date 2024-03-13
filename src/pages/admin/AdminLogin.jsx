import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAdmin=true;

const AdminLogin = () => {

    const secretKey = useInputValidation('')

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submit ');
    }

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
                        required fullWidth label='Secret Key' type='password' margin='normal' variant='outlined' />
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