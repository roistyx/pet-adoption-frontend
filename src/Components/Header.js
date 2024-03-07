import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PetIcon from '@mui/icons-material/Pets';
import Stack from '@mui/material/Stack';
import ModalLogin from './ModalLogin';
import Link from '@mui/material/Link';
import { AuthContext } from '../Contexts/AuthContext';

import { v4 } from 'uuid';
const pages = [''];

export default function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const { state, dispatch } = useContext(AuthContext);
	const { isLoggedIn, firstName, lastName, role } = state;
	const navigate = useNavigate();

	const settings = [
		<Link
			onClick={() => {
				navigate('/Profile');
			}}
		>
			Profile
		</Link>,
		<Link
			onClick={() => {
				navigate('/MyPets');
			}}
		>
			My pets
		</Link>,
		<Link
			onClick={() => {
				navigate('/AddPet');
			}}
		>
			{role ? 'Add Pet' : ''}
		</Link>,
		<Link
			onClick={() => {
				navigate('/logout');
				dispatch({ type: 'logout' });
			}}
		>
			Logout
		</Link>,
	];

	const handleOpenNavMenu = (e) => {
		setAnchorElNav(e.currentTarget);
	};
	const handleOpenUserMenu = (e) => {
		setAnchorElUser(e.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<PetIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => {
							navigate('/');
						}}
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Lovey Pets
					</Typography>

					<Box
						id="greeting"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<PetIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Lovie Pets
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>
					<Stack direction="row" spacing={2}>
						<Typography variant="h6" gutterBottom sx={{ pt: 1 }}>
							{isLoggedIn
								? `Welcom, ${firstName} ${lastName}!`
								: 'Hello, Guest'}
						</Typography>
						<ModalLogin />
						{isLoggedIn ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={firstName} src="/static/images/avatar/2.jpg" />
									</IconButton>
								</Tooltip>

								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={v4()} onClick={handleCloseUserMenu}>
											<Typography textAlign="center">{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : (
							''
						)}
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
