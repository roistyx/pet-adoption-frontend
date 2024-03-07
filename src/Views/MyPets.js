import React, { useContext, useEffect, useState } from 'react';
import PetGallery from '../Components/PetGallery';
import Pet from '../helpers/CatalogApi';
import { CatalogContext } from '../Contexts/CatalogContext';
import Button from '@mui/material/Button';

import User from '../helpers/UserApi';

export default function MyPets() {
	const { catalogState, catalogDispatch } = useContext(CatalogContext);
	const [setDisplayState] = useState([]);

	async function userPetList() {
		try {
			const response = await Pet.getUserPets();
			catalogDispatch({
				type: 'myPetsList',
				payload: response.data.list,
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		userPetList();
	}, []);

	function handleCaregiverDisplay() {
		setDisplayState('caregiver');
		userPetList();
	}

	async function handleSavedPetsDisplay() {
		try {
			const savedPets = await User.getSavedPets();

			catalogDispatch({
				type: 'myPetsList',
				payload: savedPets.data.list,
			});
			setDisplayState('saved');

			return savedPets;
		} catch (error) {
			console.log(error);
		}
	}
	const petList = catalogState.myPetsList;

	const buttons = [
		<Button onClick={handleCaregiverDisplay} key="one">
			Caregiver{' '}
		</Button>,
		<Button onClick={handleSavedPetsDisplay} key="two">
			Saved Pets
		</Button>,
	];

	if (!petList) return console.log('no pets');

	return (
		<div>
			{buttons}
			<PetGallery props={petList} />
		</div>
	);
}
