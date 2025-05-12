# GeekUp Album Manager

A simple React application for managing albums and users, built with React, TypeScript, and Tailwind CSS.

![GeekUp Album Manager](https://geekup.vn/Icons/geekup-logo-general.svg)

## Features

- View and browse albums with pagination
- View user details and their associated albums

## Technologies Used

- **React**: A JavaScript library for building user interfaces
- **React Router**: For handling navigation and routing in the application
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development
- **Material UI Icons**: For consistent and beautiful icons throughout the application

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/GeekUp-Frontend-Technicial-Assessment.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Page components
│   ├── albums/        # Album-related pages
│   └── users/         # User-related pages
├── services/          # API services
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## API

The application uses the JSONPlaceholder API for demonstration purposes:

- Albums: https://jsonplaceholder.typicode.com/albums
- Users: https://jsonplaceholder.typicode.com/users
- Photos: https://jsonplaceholder.typicode.com/photos

This project is licensed under the MIT License - see the LICENSE file for details.
