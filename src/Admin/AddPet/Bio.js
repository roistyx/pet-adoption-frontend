import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { AddPetContext } from './Context';

export default function Bio() {
	const { state, dispatch } = useContext(AddPetContext);

	const { name, bio } = state;
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="name"
						name="name"
						label="Name"
						fullWidth
						value={name}
						onChange={(e) =>
							dispatch({
								type: 'name',
								field: 'name',
								value: e.currentTarget.value,
							})
						}
					/>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Box
						component="form"
						sx={{
							'& .MuiTextField-root': { width: '100%' },
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							id="outlined-textarea"
							label="Here you can write a short bio about the pet."
							multiline
							fullWidth
							minRows={4}
							rows={4}
							maxRows={6}
							value={bio}
							onChange={(e) =>
								dispatch({
									type: 'bio',
									field: 'bio',
									value: e.currentTarget.value,
								})
							}
						/>
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
