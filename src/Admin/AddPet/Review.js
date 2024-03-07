import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AddPetContext } from './Context';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function Review() {
	const { state } = useContext(AddPetContext);
	const {
		_id,
		specie,
		breed,
		sex,
		age,
		weight,
		height,
		color,
		hypoallergenic,
		name,
		bio,
		profilePic,
		status,
	} = state;

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				I'm {name}
			</Typography>
			<Box sx={{ width: '100%' }}></Box>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={12}>
					<Item>
						<img style={{ width: '200px' }} alt="Review" src={profilePic} />
					</Item>
				</Grid>
				<Grid item xs={4}>
					Specie: {specie}
				</Grid>
				<Grid item xs={4}>
					Breed: {breed}
				</Grid>
				<Grid item xs={4}>
					Age: {age}
				</Grid>
				<Grid item xs={4}>
					Weight: {weight}
				</Grid>
				<Grid item xs={4}>
					Color: {color}
				</Grid>
				<Grid item xs={4}>
					Sex: {sex}
				</Grid>
				<Grid item xs={4}>
					Height: {height}
				</Grid>
				<Grid item xs={4}>
					Adoption status: {status}
				</Grid>
				<Grid item xs={4}>
					Height: {height}
				</Grid>
				<Grid item xs={4}>
					Hypoallergenic: {hypoallergenic}
				</Grid>
				<Grid item xs={12}>
					Bio: {bio}
				</Grid>
			</Grid>
			<Box />
		</React.Fragment>
	);
}
