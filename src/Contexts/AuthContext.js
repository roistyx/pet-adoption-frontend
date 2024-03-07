import React, { useReducer, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = React.createContext();

function loginReducer(state, action) {
	switch (action.type) {
		case 'toggleSignupAndSignin':
			return {
				...state,
				isToggled: !state.isToggled,
			};
		case 'field': {
			return {
				...state,
				[action.field]: action.value,
			};
		}

		case 'set_message':
			return {
				...state,
				error_message: action.payload,
			};

		case 'login': {
			return {
				...state,
				isLoading: true,
				error: '',
			};
		}

		case 'signup': {
			return {
				...state,
				signUpCompleted: true,
				error: '',
				isToggled: true,
			};
		}

		case 'success': {
			return {
				...state,
				isLoggedIn: true,
				isLoading: false,
			};
		}
		case 'userProfile': {
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
			};
		}
		case 'error': {
			return {
				...state,
				error: 'Failed to log in',
				isLoading: false,
				username: '',
				password: '',
			};
		}

		case 'logout': {
			return {
				...state,
				isLoggedIn: false,
				isLoading: false,
				username: '',
				console: console.log('Logged out!'),
				logout: localStorage.removeItem('token'),
			};
		}

		default:
			break;
	}
	return state;
}

const initialState = {
	isLoggedIn: false,
	username: '',
	password: '',
	firstName: '',
	lastName: '',
	isLoading: false,
	error: '',

	showSigninForm: true,
	isToggled: true,
	passwordVerification: false,
	signUpCompleted: false,
	userProfile: '',
	error_message: '',
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		function isUserSavedToken() {
			const token = localStorage.getItem('token');
			if (!token) return navigate('/');
			axios
				.get('http://localhost:3100/auth', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					dispatch({ type: 'success' });
					dispatch({ type: 'userProfile', payload: response.data.userObj });

					return true;
				})
				.catch((error) => {
					console.log('error', error);
					return false;
				});
		}
		isUserSavedToken();
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
