# Pet Adoption Platform - Frontend Repository

This repository contains the frontend code for a project on a Pet Adoption Platform. It showcases a React and Material-UI based application, emphasizing frontend technologies and their integration with a Node.js backend.

## Backend Integration

Frontend integrates with backend services for a comprehensive application. [Backend code is available here](https://github.com/roistyx/pet-adoption-backend.git).

## Key Features

- **User Authentication**: Secure sign up and login functionality, allowing users to access personalized features and manage pet listings.
- **Pet Catalog**: A user-friendly interface for browsing available pets, including detailed pet profiles.
- **Admin Panel**: Tools for administrators to add new pets, edit pet details, upload images, and manage pet adoption statuses.

## Technology Stack

- **React**: Used for building the user interface, leveraging components for modular development and a seamless user experience.
- **Axios**: Facilitates HTTP requests to backend APIs, enabling efficient data retrieval and manipulation.
- **React Router**: Assumed for navigation between different parts of the application, providing a standardized approach to routing.
- **Material-UI**: Utilized for designing components and layouts, offering a consistent and attractive user interface across the application.

## State Management

The application employs React's Context API and the `useReducer` hook for state management, distributed across different contexts:

- **AuthContext**: Manages authentication-related data, including user login, signup, and session management.
- **UserContext**: Handles user-specific data, such as profile information and pet listings associated with the user.
- **CatalogContext**: Focuses on the pet catalog, including pet listings, pet previews, and admin-related pet management tasks.

This approach ensures a modular and scalable state management solution, facilitating easy data access and manipulation throughout the application.

## Getting Started

To get the application running locally:

1. Ensure you have Node.js installed on your machine.
2. Clone this repository.
3. Navigate to the project directory and run `npm install` to install dependencies.
4. Execute `npm start` to run the application in development mode.
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contributing

[roistyx](https://github.com/roistyx)
