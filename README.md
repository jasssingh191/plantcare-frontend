🌿 PlantCare Frontend
A modern, responsive, and intuitive web application designed for plant enthusiasts to discover plant species, explore detailed care guides, and curate their own personalized digital plant shelf.

🔗 Live Demo: https://plantcare-frontend-omega.vercel.app

✨ Features
🔍 Live Database Search: Search for indoor and outdoor plants dynamically using the external plant database API.

🌱 Minimalist Card Grid: Clean, scannable plant cards displaying species common names, scientific names, and high-quality photography with fallback mint styling.

📖 Comprehensive Care Guides: Detailed species view highlighting watering schedules, sunlight requirements, soil preferences, ideal temperature ranges, and plant toxicity notes.

🪴 Auth-Gated Digital Shelf: Save favorite plants to a personal digital shelf (requires user login).

👤 User Profile & Shelf Management: View saved collections, edit profile info, or remove plants from your shelf in an interactive edit view.

🎨 Modern Responsive UI: Built with custom CSS following modern design tokens (floating stadium navbar, pill buttons, soft shadows, and a gentle #F8F9FA eye-friendly canvas).

🛠️ Tech Stack & Dependencies
Frontend Framework: React 18+ (Vite)

Routing: React Router Dom (v6)

State Management: React Context API (AuthContext)

API Integration: Perenual API / Plant Database Services

Styling: Modular CSS3 with custom variables & flexbox/grid layout design

🚀 Getting Started
Follow these instructions to get a local copy up and running for development and testing.

Prerequisites
Node.js (v18.0.0 or higher recommended)

npm or yarn

An active API key from Perenual Plant API (or your chosen plant database provider).

Installation
Clone the repository:

Bash
git clone https://github.com/jasssingh191/plantcare-frontend.git
cd plantcare-frontend
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory of the project:

Code snippet
VITE_PERENUAL_API_KEY=your_actual_api_key_here
Start the local development server:

Bash
npm run dev
Open http://localhost:5173 in your browser to view the app!

📁 Project Structure
Plaintext
plantcare-frontend/
├── public/
├── src/
│ ├── assets/ # SVGs, icons, and static images
│ ├── components/ # Reusable UI components
│ │ ├── Navbar/ # Floating stadium navigation bar
│ │ ├── SearchForm/ # Hero search input
│ │ ├── PlantCard/ # Minimal plant card component
│ │ ├── AuthModal/ # Log in and Sign up modals
│ │ └── ProtectedRoute/ # Auth protection wrapper
│ ├── context/ # Global Auth Context & State
│ ├── pages/ # Route components
│ │ ├── HomePage/ # Search & regional directory view
│ │ ├── PlantDetailPage/# Article & care guide view
│ │ └── ProfilePage/ # Digital shelf & profile management
│ ├── utils/ # API utilities and data normalizers
│ │ └── plantApi.js # Fetching & normalization logic
│ ├── App.jsx # Main router & layout configuration
│ └── main.jsx # Entry point
├── .env.example
├── package.json
└── README.md
