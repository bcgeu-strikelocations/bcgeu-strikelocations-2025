# BCGEU Strike Locations Map

An interactive map application showing BCGEU strike locations across British Columbia. The application displays over 1,000 strike locations with real-time user location detection, postal code search, and 30km radius visualization to help users find nearby picket lines and strike activities.

## Features

- 🗺️ **Interactive Map**: Displays strike locations with different markers for picketed vs non-picketed locations
- 📍 **User Location**: GPS-based location detection with accuracy circle
- 🔍 **Postal Code Search**: Canadian postal code search to find locations near any address
- 📊 **30km Radius Visualization**: Shows coverage areas around picketed locations
- 📱 **Mobile Friendly**: Works seamlessly on desktop and mobile devices
- 🎨 **BCGEU Branding**: Official BCGEU colors and styling
- 🎯 **Nearest Strike Detection**: Automatically finds and shows the closest strike location
- 📋 **Location Details**: View hours, addresses, and picket line status for each location

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

The development server automatically generates GeoJSON data files on startup.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting
- `npm run generate-data` - Generate map data files

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── geocode/       # Postal code geocoding endpoint
│   │   ├── globals.css        # Global styles and BCGEU theme
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Home page with server-side data fetching
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components (Button, Input, etc.)
│   │   ├── map/              # Map-related components
│   │   │   ├── Map.tsx       # Main map component
│   │   │   ├── MarkerClusterGroup.tsx
│   │   │   ├── PopupContent.tsx
│   │   │   └── MapZoomHandler.tsx
│   │   ├── InfoPanel.tsx     # Collapsible info panel with legend
│   │   ├── MapClient.tsx     # Client-side map wrapper
│   │   ├── UserLocationButton.tsx
│   │   └── PostalCodeSearch.tsx
│   ├── data/                 # Static data files
│   │   └── locations.json    # Source strike location data
│   ├── lib/                  # Utility functions
│   │   ├── server-data.ts    # Server-side data fetching
│   │   ├── utils.ts          # General utilities
│   │   └── icon-config.ts    # Map icon configuration
│   └── types/                # TypeScript type definitions
│       └── index.ts          # All type definitions
├── public/                   # Static assets
│   └── data/                # Generated GeoJSON files
│       ├── strike_locations_generated.geojson
│       └── strike_locations_30k_generated.geojson
├── scripts/                 # Data generation scripts
│   └── generate-data.ts     # Converts JSON to GeoJSON with buffers
└── vercel.json             # Vercel deployment configuration
```

## How It Works

### Map Features
- **Location Markers**: Different icons for picketed (gold flag) vs non-picketed (orange flag) locations
- **30km Buffer Zones**: Red circles showing coverage areas around picketed locations
- **User Location**: Blue marker with accuracy circle for GPS location
- **Postal Code Search**: Yellow marker for searched postal codes
- **Interactive Popups**: Click any location to see detailed information including hours and address
- **Nearest Strike Detection**: Automatically finds and highlights the closest strike location to you

### User Interface
- **Info Panel**: Collapsible panel with map legend and search controls
- **Location Statistics**: Shows total number of strike locations displayed
- **Distance Display**: Shows how far you are from the nearest strike location
- **Mobile Friendly**: Touch-friendly interface that works great on phones and tablets
- **Easy Navigation**: Simple controls for finding your location or searching by postal code

## Using the Map

### Finding Your Location
1. Click the "Find My Location" button to use GPS
2. The map will center on your location and show a blue marker
3. The nearest strike location will be automatically highlighted

### Searching by Postal Code
1. Enter a Canadian postal code (e.g., "V6B 1A1") in the search box
2. The map will center on that location and show a yellow marker
3. You'll see the nearest strike location and distance

### Understanding the Map
- **Gold flags**: Locations with active picket lines
- **Orange flags**: Strike locations without picket lines
- **Red circles**: 30km coverage areas around picketed locations
- **Blue marker**: Your current location
- **Yellow marker**: Searched postal code location

### Getting Location Details
- Click on any location marker to see:
  - Full address
  - Business hours
  - Picket line status
  - Location type (liquor store, office, etc.)

## Data Sources

- **Strike Locations**: BCGEU-provided location data
- **Map Tiles**: OpenStreetMap
- **Geocoding**: geocoder.ca API for Canadian postal codes
- **Last Updated**: October 9th, 2025

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run linting: `npm run lint`
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **BCGEU** for providing comprehensive strike location data
- **OpenStreetMap** contributors for map tiles
- **geocoder.ca** for Canadian postal code geocoding services
- **Vercel** for hosting and deployment platform
- The open source community for the amazing tools and libraries