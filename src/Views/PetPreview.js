import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Pet from '../helpers/CatalogApi';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../Contexts/AuthContext';
import PetPreviewButton from '../Components/PetPreviewButtons';
import { CatalogContext } from '../Contexts/CatalogContext';

export default function PetPreview() {
	const { catalogState, catalogDispatch } = useContext(CatalogContext);
	const [petState, setPetState] = useState('');
	const { id: petId } = useParams();
	const { state: userInfoState } = useContext(AuthContext);

	const {
		status,
		age,
		breed,
		color,
		height,
		hypoallergenic,
		profilePic,
		specie,
		weight,
		name,
		bio,
		sex,
		created_at,
	} = petState;

	useEffect(() => {
		async function getProfilePreview() {
			try {
				const response = await Pet.getPetProfile(petId);
				setPetState(response.data.pet);
			} catch (error) {
				console.log(error);
			}
		}

		getProfilePreview();
	}, [status]);

	return (
		<Container maxWidth="sm" sx={{ p: 2 }}>
			{!petState ? (
				<h1>Sorry, pet doesn't exist.</h1>
			) : (
				<Card ssx={{ maxWidth: 550 }}>
					<CardHeader
						title={`Meet, ${name}`}
						subheader={`Listed on: ${new Date(
							created_at
						).toLocaleDateString()}`}
					/>
					<CardMedia
						component="img"
						width="200"
						height="300"
						image={profilePic}
						alt="Pet Picture"
					/>
					<CardContent>
						<h4>{bio}</h4>
					</CardContent>

					<CardContent>
						<Grid
							container
							rowSpacing={1}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs={5}>
								Specie: {specie}
							</Grid>
							<Grid item xs={5}>
								Breed: {breed}
							</Grid>
							<Grid item xs={5}>
								Age: {age}
							</Grid>
							<Grid item xs={5}>
								Sex: {sex}
							</Grid>
							<Grid item xs={5}>
								Weight: {weight}
							</Grid>
							<Grid item xs={5}>
								Color: {color}
							</Grid>
							<Grid item xs={5}>
								Height: {height}
							</Grid>
							<Grid item xs={5}>
								Adoption status: {!status ? 'Available' : status}
							</Grid>
							<Grid item xs={5}>
								Height: {height}
							</Grid>
							<Grid item xs={5}>
								Hypoallergenic: {hypoallergenic}
							</Grid>
						</Grid>
						<Grid style={{ marginLeft: '-32px' }}>
							<PetPreviewButton
								props={(petState, setPetState, userInfoState)}
								petState={petState}
								setPetState={setPetState}
								userInfoState={userInfoState}
							/>
						</Grid>
					</CardContent>
				</Card>
			)}
		</Container>
	);
}
