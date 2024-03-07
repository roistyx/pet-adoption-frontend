import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { AddPetContext } from './Context';

export default function PetProfile() {
	const { state, dispatch } = useContext(AddPetContext);
	const { specie, breed, sex, age, weight, height, color, hypoallergenic } =
		state;

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						id="outlined-basic"
						label="Specie"
						variant="outlined"
						value={specie}
						onChange={(e) =>
							dispatch({
								type: 'specie',
								field: 'specie',
								value: e.target.value,
							})
						}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<TextField
							id="outlined-basic"
							label="Breed"
							variant="outlined"
							value={breed}
							onChange={(e) =>
								dispatch({
									type: 'breed',
									field: 'breed',
									value: e.target.value,
								})
							}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={12}>
					<FormControl fullWidth>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={sex}
							onChange={(e) =>
								dispatch({
									type: 'sex',
									field: 'sex',
									value: e.currentTarget.value,
								})
							}
						>
							<FormControlLabel
								value="female"
								control={<Radio />}
								label="Female"
							/>
							<FormControlLabel value="male" control={<Radio />} label="Male" />
							<FormControlLabel
								value="other"
								control={<Radio />}
								label="I'm not sure"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Age</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={age}
							label="age"
							onChange={(e) =>
								dispatch({
									type: 'age',
									field: 'age',
									value: e.target.value,
								})
							}
						>
							<MenuItem value={'newborn'}>Newborn</MenuItem>
							<MenuItem value={'young'}>Young</MenuItem>
							<MenuItem value={'adult'}>Adult</MenuItem>
							<MenuItem value={'senior'}>Senior</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Weight</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={weight}
							label="Weight"
							onChange={(e) =>
								dispatch({
									type: 'weight',
									field: 'weight',
									value: e.target.value,
								})
							}
						>
							<MenuItem value={'underweight'}>Underweight</MenuItem>
							<MenuItem value={'normal'}>Normal</MenuItem>
							<MenuItem value={'overweight'}>Overweight</MenuItem>
							<MenuItem value={'obese'}>Obese</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Height</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={height}
							label="Height"
							onChange={(e) =>
								dispatch({
									type: 'height',
									field: 'height',
									value: e.target.value,
								})
							}
						>
							<MenuItem value={'short'}>Short</MenuItem>
							<MenuItem value={'medium'}>Medium</MenuItem>
							<MenuItem value={'long'}>Long</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<TextField
							id="outlined-basic"
							variant="outlined"
							value={color}
							label="Color"
							onChange={(e) =>
								dispatch({
									type: 'color',
									field: 'color',
									value: e.target.value,
								})
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={12}>
					<FormControl>
						<FormLabel id="demo-row-radio-buttons-group-label">
							Hypoallergenic
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="demo-row-radio-buttons-group-label"
							name="row-radio-buttons-group"
							value={hypoallergenic}
							defaultValue={hypoallergenic}
							onChange={(e) =>
								dispatch({
									type: 'hypoallergenic',
									field: 'hypoallergenic',
									value: e.currentTarget.value,
								})
							}
						>
							<FormControlLabel value="yes" control={<Radio />} label="Yes" />
							<FormControlLabel value="no" control={<Radio />} label="No" />
							<FormControlLabel
								value="notsure"
								control={<Radio />}
								label="Not sure"
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
