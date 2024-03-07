import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import LoginForm from './Login';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import SignupForm from './Signup';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: 'white',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function BasicModal() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { state } = useContext(AuthContext);
	const { isToggled, isLoggedIn } = state;

	return (
		<div>
			{!isLoggedIn ? (
				<Button variant="contained" onClick={handleOpen}>
					Log in
				</Button>
			) : (
				''
			)}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>{isToggled ? <LoginForm /> : <SignupForm />}</Box>
			</Modal>
		</div>
	);
}
