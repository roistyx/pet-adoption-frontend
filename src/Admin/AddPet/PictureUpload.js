import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AddPetContext } from './Context';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

export default function UploadButtons() {
	const { state, dispatch } = useContext(AddPetContext);
	const { profilePic } = state;

	const handleFileChange = async (e) => {
		const selectedFile = e.target.files[0];

		const formData = new FormData();
		formData.append('file', selectedFile);

		try {
			const response = await axios.post(
				'http://localhost:3100/upload/',
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			console.log(response.data);
			dispatch({
				type: 'profilePic',
				field: 'profilePic',
				value: response.data.file,
			});
		} catch (error) {
			console.error(error);
			dispatch({
				type: 'error',
				field: 'error',
				value: error,
			});
		}
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item xs={12}>
					<Item>
						{profilePic ? (
							<img
								alt="Profile Profile"
								src={profilePic}
								style={{ width: '200px' }}
							/>
						) : (
							<img
								style={{ width: '200px' }}
								alt="Profile Profile"
								src="http://localhost:3100/uploads/default.png"
							/>
						)}
					</Item>
				</Grid>
				<Grid item xs={12}>
					<Item>
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
						>
							<input
								onChange={handleFileChange}
								hidden
								accept="image/*"
								multiple
								type="file"
							/>
							<PhotoCamera />
						</IconButton>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
}
