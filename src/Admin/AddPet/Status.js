import React, { useContext } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { AddPetContext } from './Context';

export default function Status() {
	const { dispatch } = useContext(AddPetContext);
	return (
		<FormControl fullWidth>
			<FormLabel id="demo-controlled-radio-buttons-group">
				Are you interested in offering your pet to foster or adoption?
			</FormLabel>
			<RadioGroup
				column
				aria-labelledby="demo-row-radio-buttons-group-label"
				name="row-radio-buttons-group"
				// value={sex}
				defaultValue={'female'}
				onChange={(e) =>
					dispatch({
						type: 'adoptionStatus',
						field: 'adoptionStatus',
						value: e.currentTarget.value,
					})
				}
			>
				<FormControlLabel value="foster" control={<Radio />} label="Foster" />
				<FormControlLabel
					value="Adoption"
					control={<Radio />}
					label="Adoption"
				/>
				<FormControlLabel
					value="other"
					control={<Radio />}
					label="I'm not sure"
				/>
			</RadioGroup>
		</FormControl>
	);
}
