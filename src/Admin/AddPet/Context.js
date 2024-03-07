import React, { useReducer } from 'react'; // ,{ createContext, useReducer }
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const AddPetContext = React.createContext();

const initialState = {
	_id: '',
	specie: '',
	breed: '',
	sex: '',
	age: '',
	weight: '',
	height: '',
	color: '',
	hypoallergenic: '',
	name: '',
	bio: '',
	profilePic: 'http://localhost:3100/uploads/default.png',
	status: 'Available',
};

export function AddPetReducer(state, action) {
	switch (action.type) {
		case 'name': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'status': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'specie': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'breed': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'sex': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'age': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'weight': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'height': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'color': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'hypoallergenic': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'bio': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'profilePic': {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		case 'reset':
			return {
				initialState,
			};

		case 'error': {
			return {
				...state,
				[action.value]: action.value,
			};
		}
		case 'edit': {
			return {
				...state,
				_id: action.payload._id,
				specie: action.payload.specie,
				breed: action.payload.breed,
				sex: action.payload.sex,
				age: action.payload.age,
				weight: action.payload.weight,
				height: action.payload.height,
				color: action.payload.color,
				hypoallergenic: action.payload.hypoallergenic,
				name: action.payload.name,
				bio: action.payload.bio,
				profilePic: action.payload.profilePic,
				status: action.payload.status,
			};
		}
		default:
			break;
	}
	return state;
}

export const AddPetContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AddPetReducer, initialState);

	return (
		<AddPetContext.Provider value={{ state, dispatch }}>
			{children}
		</AddPetContext.Provider>
	);
};
