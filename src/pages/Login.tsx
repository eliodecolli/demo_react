import { Button, FormControl, Link, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAuthorization } from "../core/Hooks";
import { login } from "../store/default";

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const auth = useAuthorization()

    useEffect(() => {
        if ( auth ) {
            navigate('/')
        }
    })

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
                    <Button variant='contained' onClick={() => {
                      dispatch(login({
                          userName: username,
                          token: 'abc'
                      }))
                      navigate('/')
                    }}>Login</Button>
            </FormControl>
            <Link onClick={() => navigate('/signup')} component='a'>Sign up</Link>
        </Box>
    )
}

export default Login;