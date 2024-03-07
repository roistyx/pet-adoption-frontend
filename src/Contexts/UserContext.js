import React, { useReducer, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';

export const UserContext = React.createContext();

const userReducer = (state, action) => {
	switch (action.type) {
		case 'userProfile':
			return {
				...state,

				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				phoneNumber: action.payload.phoneNumber,
				username: action.payload.username,
				role: action.payload.role,
				pets: action.payload.pets,
				_id: action.payload._id,
				currentOwner: action.payload.currentOwner,
				console: console.log('userProfile', action.payload),
			};

		case 'userSavedPet':
			return {
				...state,
				pets: action.payload.pets,
			};

		default: {
			return state;
		}
	}
};

export const UserContextProvider = ({ children }) => {
	const { state } = useContext(AuthContext);
	const [userInfoState, userInfoDispatch] = useReducer(userReducer, state);

	return (
		<UserContext.Provider value={{ userInfoState, userInfoDispatch }}>
			{children}
		</UserContext.Provider>
	);
};
