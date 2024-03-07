import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddPet from '../AddPet/AddPet';
import { AddPetContextProvider } from './Context';
import { AuthContext } from '../../Contexts/AuthContext';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	// width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function ModelEditPet(pet) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { state } = useContext(AuthContext);

	return (
		<AddPetContextProvider>
			{state.role === 'admin' ? (
				<span>
					<Button onClick={handleOpen}>Edit Pet</Button>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<AddPet props={pet} />
						</Box>
					</Modal>
				</span>
			) : null}
		</AddPetContextProvider>
	);
}
