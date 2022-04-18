import { Button, FormControl, Link, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useAuthorization } from "../core/Hooks";
import { loginAsync, AuthResponse } from "../core/logic/AuthLogic";
import { setupAxios } from "../core/logic/TodoLogic";
import { getGroupsThunk } from "../store/thunks/TodoThunks";

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()
    
    const [auth] = useAuthorization()

    useEffect(() => {
        if ( auth ) {
            navigate('/')
        }
    })

    function handleLogin() {
        loginAsync(username, password).then(x => {
            if ( x.error ) {
                alert(x.message) // too lazy to do fancy dialogs
            }
            else {
                const token = x.token as string;
                localStorage.setItem('x-token', token)
                //@ts-ignore
                navigate(location.state?.from?.pathname || '/')
            }
        })
    }

    return (
        <Box sx={{
            padding: 1,
            maxWidth: 600,
            margin: 'auto'
        }}>
            <FormControl sx={{ margin: 'auto' }}>
                    <TextField id='username_field' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(event.target.value)
                        }} 
                        value={username}
                        label="Username"
                    />
                    <TextField id='password_field' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value)
                        }}
                        value={password}
                        type="password"
                        label="Password"
                    />
                    <Button variant='contained' onClick={() => handleLogin()}>Login</Button>
            </FormControl>
            <Link onClick={() => navigate('/signup')} component='a'>Sign up</Link>
        </Box>
    )
}

export default Login;