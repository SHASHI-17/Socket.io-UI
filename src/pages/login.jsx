import { useFileHandler, useInputValidation } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { server } from '../lib/config';
import { userExists } from '../redux/reducer/auth';
import { usernameValidator } from '../utils/validators';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);
    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useInputValidation();

    const avatar = useFileHandler("single", 2);
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);
        try {
            const { data } = await axios.post(
                `${server}/user/new`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            );
            console.log(data);
            dispatch(userExists(true));
            toast.success(data.message);
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Something went Wrong');
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data, ...response } = await axios.post(`${server}/user/login`, {
                username: username.value,
                password: password.value,
            }, config);
            console.log(data);
            dispatch(userExists(true));
            toast.success(data.message);
        } catch (e) {
            toast.error(e?.response?.data?.message || 'Something went Wrong');
        }
    }

    return (
        <Container component={'main'} maxWidth='xs' sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {isLogin ? (
                    <>
                        <Typography variant='h5'>Login</Typography>
                        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: "1rem" }}>
                            <TextField
                                value={username.value || ''}  // Initialize with empty string if undefined
                                onChange={username.changeHandler}
                                required fullWidth label='Username' margin='normal' variant='outlined' />
                            <TextField
                                value={password.value || ''}  // Initialize with empty string if undefined
                                onChange={password.changeHandler}
                                required fullWidth label='Password' type='password' margin='normal' variant='outlined' />
                            <Button variant='contained' color='primary' type='submit' sx={{ marginTop: '0.5rem' }} fullWidth> Login</Button>
                            <Typography textAlign={'center'} m={'0.5rem'}>OR</Typography>
                            <Button variant='text' color='secondary' onClick={() => setIsLogin(false)} fullWidth>Sign Up Instead</Button>
                        </form>
                    </>
                ) : (
                    <>
                        <Typography variant='h5'>Sign Up</Typography>
                        <form onSubmit={handleSignUp} style={{ width: '100%', marginTop: "1rem" }}>
                            <Stack position={'relative'} width={'10rem'} margin={"auto"}>
                                <Avatar sx={{ width: "10rem", height: "10rem", objectFit: 'contain' }} src={avatar.preview || ''} />
                                <IconButton component="label" sx={{
                                    position: 'absolute',
                                    bottom: "0",
                                    right: "0",
                                    color: "white",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    ":hover": { bgcolor: "rgba(0,0,0,0.7)" }
                                }}>
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                    </>
                                </IconButton>
                            </Stack>
                            {avatar.error && (
                                <Typography m={"1rem auto"} display={'block'} width={'fit-content'} color="error" variant='caption'>{avatar.error}</Typography>
                            )}
                            <TextField value={name.value || ''} onChange={name.changeHandler} size='small' required fullWidth label='Name' margin='normal' variant='outlined' />
                            <TextField value={bio.value || ''} onChange={bio.changeHandler} size='small' required fullWidth label='Bio' margin='normal' variant='outlined' />
                            <TextField value={username.value || ''} onChange={username.changeHandler} size='small' required fullWidth label='Username' margin='normal' variant='outlined' />
                            {username.error && (<Typography color="error" variant='caption'>{username.error}</Typography>)}
                            <TextField value={password.value || ''} onChange={password.changeHandler} size='small' required fullWidth label='Password' type='password' margin='normal' variant='outlined' />
                            {password.error && (<Typography color="error" variant='caption'>{password.error}</Typography>)}
                            <Button size='small' variant='contained' color='primary' type='submit' sx={{ marginTop: '0.5rem' }} fullWidth>Sign Up</Button>
                            <Typography textAlign={'center'} m={'0.7rem'}>OR</Typography>
                            <Button size='small' variant='text' color='secondary' onClick={() => setIsLogin(!isLogin)} fullWidth>Login Instead</Button>
                        </form>
                    </>
                )}
            </Paper>
        </Container>
    );
}

export default Login;
