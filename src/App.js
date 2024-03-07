import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveAppBar from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './Contexts/AuthContext';
import { UserContextProvider } from './Contexts/UserContext';
import { CatalogContextProvider } from './Contexts/CatalogContext';
import Main from './Views/Main';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './Views/Profile';
import MyPets from './Views/MyPets';
import PetPreview from './Views/PetPreview';
import ModalAddPet from './Admin/AddPet/ModalAddPet';

function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<UserContextProvider>
					<CatalogContextProvider>
						<div className="App">
							<ResponsiveAppBar />
							<Routes>
								<Route path="/" element={<Main />} />
								<Route path="/AddPet" element={<ModalAddPet />} />
								<Route path="/profile" element={<Profile />} />
								<Route path="/myPets" element={<MyPets />} />
								<Route path="/catalog/pet/:id" element={<PetPreview />} />
							</Routes>
						</div>
					</CatalogContextProvider>
				</UserContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;
