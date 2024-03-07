import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import User from '../helpers/UserApi';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { v4 } from 'uuid';

export default function CardActionsComponent({ card }) {
	const { state } = useContext(AuthContext);
	const [cardsState, setCardState] = useState(false);
	const { pets: userSavedPets } = state;
	console.log('cardsState', cardsState);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userSavedPets) return;
		if (userSavedPets.includes(card._id)) {
			return setCardState(true);
		} else {
			return card;
		}
	}, [userSavedPets]);

	const handleSave = async (id) => {
		console.log('handleSave', id);
		try {
			await User.savePet(id);
			setCardState(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnSave = async (id) => {
		try {
			await User.unSavePet(id);
			setCardState(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container sx={{ py: 1 }} maxWidth="md">
			<Grid
				container
				spacing={1}
				style={{ display: 'flex', justifyContent: 'end' }}
			>
				<Grid
					item
					key={v4()}
					xs={12}
					sm={6}
					md={4}
					style={{ display: 'flex', justifyContent: 'end' }}
				>
					<Button
						size="small"
						onClick={() => {
							navigate(`/catalog/pet/${card._id}`);
						}}
					>
						View
					</Button>
				</Grid>
				<Grid item key={v4()} xs={12} sm={6} md={4}>
					{cardsState ? (
						<Button onClick={() => handleUnSave(card._id)}>Unsave</Button>
					) : (
						<Button onClick={() => handleSave(card._id)}>Save</Button>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}
