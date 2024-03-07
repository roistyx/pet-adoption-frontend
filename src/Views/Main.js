import React, { useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from '../Components/SearchBar';
import PetGallery from '../Components/PetGallery';
import { CatalogContext } from '../Contexts/CatalogContext';
import Pet from '../helpers/CatalogApi';

const theme = createTheme();

export default function Album() {
	const { catalogState, catalogDispatch } = useContext(CatalogContext);

	useEffect(() => {
		async function userPetList() {
			const term = '';
			try {
				const response = await Pet.getPetCatalog(term);
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
	}, []);

	if (!catalogState.petList) return;
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 8,
						pb: 6,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Lovey Pets
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="text.secondary"
							paragraph
						>
							This website is a platform for pet adoption and offering. It
							connects pet lovers with animals in need of a loving home. Users
							can browse through a wide variety of pets, including dogs, cats,
							birds, and small animals, and filter their search by breed, age,
							and location.
						</Typography>
						<Stack
							sx={{ p: 'auto' }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<SearchBar />
						</Stack>
					</Container>
				</Box>

				<PetGallery props={catalogState.petList} />
			</main>
			<Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
				<Typography variant="h6" align="center" gutterBottom>
					Lovey Pets
				</Typography>
				<Divider />
				<Typography
					variant="subtitle1"
					align="center"
					color="text.secondary"
					component="p"
				>
					A Non-Profit Pet Adoption Platform
				</Typography>
				<Typography
					variant="subtitle2"
					align="center"
					color="text.secondary"
					component="p"
				>
					<div>5840 W. 3rd St. Los Papos, CA 90026</div>
					<div>lovey@example.com, +1 252-789-5142</div>
				</Typography>
			</Box>
		</ThemeProvider>
	);
}
