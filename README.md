# The game of cities

This web application is a game of cities for time. The goal of the game is to name as many real cities as possible. The application includes a game with “AI” validation of cities, animation of progress bar and display of game results.

## Features

- Validation on existing cities.
- Game rule support: cities cannot be repeated.
- Game rule support: no city names with “ъ”, "ы" and “ь” signs.
- Game rule support: each player is given 2 minutes to think.
- <b>BONUS:</b> Display error messages for inappropriate cities.

## Technologies Used

- React (React Router)
- TypeScript
- Tailwind CSS

<img src="https://skillicons.dev/icons?i=react,ts,tailwind" />

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/eugenepokalyuk/react-personik.git
   cd react-personik
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open the application**:

   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```
src/
├── assets/
│   └── icons
├── components/
│   ├── App ── App.tsx
│   ├── GameFrame ── GameFrame.tsx
│   └── LoadingDots ── LoadingDots.tsx, LoadingDots.css
├── pages/
│   ├── GamePage ── GamePage.tsx
│   ├── ResultPage ── ResultPage.tsx
│   └── WelcomePage ── WelcomePage.tsx
├── utils/
│   ├── getLastChar.tsx
│   ├── getNextCity.tsx
│   ├── validateExistingCity.tsx
│   └── validateCityName.tsx
├── data/
│   └── cities.ts
├── index.css
└── index.tsx
```

### Explanation of Key Files

- **`src/components`**: Contains common components used in the application.
- **`src/pages`**: Contains page components.
- **`src/utils`**: Contains utilities and validation functions.
- **`src/data`**: Contains data such as a list of cities.

## Deployment

To build the application for production, run:

```bash
npm run build
```

The built files will be in the `build` directory, which can be deployed to any static hosting service.
