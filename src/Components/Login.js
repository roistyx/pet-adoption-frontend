import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from '../helpers/UserApi';
import { Alert } from '@mui/material';

const theme = createTheme();

export default function LoginForm() {
	const { state, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const { error, username, password, isLoading, isLoggedIn } = state;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await User.Login({ username, password });
			if (response.success === false) {
				dispatch({ type: 'error' });
				console.log('Could not log in');
				return;
			}

			localStorage.setItem('token', response.token);

			dispatch({ type: 'userProfile', payload: response.userProfile });
			dispatch({ type: 'login' });
			dispatch({ type: 'success' });
			navigate('/');
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			{isLoggedIn ? (
				<Typography component="h1" variant="h5">
					Welcome, {state.firstName} {state.lastName}
				</Typography>
			) : (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						{error ? (
							<Alert severity="error">
								Wrong username or password. Please try again.
							</Alert>
						) : null}
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={(e) =>
									dispatch({
										type: 'field',
										field: 'username',
										value: e.currentTarget.value,
									})
								}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) =>
									dispatch({
										type: 'field',
										field: 'password',
										value: e.currentTarget.value,
									})
								}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								disabled={isLoading}
								sx={{ mt: 3, mb: 2 }}
							>
								{isLoading ? 'Loading...' : 'Sign in'}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Button
										onClick={() => dispatch({ type: 'toggleSignupAndSignin' })}
									>
										{state.isToggled ? 'Signup' : 'Signin'}
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			)}
		</ThemeProvider>
	);
}
