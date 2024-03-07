import React, { useState, useContext, useRef } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from '../helpers/UserApi';

import { AuthContext } from '../Contexts/AuthContext';

const theme = createTheme();

export default function LoginForm() {
	const [passwordDontMatchError, setPasswordDontErrorMatch] = useState(false);
	const { state, dispatch } = useContext(AuthContext);

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const passwordConfirmRef = useRef(null);
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const phoneRef = useRef(null);

	if (!state) return console.log('no state');

	const {
		isLoggedIn,

		error_message,
	} = state;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = usernameRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;
		const firstName = firstNameRef.current.value;
		const lastName = lastNameRef.current.value;
		const phoneNumber = phoneRef.current.value;
		if (password !== passwordConfirm) {
			setPasswordDontErrorMatch(true);
			return;
		}

		try {
			dispatch({ type: 'set_message', payload: '' });
			const response = await User.Signup({
				username,
				password,
				firstName,
				lastName,
				phoneNumber,
			});
			console.log('response', response);
			if (response.success === false) {
				dispatch({ type: 'set_message', payload: response.message });
				console.log('Problem signing up:', response.message);
			}
			if (response.success === true) {
				dispatch({ type: 'signup' });
			}
		} catch (e) {
			console.log('error', e);
			dispatch({ type: 'error' });
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />

				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					onSubmit={handleSubmit}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>

					<Typography component="h1" variant="h5">
						{isLoggedIn ? 'Profile Settings' : 'Sign up'}
					</Typography>
					{passwordDontMatchError ? (
						<Alert severity="warning">
							Password does not match the confirm password
						</Alert>
					) : null}
					{error_message ? (
						<Alert severity="error">{error_message}</Alert>
					) : null}
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									inputRef={firstNameRef}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoFocus
									autoComplete="family-name"
									inputRef={lastNameRef}
								></TextField>
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="phone"
									label="Phone Number"
									name="phone"
									autoComplete="phone"
									autoFocus
									inputRef={phoneRef}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
									inputRef={usernameRef}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									inputRef={passwordRef}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password-confirm"
									label="Password"
									type="password"
									id="password-confirm"
									autoComplete="new-password"
									inputRef={passwordConfirmRef}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{isLoggedIn ? 'Save changes' : 'Sign up'}
						</Button>

						<Grid container justifyContent="flex-end">
							<Grid item xs={12}>
								{isLoggedIn ? (
									''
								) : (
									<p>
										Already have an account?
										<Link
											onClick={() =>
												dispatch({ type: 'toggleSignupAndSignin' })
											}
										>
											{state.isToggled ? 'Signup' : 'Sign in'}
										</Link>
									</p>
								)}
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
