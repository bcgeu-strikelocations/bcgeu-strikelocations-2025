# BCGEU Strike Locations Map

An interactive map application showing BCGEU strike locations across British Columbia, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🗺️ Interactive map with strike locations
- 📍 User location detection
- 🔍 Postal code search functionality
- 📱 Responsive design with modern UI
- 🎨 BCGEU brand colors and styling
- ⚡ Fast performance with Next.js

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom BCGEU theme
- **UI Components**: Radix UI primitives
- **Maps**: React Leaflet with OpenStreetMap
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bcgeu-strikelocations-2025
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes data generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-data` - Generate GeoJSON data files

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Map.tsx        # Map component
│   │   └── InfoPanel.tsx  # Info panel component
│   ├── data/              # Static data files
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
│   └── data/             # Generated GeoJSON files
└── scripts/              # Data generation scripts
```

## Features Overview

### Map Functionality
- Displays strike locations with different markers for picketed vs non-picketed locations
- Shows 30km radius circles around locations
- Interactive popups with location details
- User location detection with accuracy circle
- Postal code search with geocoding

### UI Components
- Modern, accessible design using Radix UI
- BCGEU brand colors (blue #0065a4, gold #b8a967)
- Responsive layout that works on all devices
- Loading states and error handling

### Data Management
- TypeScript interfaces for type safety
- API routes for data fetching
- Geocoding service integration
- Location data from JSON files

## Deployment

This application is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Deploy automatically on every push

The application includes:
- Vercel configuration (`vercel.json`)
- Environment variable support
- Optimized build settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- BCGEU for providing the strike location data
- OpenStreetMap for map tiles
- Geocoder.ca for postal code geocoding
- The open source community for the amazing tools and libraries