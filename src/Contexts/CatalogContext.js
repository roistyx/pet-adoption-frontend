import React, { useReducer } from 'react';

export const CatalogContext = React.createContext();

const userReducer = (state, action) => {
	switch (action.type) {
		case 'petList':
			return {
				...state,
				petList: action.payload,
			};

		case 'myPetList':
			return {
				...state,
				myPetList: action.payload,
			};

		case 'petPreview':
			return {
				...state,
				petPreview: action.payload,
			};

		case 'message':
			return {
				...state,
				message: action.payload.message,
				success: action.payload.success,
			};

		case 'userSavedPets': {
			return {
				...state,
				userSavedPets: action.payload,
			};
		}

		case 'myPetsList': {
			return {
				...state,
				myPetsList: action.payload,
			};
		}

		default: {
			return state;
		}
	}
};

export const CatalogContextProvider = ({ children }) => {
	const [catalogState, catalogDispatch] = useReducer(userReducer, {
		petList: [],
		petPreview: [],
		message: '',
		success: false,
	});

	return (
		<CatalogContext.Provider value={{ catalogState, catalogDispatch }}>
			{children}
		</CatalogContext.Provider>
	);
};
