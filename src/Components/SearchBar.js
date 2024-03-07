import React, { useState, useContext } from 'react';
import { CatalogContext } from '../Contexts/CatalogContext';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Pet from '../helpers/CatalogApi';

function SearchBarTest() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('all');
	const { catalogDispatch } = useContext(CatalogContext);

	const handleSearchTermChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleFilterChange = (event) => {
		setSelectedFilter(event.target.value);
	};

	const handleSearch = async () => {
		let searchObject;

		function dispatchHelper(response) {
			catalogDispatch({
				type: 'petList',
				payload: response.data['petList'],
			});

			catalogDispatch({
				type: 'message',
				payload: response.data,
			});
		}

		try {
			if (selectedFilter === 'all') {
				searchObject = searchTerm;
				dispatchHelper(await Pet.getPetCatalog(searchObject));
			} else {
				searchObject = `${selectedFilter}=${searchTerm}`;
				dispatchHelper(await Pet.getFreeTextSearchCatalog(searchObject));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container style={{ paddingRight: 0 }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginBottom: 16,
					padding: 0,
				}}
			>
				<TextField
					type="text"
					placeholder="Search"
					style={{ flex: 1, marginRight: 10 }}
					value={searchTerm}
					onChange={handleSearchTermChange}
				/>
				<Select
					value={selectedFilter}
					onChange={handleFilterChange}
					style={{ minWidth: 80 }}
				>
					<MenuItem value={'all'}>All</MenuItem>
					<MenuItem value={'specie'}>Specie</MenuItem>
					<MenuItem value={'breed'}>Breed</MenuItem>
					<MenuItem value={'sex'}>Sex</MenuItem>
					<MenuItem value={'hypoallergenic'}>Hypoallergenic</MenuItem>
					<MenuItem value={'name'}>Name</MenuItem>
				</Select>
				<Button
					sx={{
						ml: 1,
					}}
					onClick={handleSearch}
				>
					Search
				</Button>
			</div>
		</Container>
	);
}

export default SearchBarTest;
