import React from 'react';
import Container from '@mui/material/Container';
import Pet from '../helpers/CatalogApi';
import Button from '@mui/material/Button';
import ModelEditPet from '../Admin/AddPet/ModelEditPet';

export default function PetPreviewButton({
	petState,
	setPetState,
	userInfoState,
}) {
	const { status, _id, created_by } = petState;

	async function handleCareGiverSelection(status) {
		petState.status = status;

		if (status === 'available') {
			petState.currentOwner = userInfoState._id;

			console.log(petState.status);

			try {
				const response = await Pet.EditPet(petState);
				console.log('created_by', created_by);
				setPetState((petState.status = status));
				return response;
			} catch (error) {
				console.log(error);
			}
		} else {
			if (status !== 'available') {
				petState.currentOwner = created_by;
				if (status === 'adopt') status = 'adopt';
				if (status === 'foster') status = 'foster';
				console.log('petState', petState);

				try {
					const response = await Pet.EditPet(petState);
					console.log('response', response);
					setPetState((petState.status = status));
					return response;
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	const handleDelete = async () => {
		await Pet.deletePetProfile(_id);
	};

	return (
		<Container maxWidth="sm" sx={{ p: 2 }}>
			{status !== 'adopt' && status === 'available' ? (
				<Button
					onClick={() => handleCareGiverSelection('adopt')}
					aria-label="Adopt the pet"
				>
					Adopt
				</Button>
			) : null}

			{status !== 'foster' && status === 'available' ? (
				<Button
					value="foster"
					onClick={() => handleCareGiverSelection('foster')}
					aria-label="Foster"
				>
					Foster
				</Button>
			) : null}

			{status !== 'available' ? (
				<Button
					onClick={() => handleCareGiverSelection('available')}
					aria-label="Adopt the pet"
				>
					Return
				</Button>
			) : null}
			<ModelEditPet pet={petState} />

			<Button onClick={() => handleDelete()}>Delete</Button>
		</Container>
	);
}
