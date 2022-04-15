import { Box, Button, FormControl, Link, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "../core/Hooks"
import { registerAsync } from "../core/logic/AuthLogic"

function Signup() {
    const auth = useAuthorization()
    const navigate = useNavigate()

    useEffect(() => {
        if ( auth ) {
            navigate('/')
        }
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


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
                      registerAsync(username, password).then(() => {
                          navigate('/')
                      })
                    }}>Signup</Button>
            </FormControl>
            <Link onClick={() => navigate('/login')} component='a'>Login</Link>
        </Box>
    )
}

export default Signup;