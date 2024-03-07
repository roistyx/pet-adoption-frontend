import React, { useEffect, useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import User from '../helpers/UserApi';
import { AuthContext } from '../Contexts/AuthContext';
import { CatalogContext } from '../Contexts/CatalogContext';
import { v4 } from 'uuid';
import CardActionsComponent from './CardActions';

export default function Album({ props }) {
	const { state } = useContext(AuthContext);
	const { catalogDispatch } = useContext(CatalogContext);

	useEffect(() => {
		catalogDispatch({
			type: 'userSavedPets',
			payload: state.pets,
		});
	}, []);

	return (
		<Container sx={{ py: 8 }} maxWidth="md">
			<Grid container spacing={4}>
				{props.map((card) => (
					<Grid item key={v4()} xs={12} sm={6} md={4}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardMedia
								component="img"
								sx={{
									// 16:9
									pt: '10%',
									height: '200px',
								}}
								image={card.profilePic}
								alt="Pet Profile"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant="h5" component="h2">
									{card.name}
								</Typography>
								<Typography>{card.bio}</Typography>
							</CardContent>
							<CardActionsComponent card={card} />
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
