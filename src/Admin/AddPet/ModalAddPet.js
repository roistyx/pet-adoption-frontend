import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddPet from '../AddPet/AddPet';
import { AddPetContextProvider } from './Context';
import { AuthContext } from '../../Contexts/AuthContext';
import PetGallery from '../../Components/PetGallery';
import { CatalogContext } from '../../Contexts/CatalogContext';
import Pet from '../../helpers/CatalogApi';

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
	const [open, setOpen] = React.useState(true);
	const handleClose = () => setOpen(false);
	const { state } = useContext(AuthContext);
	const { catalogState, catalogDispatch } = useContext(CatalogContext);

	useEffect(() => {
		async function userPetList() {
			const term = '';
			try {
				const response = await Pet.getPetCatalog(term);
				console.log('petList', response.data.petList);
				catalogDispatch({
					type: 'petList',
					payload: response.data['petList'],
				});
				catalogDispatch({
					type: 'message',
					payload: response.data,
				});
			} catch (error) {
				console.log(error);
			}
		}
		userPetList();
	});

	return (
		<AddPetContextProvider>
			<PetGallery props={catalogState.petList} />
			{state.role === 'admin' ? (
				<span>
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
