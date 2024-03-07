import axios from 'axios';

export default class Pet {
	constructor() {
		this.token = localStorage.getItem('token');
	}
	static async EditPet(petObj) {
		const token = localStorage.getItem('token');
		const url = `http://localhost:3100/catalog/update-pet/${petObj._id}`;
		try {
			return axios.post(url, petObj, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}
	static async getPetProfile(petId) {
		const url = `http://localhost:3100/catalog/pet/${petId}`;

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
		try {
			console.log('token', this.token);
			const response = await axios.get(
				`http://localhost:3100/user/saved-list`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			console.log('getSavedPets', response);
			return response;
		} catch (error) {
			console.log('error', error);
		}
	}

	static async getUserPets() {
		const url = 'http://localhost:3100/user/owner-pets/';

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

	static async AddPet(petObj, username) {
		const token = localStorage.getItem('token');
		console.log('petObj petObj petObj petObj', petObj);
		const url = 'http://localhost:3100/catalog/add-pet';

		try {
			return axios.post(url, petObj, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}

	static async deletePetProfile(petId) {
		console.log('petId', petId);
		const url = `http://localhost:3100/catalog/delete-pet/${petId}`;
		try {
			const result = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			return result.response.data;
		} catch (error) {
			return error.response.data;
		}
	}

	static async getPetCatalog(term) {
		try {
			console.log('All', term);
			const response = await axios.get(
				`http://localhost:3100/search/${term}`,
				{}
			);
			console.log('response and more', response.data.status);
			return response;
		} catch (error) {
			console.log('error', error);
			return;
		}
	}

	static async getFreeTextSearchCatalog(term) {
		console.log('term', term);

		try {
			const response = await axios.get(
				`http://localhost:3100/search?${term}`,
				{}
			);
			return response;
		} catch (error) {
			console.log('error', error);
		}
	}
}
