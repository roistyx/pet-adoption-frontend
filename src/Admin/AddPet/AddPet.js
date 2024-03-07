import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PetProfile from './PetProfile';
import Bio from './Bio';
import PictureUpload from './PictureUpload';
import Review from './Review';
import { AddPetContext } from './Context';
import Pet from '../../helpers/CatalogApi';
import Alert from '@mui/material/Alert';

const steps = ['Profile', 'Bio', 'Pictures', 'Review'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <PetProfile />;
		case 1:
			return <Bio />;
		case 2:
			return <PictureUpload />;
		case 3:
			return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

export default function AddPet({ props }) {
	let { pet } = props;
	const [activeStep, setActiveStep] = React.useState(0);
	const [success, setSuccess] = useState([]);
	const { state, dispatch } = useContext(AddPetContext);

	useEffect(() => {
		if (!pet) return;
		async function editDataLoader() {
			try {
				const response = await Pet.getPetProfile(pet._id);
				dispatch({
					type: 'edit',
					payload: {
						...response.data.pet,
					},
				});
			} catch (error) {
				console.log('error', error);
			}
		}
		editDataLoader();
	}, [props]);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleSubmit = async () => {
		try {
			if (!state._id) {
				state.status = 'Available';
				const response = await Pet.AddPet(state);

				setSuccess(response.data.message);
			}
			if (state._id) {
				const response = await Pet.EditPet(state);
				setSuccess(response.data.message);
			}
			dispatch({
				type: 'reset',
			});

			return;
		} catch (error) {
			console.log('error', error);
			setSuccess(['Sorry', "Your pet didn't save"]);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography component="h1" variant="h4" align="center">
						Pet profile
					</Typography>
					{state.error ? <Alert severity="error">{state.error}</Alert> : null}
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography variant="h5" gutterBottom>
								{success[0]}
							</Typography>
							<Typography variant="subtitle1">{success[1]}</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(activeStep)}
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
										Back
									</Button>
								)}

								<Button
									variant="contained"
									onClick={handleNext}
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? (
										<span onClick={handleSubmit}>Send</span>
									) : (
										'Next'
									)}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
