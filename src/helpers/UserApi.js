import axios from 'axios';
export default class User {
	static async post(url, data) {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const json = await response.json();
		return json;
	}

	static async getUserProfile() {
		const url = `http://localhost:3100/user/profile`;

		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async getSavedPets() {
		const url = `http://localhost:3100/user/saved-list`;

		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async userStatus() {
		const token = localStorage.getItem('token');

		console.log('token', token);

		try {
			const response = await axios.get(`http://localhost:3100/Dashboard`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			console.log('response', response);
			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async Signup({
		username,
		password,
		firstName,
		lastName,
		phoneNumber,
	}) {
		const response = await this.post('http://localhost:3100/user/signup', {
			username,
			password,
			firstName,
			lastName,
			phoneNumber,
		});

		return response;
	}

	static async EditProfile({
		username,
		password,
		firstName,
		lastName,
		phoneNumber,
		bio,
	}) {
		try {
			const response = await axios.post(
				`http://localhost:3100/user/edit`,
				{
					username,
					password,
					firstName,
					lastName,
					phoneNumber,
					bio,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async Login({ username, password }) {
		return this.post('http://localhost:3100/user/login', {
			username,
			password,
		});
	}

	static async savePet(_id) {
		console.log('_id', _id);
		try {
			const response = await axios.get(
				`http://localhost:3100/pet/${_id}/save`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async unSavePet(_id) {
		try {
			const response = await axios.get(
				`http://localhost:3100/pet/${_id}/unsave`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			return response;
		} catch (error) {
			console.log('error', error);
		}
	}
}
