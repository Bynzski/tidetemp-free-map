# TideTemp Free Map

A small map-driven web app that looks up weather, marine, air quality, NOAA tide predictions, and NOAA station observations for a typed place, coordinates, browser location, or map click.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Deploy on Vercel Free

This project is Vercel-ready.

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project** and import that repository.
3. Keep the detected Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy on the free Hobby plan.

No paid API keys or server environment variables are required.

## Free public APIs used

- Open-Meteo geocoding, weather, marine, and air quality APIs
- Open-Meteo historical weather archive for recent comparison charts
- Open-Meteo flood API for river-discharge forecasts
- National Weather Service API for official U.S. alerts and hourly forecast periods
- USGS live water services for nearby streamflow, gage height, water temperature, pH, dissolved oxygen, conductance, and turbidity where available
- NOAA National Data Buoy Center latest observations through a small Vercel proxy endpoint
- OpenStreetMap Nominatim geocoding fallback for city/state searches
- NOAA CO-OPS metadata and data APIs
- OpenStreetMap map tiles through Leaflet
- Chart.js for client-side visualizations

NOAA tide and station observations are strongest around U.S. coastal, Great Lakes, and U.S. territory stations. Global locations still use Open-Meteo weather, marine, and air quality data.

## Refresh model

The app does not continuously poll. It fetches the freshest available public data when the page loads, a search runs, the map is clicked, or browser location is used. Provider-side cache headers and public-service limits should be respected; the Vercel NDBC proxy caches buoy observations for 10 minutes.
