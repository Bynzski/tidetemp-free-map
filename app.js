const API = {
  geocode: "https://geocoding-api.open-meteo.com/v1/search",
  osmGeocode: "https://nominatim.openstreetmap.org/search",
  weather: "https://api.open-meteo.com/v1/forecast",
  history: "https://archive-api.open-meteo.com/v1/archive",
  flood: "https://flood-api.open-meteo.com/v1/flood",
  marine: "https://marine-api.open-meteo.com/v1/marine",
  air: "https://air-quality-api.open-meteo.com/v1/air-quality",
  nws: "https://api.weather.gov",
  usgsIv: "https://waterservices.usgs.gov/nwis/iv/",
  ndbcLatest: "/api/ndbc-latest",
  noaaMeta: "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json",
  noaaData: "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter",
};

const US_STATES = {
  al: "Alabama",
  alaska: "Alaska",
  ak: "Alaska",
  arizona: "Arizona",
  az: "Arizona",
  arkansas: "Arkansas",
  ar: "Arkansas",
  california: "California",
  ca: "California",
  colorado: "Colorado",
  co: "Colorado",
  connecticut: "Connecticut",
  ct: "Connecticut",
  delaware: "Delaware",
  de: "Delaware",
  florida: "Florida",
  fl: "Florida",
  georgia: "Georgia",
  ga: "Georgia",
  hawaii: "Hawaii",
  hi: "Hawaii",
  idaho: "Idaho",
  id: "Idaho",
  illinois: "Illinois",
  il: "Illinois",
  indiana: "Indiana",
  in: "Indiana",
  iowa: "Iowa",
  ia: "Iowa",
  kansas: "Kansas",
  ks: "Kansas",
  kentucky: "Kentucky",
  ky: "Kentucky",
  louisiana: "Louisiana",
  la: "Louisiana",
  maine: "Maine",
  me: "Maine",
  maryland: "Maryland",
  md: "Maryland",
  massachusetts: "Massachusetts",
  ma: "Massachusetts",
  michigan: "Michigan",
  mi: "Michigan",
  minnesota: "Minnesota",
  mn: "Minnesota",
  mississippi: "Mississippi",
  ms: "Mississippi",
  missouri: "Missouri",
  mo: "Missouri",
  montana: "Montana",
  mt: "Montana",
  nebraska: "Nebraska",
  ne: "Nebraska",
  nevada: "Nevada",
  nv: "Nevada",
  "new hampshire": "New Hampshire",
  nh: "New Hampshire",
  "new jersey": "New Jersey",
  nj: "New Jersey",
  "new mexico": "New Mexico",
  nm: "New Mexico",
  "new york": "New York",
  ny: "New York",
  "north carolina": "North Carolina",
  nc: "North Carolina",
  "north dakota": "North Dakota",
  nd: "North Dakota",
  ohio: "Ohio",
  oh: "Ohio",
  oklahoma: "Oklahoma",
  ok: "Oklahoma",
  oregon: "Oregon",
  or: "Oregon",
  pennsylvania: "Pennsylvania",
  pa: "Pennsylvania",
  rhode: "Rhode Island",
  "rhode island": "Rhode Island",
  ri: "Rhode Island",
  "south carolina": "South Carolina",
  sc: "South Carolina",
  "south dakota": "South Dakota",
  sd: "South Dakota",
  tennessee: "Tennessee",
  tn: "Tennessee",
  texas: "Texas",
  tx: "Texas",
  utah: "Utah",
  ut: "Utah",
  vermont: "Vermont",
  vt: "Vermont",
  virginia: "Virginia",
  va: "Virginia",
  washington: "Washington",
  wa: "Washington",
  "west virginia": "West Virginia",
  wv: "West Virginia",
  wisconsin: "Wisconsin",
  wi: "Wisconsin",
  wyoming: "Wyoming",
  wy: "Wyoming",
  dc: "District of Columbia",
};

const PLACE_ALIASES = [
  [/\bva\s+beach\b/gi, "Virginia Beach"],
  [/\bst\.?\s+pete\b(?!\s+beach)/gi, "Saint Petersburg"],
  [/\bst\.?\s+petersburg\b/gi, "Saint Petersburg"],
  [/\bnyc\b/gi, "New York City"],
  [/\bla\b/gi, "Los Angeles"],
  [/\bsf\b/gi, "San Francisco"],
];

const NOAA_TYPES = {
  tide: "tidepredictions",
  waterLevel: "waterlevels",
  waterTemp: "watertemp",
  met: "met",
  currents: "currentpredictions",
};

const NOAA_MAX_DISTANCE_NM = 100;

const WEATHER_CODE = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Showers",
  82: "Heavy showers",
  95: "Thunderstorm",
};

const els = {
  placeTitle: document.querySelector("#place-title"),
  status: document.querySelector("#status-pill"),
  summary: document.querySelector("#summary"),
  form: document.querySelector("#search-form"),
  input: document.querySelector("#location-input"),
  locate: document.querySelector("#locate-btn"),
  weatherGrid: document.querySelector("#weather-grid"),
  marineGrid: document.querySelector("#marine-grid"),
  marineDistance: document.querySelector("#marine-distance"),
  airGrid: document.querySelector("#air-grid"),
  aqTime: document.querySelector("#aq-time"),
  hourlyStrip: document.querySelector("#hourly-strip"),
  tempOrb: document.querySelector("#temp-orb"),
  tempOrbValue: document.querySelector("#temp-orb-value"),
  tempOrbUnit: document.querySelector("#temp-orb-unit"),
  visualPhrase: document.querySelector("#visual-phrase"),
  visualSubline: document.querySelector("#visual-subline"),
  insightGrid: document.querySelector("#insight-grid"),
  tempTrendNote: document.querySelector("#temp-trend-note"),
  tempTrendChart: document.querySelector("#temp-trend-chart"),
  windProfileChart: document.querySelector("#wind-profile-chart"),
  precipChart: document.querySelector("#precip-chart"),
  tideStationLabel: document.querySelector("#tide-station-label"),
  tideRangeNote: document.querySelector("#tide-range-note"),
  tideLineChart: document.querySelector("#tide-line-chart"),
  nwsAlertStatus: document.querySelector("#nws-alert-status"),
  nwsAlertList: document.querySelector("#nws-alert-list"),
  nwsForecastStatus: document.querySelector("#nws-forecast-status"),
  nwsGrid: document.querySelector("#nws-grid"),
  usgsStatus: document.querySelector("#usgs-status"),
  usgsGrid: document.querySelector("#usgs-grid"),
  floodStatus: document.querySelector("#flood-status"),
  floodChart: document.querySelector("#flood-chart"),
  buoyStatus: document.querySelector("#buoy-status"),
  buoyGrid: document.querySelector("#buoy-grid"),
  tideChart: document.querySelector("#tide-chart"),
  tideList: document.querySelector("#tide-list"),
  noaaGrid: document.querySelector("#noaa-grid"),
  stationList: document.querySelector("#station-list"),
  rawOutput: document.querySelector("#raw-output"),
  copyRaw: document.querySelector("#copy-raw"),
  metricTemplate: document.querySelector("#metric-template"),
};

const state = {
  map: null,
  selectedMarker: null,
  stationLayer: null,
  stationCache: {},
  charts: {},
  raw: {},
};

init();

function init() {
  state.map = L.map("map", { zoomControl: false }).setView([37.7749, -122.4194], 10);
  L.control.zoom({ position: "bottomleft" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(state.map);
  state.stationLayer = L.layerGroup().addTo(state.map);

  state.map.on("click", (event) => inspectLocation({
    lat: event.latlng.lat,
    lon: event.latlng.lng,
    label: `${event.latlng.lat.toFixed(4)}, ${event.latlng.lng.toFixed(4)}`,
    source: "Map point",
  }));

  els.form.addEventListener("submit", onSearch);
  els.locate.addEventListener("click", locateUser);
  els.copyRaw.addEventListener("click", copyRaw);
  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", selectTab));

  renderEmpty();
  inspectLocation({ lat: 37.7749, lon: -122.4194, label: "San Francisco, California", source: "Default" });
}

async function onSearch(event) {
  event.preventDefault();
  const value = els.input.value.trim();
  if (!value) return;

  const coord = parseCoordinates(value);
  if (coord) {
    await inspectLocation({ ...coord, label: `${coord.lat.toFixed(4)}, ${coord.lon.toFixed(4)}`, source: "Coordinates" });
    return;
  }

  setStatus("Searching", "busy");
  try {
    const hit = await geocodeLocation(value);
    if (!hit) throw new Error("No matching location found.");
    const label = formatPlaceLabel(hit);
    await inspectLocation({
      lat: hit.latitude,
      lon: hit.longitude,
      label,
      source: hit.source || "Open-Meteo geocoding",
      elevation: hit.elevation,
      timezone: hit.timezone,
    });
  } catch (error) {
    showError(error.message);
  }
}

function formatPlaceLabel(hit) {
  const seen = new Set();
  return [hit.name, hit.admin1, hit.country]
    .filter(Boolean)
    .filter((part) => {
      const key = cleanToken(part);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(", ");
}

async function geocodeLocation(value) {
  const parsed = parseSearchQuery(value);
  if (parsed.stateOnly) {
    const osmHit = await geocodeWithOpenStreetMap(parsed);
    if (osmHit) return osmHit;
  }

  if (parsed.state && parsed.city) {
    const osmHit = await geocodeWithOpenStreetMap(parsed);
    if (osmHit) return osmHit;
  }

  const candidates = buildGeocodeCandidates(parsed);
  let best = null;

  for (const name of candidates) {
    const url = withParams(API.geocode, { name, count: 20, language: "en", format: "json" });
    const data = await fetchJson(url);
    const hit = chooseGeocodeHit(data.results || [], parsed);
    if (hit && (!best || hit._score > best._score)) best = hit;
  }

  if (best && best._score >= (parsed.hasQualifier ? 45 : 10)) return stripInternalScore(best);

  const osmHit = await geocodeWithOpenStreetMap(parsed);
  if (osmHit) return osmHit;

  return best && !parsed.hasQualifier ? stripInternalScore(best) : null;
}

function parseSearchQuery(value) {
  const normalized = normalizeSearchText(value);
  const commaParts = normalized.split(",").map((part) => part.trim()).filter(Boolean);
  const words = normalized.split(/\s+/).filter(Boolean);
  let city = commaParts[0] || normalized;
  let state = null;
  let country = null;
  let stateOnly = false;

  for (const part of commaParts.slice(1)) {
    const clean = cleanToken(part);
    if (US_STATES[clean]) state = US_STATES[clean];
    else if (/\b(us|usa|united states|united states of america)\b/i.test(part)) country = "United States";
    else if (!country) country = part;
  }

  const wholeState = US_STATES[cleanToken(normalized)];
  if (!state && wholeState && commaParts.length === 1) {
    state = wholeState;
    country = "United States";
    city = "";
    stateOnly = true;
  }

  if (!state) {
    for (let size = Math.min(3, words.length - 1); size >= 1; size -= 1) {
      const tail = words.slice(-size).join(" ");
      const stateName = US_STATES[cleanToken(tail)];
      if (stateName) {
        state = stateName;
        city = words.slice(0, -size).join(" ");
        break;
      }
    }
  }

  if (state && !country) country = "United States";
  city = normalizeSearchText(city).replace(/\s+/g, " ").trim();

  return {
    raw: value,
    normalized,
    city,
    state,
    country,
    stateOnly,
    hasQualifier: Boolean(state || country || commaParts.length > 1),
  };
}

function normalizeSearchText(value) {
  return PLACE_ALIASES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
    .replace(/\s+/g, " ")
    .trim();
}

function buildGeocodeCandidates(parsed) {
  const candidates = new Set();
  candidates.add(parsed.normalized);
  if (parsed.city && parsed.state) {
    candidates.add(`${parsed.city}, ${parsed.state}`);
    candidates.add(`${parsed.city} ${parsed.state}`);
    candidates.add(`${parsed.city}, ${parsed.state}, United States`);
  }
  if (parsed.city && parsed.city !== parsed.normalized) candidates.add(parsed.city);
  return [...candidates].filter(Boolean);
}

function chooseGeocodeHit(results, parsed) {
  if (!results.length) return null;
  return results
    .map((hit) => ({ ...hit, _score: scoreOpenMeteoHit(hit, parsed) }))
    .filter((hit) => hit._score > -100)
    .sort((a, b) => b._score - a._score)[0] || null;
}

function scoreOpenMeteoHit(hit, parsed) {
  const haystack = searchableText([
    hit.name,
    hit.admin1,
    hit.admin2,
    hit.admin3,
    hit.country,
    hit.country_code,
    hit.timezone,
  ]);
  const cityTokens = cleanToken(parsed.city).split(" ").filter(Boolean);
  const name = cleanToken(hit.name || "");
  const state = cleanToken(hit.admin1 || "");
  const country = cleanToken(hit.country || "");
  const countryCode = cleanToken(hit.country_code || "");

  if (parsed.state && state !== cleanToken(parsed.state)) return -200;
  if (parsed.country && !["united states", "usa", "us"].includes(cleanToken(parsed.country))) {
    if (!haystack.includes(cleanToken(parsed.country))) return -200;
  }
  if (parsed.country === "United States" && countryCode !== "us" && country !== "united states") return -200;

  let score = 0;
  if (parsed.stateOnly) score += state === cleanToken(parsed.state) ? 50 : -50;
  else if (cityTokens.every((token) => name.includes(token))) score += 40;
  else if (cityTokens.every((token) => haystack.includes(token))) score += 18;
  else score -= 25;

  if (parsed.state) score += 45;
  if (parsed.country) score += 15;
  if (!parsed.hasQualifier && countryCode === "us") score += 8;
  if (hit.feature_code?.startsWith("PPL")) score += 16;
  if (hit.feature_code?.startsWith("ADM")) score += 8;
  if (hit.feature_code?.startsWith("AIR")) score -= 14;
  if (hit.population) score += Math.min(12, Math.log10(hit.population));
  return score;
}

async function geocodeWithOpenStreetMap(parsed) {
  const structured = parsed.stateOnly
    ? await fetchOsmSearch({
      state: parsed.state,
      country: parsed.country || "United States",
      limit: 10,
      addressdetails: 1,
      format: "jsonv2",
    })
    : parsed.city && parsed.state
    ? await fetchOsmSearch({
      city: parsed.city,
      state: parsed.state,
      country: parsed.country || "United States",
      limit: 10,
      addressdetails: 1,
      format: "jsonv2",
    })
    : [];

  const freeform = structured.length ? structured : await fetchOsmSearch({
    q: [parsed.city || parsed.normalized, parsed.state, parsed.country].filter(Boolean).join(", "),
    limit: 10,
    addressdetails: 1,
    format: "jsonv2",
  });

  const hit = freeform
    .map((item) => ({ item, score: scoreOsmHit(item, parsed) }))
    .filter((entry) => entry.score > -100)
    .sort((a, b) => b.score - a.score)[0]?.item;

  if (!hit) return null;
  return {
    name: hit.name || parsed.city || hit.display_name?.split(",")[0] || "Selected place",
    latitude: Number(hit.lat),
    longitude: Number(hit.lon),
    elevation: undefined,
    timezone: undefined,
    country: hit.address?.country,
    admin1: hit.address?.state,
    source: "OpenStreetMap geocoding",
  };
}

async function fetchOsmSearch(params) {
  try {
    return await fetchJson(withParams(API.osmGeocode, params));
  } catch {
    return [];
  }
}

function scoreOsmHit(hit, parsed) {
  const address = hit.address || {};
  const state = cleanToken(address.state || "");
  const country = cleanToken(address.country || "");
  const countryCode = cleanToken(address.country_code || "");
  const type = cleanToken(hit.addresstype || hit.type || "");
  const category = cleanToken(hit.category || "");
  const haystack = searchableText([hit.name, hit.display_name, address.city, address.town, address.village, address.state, address.country]);
  const cityTokens = cleanToken(parsed.city || parsed.normalized).split(" ").filter(Boolean);

  if (parsed.state && state !== cleanToken(parsed.state)) return -200;
  if (parsed.country === "United States" && countryCode !== "us" && country !== "united states") return -200;
  if (!parsed.stateOnly && !cityTokens.every((token) => haystack.includes(token))) return -120;

  let score = Number(hit.importance || 0) * 25;
  if (parsed.stateOnly && type === "state") score += 75;
  if (["city", "town", "village", "municipality"].includes(type)) score += 60;
  if (category === "boundary") score += 25;
  if (["road", "park", "house", "restaurant", "bar"].includes(type)) score -= 30;
  if (parsed.state) score += 40;
  if (parsed.country) score += 10;
  return score;
}

function stripInternalScore(hit) {
  const { _score, ...rest } = hit;
  return rest;
}

function searchableText(values) {
  return cleanToken(values.filter(Boolean).join(" "));
}

function cleanToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\bst\b/g, "saint")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function locateUser() {
  if (!navigator.geolocation) {
    showError("Geolocation is not available in this browser.");
    return;
  }
  setStatus("Locating", "busy");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      inspectLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        label: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
        source: "Browser location",
      });
    },
    (error) => showError(error.message),
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
  );
}

async function inspectLocation(location) {
  setStatus("Loading", "busy");
  clearDynamicContent();

  const lat = Number(location.lat);
  const lon = Number(location.lon);
  const label = location.label || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  els.placeTitle.textContent = label;
  updateMarker(lat, lon, label);

  try {
    const [weather, marine, air, stations, history, flood, nws, usgs, buoy] = await Promise.allSettled([
      getWeather(lat, lon),
      getMarine(lat, lon),
      getAirQuality(lat, lon),
      getNearestStations(lat, lon),
      getHistoricalWeather(lat, lon),
      getFloodForecast(lat, lon),
      getNwsSignals(lat, lon),
      getUsgsInstantValues(lat, lon),
      getNearestBuoy(lat, lon),
    ]);

    const resolved = {
      weather: valueOrNull(weather),
      marine: valueOrNull(marine),
      air: valueOrNull(air),
      stations: valueOrNull(stations),
      history: valueOrNull(history),
      flood: valueOrNull(flood),
      nws: valueOrNull(nws),
      usgs: valueOrNull(usgs),
      buoy: valueOrNull(buoy),
    };

    const noaa = resolved.stations ? await getNoaaDetails(resolved.stations) : {};
    state.raw = { location: { ...location, lat, lon }, ...resolved, noaa };

    renderAll({ location: { ...location, lat, lon, label }, ...resolved, noaa });
    setStatus("Live", "");
  } catch (error) {
    showError(error.message);
  }
}

async function getWeather(lat, lon) {
  const params = {
    latitude: lat,
    longitude: lon,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "dew_point_2m",
      "apparent_temperature",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "visibility",
      "is_day",
    ].join(","),
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "dew_point_2m",
      "precipitation_probability",
      "precipitation",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "uv_index",
      "visibility",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_sum",
      "wind_speed_10m_max",
    ].join(","),
    timezone: "auto",
    forecast_days: 7,
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
  };
  return fetchJson(withParams(API.weather, params));
}

async function getHistoricalWeather(lat, lon) {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - 29);

  const params = {
    latitude: lat,
    longitude: lon,
    start_date: ymdDash(start),
    end_date: ymdDash(end),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "temperature_2m_mean",
      "precipitation_sum",
      "wind_speed_10m_max",
    ].join(","),
    timezone: "auto",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    precipitation_unit: "inch",
  };
  return fetchJson(withParams(API.history, params));
}

async function getMarine(lat, lon) {
  const params = {
    latitude: lat,
    longitude: lon,
    current: [
      "wave_height",
      "wave_direction",
      "wave_period",
      "wind_wave_height",
      "swell_wave_height",
      "swell_wave_direction",
      "ocean_current_velocity",
      "ocean_current_direction",
      "sea_surface_temperature",
      "sea_level_height_msl",
    ].join(","),
    hourly: [
      "wave_height",
      "wave_direction",
      "wave_period",
      "wind_wave_height",
      "swell_wave_height",
      "swell_wave_direction",
      "ocean_current_velocity",
      "ocean_current_direction",
      "sea_surface_temperature",
      "sea_level_height_msl",
    ].join(","),
    timezone: "auto",
    forecast_days: 7,
    cell_selection: "nearest",
  };
  return fetchJson(withParams(API.marine, params));
}

async function getAirQuality(lat, lon) {
  const params = {
    latitude: lat,
    longitude: lon,
    current: [
      "european_aqi",
      "us_aqi",
      "pm10",
      "pm2_5",
      "carbon_monoxide",
      "nitrogen_dioxide",
      "sulphur_dioxide",
      "ozone",
      "aerosol_optical_depth",
      "dust",
      "uv_index",
      "uv_index_clear_sky",
      "ammonia",
      "alder_pollen",
      "birch_pollen",
      "grass_pollen",
      "mugwort_pollen",
      "olive_pollen",
      "ragweed_pollen",
    ].join(","),
    hourly: "pm10,pm2_5,us_aqi,uv_index,dust,grass_pollen,ragweed_pollen",
    timezone: "auto",
    forecast_days: 5,
  };
  return fetchJson(withParams(API.air, params));
}

async function getFloodForecast(lat, lon) {
  return fetchJson(withParams(API.flood, {
    latitude: lat,
    longitude: lon,
    daily: "river_discharge,river_discharge_mean,river_discharge_max,river_discharge_min,river_discharge_p25,river_discharge_p75",
    past_days: 7,
    forecast_days: 30,
    cell_selection: "nearest",
  }));
}

async function getNwsSignals(lat, lon) {
  if (!isProbablyUs(lat, lon)) return { unavailable: "Outside likely NWS coverage" };
  const alerts = await fetchJson(withParams(`${API.nws}/alerts/active`, { point: `${lat},${lon}` }));
  let point = null;
  let hourly = null;
  try {
    point = await fetchJson(`${API.nws}/points/${lat.toFixed(4)},${lon.toFixed(4)}`);
    if (point?.properties?.forecastHourly) hourly = await fetchJson(point.properties.forecastHourly);
  } catch (error) {
    point = { error: error.message };
  }
  return { alerts, point, hourly };
}

async function getUsgsInstantValues(lat, lon) {
  if (!isProbablyUs(lat, lon)) return { unavailable: "Outside likely USGS live water coverage" };
  const box = bbox(lat, lon, 0.35);
  return fetchJson(withParams(API.usgsIv, {
    format: "json",
    bBox: box.join(","),
    parameterCd: "00060,00065,00010,00400,00095,00300,63680",
    siteStatus: "all",
  }));
}

async function getNearestBuoy(lat, lon) {
  try {
    const response = await fetch(API.ndbcLatest);
    if (!response.ok) throw new Error(`NDBC latest unavailable: ${response.status}`);
    const text = await response.text();
    return parseNearestBuoy(text, lat, lon);
  } catch (error) {
    return { error: error.message };
  }
}

async function getNearestStations(lat, lon) {
  const entries = await Promise.all(Object.entries(NOAA_TYPES).map(async ([key, type]) => {
    const stations = await getStations(type);
    const nearest = stations
      .filter((station) => Number.isFinite(Number(station.lat)) && Number.isFinite(Number(station.lng)))
      .map((station) => ({ ...station, distanceNm: distanceNm(lat, lon, Number(station.lat), Number(station.lng)) }))
      .sort((a, b) => a.distanceNm - b.distanceNm)[0];
    return [key, nearest && nearest.distanceNm <= NOAA_MAX_DISTANCE_NM ? nearest : null];
  }));
  return Object.fromEntries(entries);
}

async function getStations(type) {
  if (state.stationCache[type]) return state.stationCache[type];
  const data = await fetchJson(withParams(API.noaaMeta, { type }));
  const stations = data.stations || data.stationList || [];
  state.stationCache[type] = stations;
  return stations;
}

async function getNoaaDetails(stations) {
  const tideStation = stations.tide;
  const waterLevelStation = stations.waterLevel;
  const waterTempStation = stations.waterTemp;
  const metStation = stations.met;
  const currentStation = stations.currents;

  const requests = {
    tidePredictions: tideStation ? getTidePredictions(tideStation.id) : null,
    waterLevel: waterLevelStation ? getNoaaLatest(waterLevelStation.id, "water_level", { datum: "MLLW" }) : null,
    waterTemperature: waterTempStation ? getNoaaLatest(waterTempStation.id, "water_temperature") : null,
    airTemperature: metStation ? getNoaaLatest(metStation.id, "air_temperature") : null,
    wind: metStation ? getNoaaLatest(metStation.id, "wind") : null,
    pressure: metStation ? getNoaaLatest(metStation.id, "air_pressure") : null,
    humidity: metStation ? getNoaaLatest(metStation.id, "humidity") : null,
    visibility: metStation ? getNoaaLatest(metStation.id, "visibility") : null,
    currents: currentStation ? getCurrentPredictions(currentStation.id) : null,
  };

  const settled = await Promise.allSettled(Object.entries(requests).map(async ([key, promise]) => {
    if (!promise) return [key, null];
    try {
      return [key, await promise];
    } catch (error) {
      return [key, { error: error.message }];
    }
  }));

  return Object.fromEntries(settled.map((result) => result.value));
}

async function getTidePredictions(station) {
  const { begin, end } = dateRange(6);
  return fetchJson(withParams(API.noaaData, {
    begin_date: begin,
    end_date: end,
    station,
    product: "predictions",
    datum: "MLLW",
    time_zone: "lst_ldt",
    interval: "hilo",
    units: "english",
    application: "TideTempFreeMap",
    format: "json",
  }));
}

async function getCurrentPredictions(station) {
  return fetchJson(withParams(API.noaaData, {
    date: "today",
    station,
    product: "currents_predictions",
    time_zone: "lst_ldt",
    interval: "max_slack",
    units: "english",
    application: "TideTempFreeMap",
    format: "json",
  }));
}

async function getNoaaLatest(station, product, extra = {}) {
  return fetchJson(withParams(API.noaaData, {
    date: "latest",
    station,
    product,
    time_zone: "lst_ldt",
    units: "english",
    application: "TideTempFreeMap",
    format: "json",
    ...extra,
  }));
}

function renderAll(data) {
  const { location, weather, marine, air, stations, noaa, history, flood, nws, usgs, buoy } = data;
  renderSummary(location, weather, marine);
  renderVisualDashboard({ weather, history, air });
  renderWeather(weather);
  renderMarine(marine, location);
  renderAir(air);
  renderHourly(weather);
  renderTides(noaa, stations);
  renderNoaaObservations(noaa, stations);
  renderSignals({ flood, nws, usgs, buoy, location });
  renderStations(stations);
  renderRaw();
  renderStationMarkers(stations);
}

function renderVisualDashboard({ weather, history, air }) {
  const current = weather?.current;
  const units = weather?.current_units || {};
  if (!current) {
    els.tempOrbValue.textContent = "--";
    els.visualPhrase.textContent = "Weather story unavailable";
    els.visualSubline.textContent = "No current weather payload returned for this location.";
    els.insightGrid.innerHTML = "";
    destroyChart("temperature");
    destroyChart("wind");
    destroyChart("precip");
    return;
  }

  const temp = Number(current.temperature_2m);
  const heat = clamp(((temp - 20) / 90) * 100, 8, 94);
  els.tempOrb.style.setProperty("--heat", `${heat}%`);
  els.tempOrbValue.textContent = Number.isFinite(temp) ? temp.toFixed(0) : "--";
  els.tempOrbUnit.textContent = units.temperature_2m || "°F";
  els.visualPhrase.textContent = buildWeatherPhrase(current, air?.current);
  els.visualSubline.textContent = buildWeatherSubline(weather, history);
  renderInsights(weather, history);
  renderTemperatureChart(weather, history);
  renderWindChart(weather);
  renderPrecipChart(weather, history);
}

function renderInsights(weather, history) {
  const daily = weather?.daily || {};
  const current = weather?.current || {};
  const historyDaily = history?.daily || {};
  const avgHigh = average(historyDaily.temperature_2m_max);
  const avgLow = average(historyDaily.temperature_2m_min);
  const avgMean = average(historyDaily.temperature_2m_mean);
  const todayHigh = daily.temperature_2m_max?.[0];
  const todayLow = daily.temperature_2m_min?.[0];
  const currentTemp = current.temperature_2m;
  const pastRain = sum(last(historyDaily.precipitation_sum, 7));
  const nextRain = sum(daily.precipitation_sum || []);

  const insights = [
    ["Current vs 30-day mean", signedDiff(currentTemp, avgMean, "°F"), avgMean == null ? "Archive unavailable" : `Recent mean ${avgMean.toFixed(1)} °F`],
    ["Today high vs recent high", signedDiff(todayHigh, avgHigh, "°F"), avgHigh == null ? "Archive unavailable" : `30-day high avg ${avgHigh.toFixed(1)} °F`],
    ["Tonight low vs recent low", signedDiff(todayLow, avgLow, "°F"), avgLow == null ? "Archive unavailable" : `30-day low avg ${avgLow.toFixed(1)} °F`],
    ["Rain shift", signedDiff(nextRain, pastRain, " in"), `Past 7 ${formatNumber(pastRain)} in · next 7 ${formatNumber(nextRain)} in`],
    ["Peak wind ahead", format(max(weather?.hourly?.wind_speed_10m?.slice(0, 24)), weather?.hourly_units?.wind_speed_10m), "Next 24 hours"],
    ["UV peak today", format(daily.uv_index_max?.[0], weather?.daily_units?.uv_index_max), "Daily forecast"],
  ];

  els.insightGrid.innerHTML = "";
  insights.forEach(([label, value, detail]) => {
    const item = document.createElement("article");
    item.className = "insight";
    item.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><p class="metric-detail">${escapeHtml(detail)}</p>`;
    els.insightGrid.appendChild(item);
  });
}

function renderTemperatureChart(weather, history) {
  const historyDaily = history?.daily;
  const forecastDaily = weather?.daily;
  if (!historyDaily?.time?.length || !forecastDaily?.time?.length || !window.Chart) {
    destroyChart("temperature");
    return;
  }

  const historyLabels = historyDaily.time.map(shortDate);
  const forecastLabels = forecastDaily.time.map(shortDate);
  const labels = [...historyLabels, ...forecastLabels];
  const historyPadding = Array(historyLabels.length).fill(null);
  const forecastPadding = Array(forecastLabels.length).fill(null);

  els.tempTrendNote.textContent = `${historyLabels.length} archived days + ${forecastLabels.length} forecast days`;
  setChart("temperature", els.tempTrendChart, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Archive high",
          data: [...historyDaily.temperature_2m_max, ...forecastPadding],
          borderColor: "#b94a48",
          backgroundColor: "rgba(185, 74, 72, 0.12)",
          fill: false,
          tension: 0.35,
          pointRadius: 0,
        },
        {
          label: "Archive low",
          data: [...historyDaily.temperature_2m_min, ...forecastPadding],
          borderColor: "#0b6f8f",
          backgroundColor: "rgba(11, 111, 143, 0.10)",
          fill: "-1",
          tension: 0.35,
          pointRadius: 0,
        },
        {
          label: "Forecast high",
          data: [...historyPadding, ...forecastDaily.temperature_2m_max],
          borderColor: "#d7a22a",
          borderDash: [5, 5],
          tension: 0.35,
          pointRadius: 2,
        },
        {
          label: "Forecast low",
          data: [...historyPadding, ...forecastDaily.temperature_2m_min],
          borderColor: "#2f7d58",
          borderDash: [5, 5],
          tension: 0.35,
          pointRadius: 2,
        },
      ],
    },
    options: chartOptions({ yTitle: weather.daily_units?.temperature_2m_max || "°F" }),
  });
}

function renderWindChart(weather) {
  const hourly = weather?.hourly;
  if (!hourly?.time?.length || !window.Chart) {
    destroyChart("wind");
    return;
  }

  const labels = hourly.time.slice(0, 24).map(hourLabel);
  setChart("wind", els.windProfileChart, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Wind",
          data: hourly.wind_speed_10m.slice(0, 24),
          backgroundColor: "rgba(11, 111, 143, 0.72)",
          borderRadius: 4,
        },
        {
          type: "line",
          label: "Gusts",
          data: hourly.wind_gusts_10m.slice(0, 24),
          borderColor: "#d7a22a",
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: chartOptions({ yTitle: weather.hourly_units?.wind_speed_10m || "mph", legend: false }),
  });
}

function renderPrecipChart(weather, history) {
  const past = sum(last(history?.daily?.precipitation_sum || [], 7));
  const future = sum(weather?.daily?.precipitation_sum || []);
  if (!window.Chart) {
    destroyChart("precip");
    return;
  }

  const isDry = past === 0 && future === 0;
  setChart("precip", els.precipChart, {
    type: "doughnut",
    data: {
      labels: isDry ? ["No rain signal"] : ["Past 7 days", "Next 7 days"],
      datasets: [{
        data: isDry ? [1] : [past, future],
        backgroundColor: isDry ? ["#d8ded9"] : ["#0b6f8f", "#d7a22a"],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "64%",
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 10, color: "#526171" } },
        tooltip: {
          callbacks: {
            label: (context) => isDry ? "No measurable rain" : `${context.label}: ${formatNumber(context.parsed)} in`,
          },
        },
      },
    },
  });
}

function renderSummary(location, weather, marine) {
  const elevation = weather?.elevation ?? location.elevation;
  const weatherPoint = weather ? `${weather.latitude.toFixed(3)}, ${weather.longitude.toFixed(3)}` : "Unavailable";
  const marinePoint = marine ? `${marine.latitude.toFixed(3)}, ${marine.longitude.toFixed(3)}` : "Unavailable";
  els.summary.innerHTML = "";
  [
    ["Selected", `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`],
    ["Timezone", weather?.timezone || location.timezone || "Auto"],
    ["Elevation", valueWithUnit(elevation, "m")],
    ["Weather grid", weatherPoint],
    ["Marine grid", marinePoint],
    ["Source", location.source || "Map"],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "summary-item";
    item.innerHTML = `<span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>`;
    els.summary.appendChild(item);
  });
}

function renderWeather(weather) {
  if (!weather?.current) {
    renderNotice(els.weatherGrid, "Weather unavailable");
    return;
  }
  const c = weather.current;
  const units = weather.current_units || {};
  renderMetrics(els.weatherGrid, [
    ["Temperature", format(c.temperature_2m, units.temperature_2m), formatTime(c.time)],
    ["Feels like", format(c.apparent_temperature, units.apparent_temperature), WEATHER_CODE[c.weather_code] || `Code ${c.weather_code}`],
    ["Humidity", format(c.relative_humidity_2m, units.relative_humidity_2m), `Dew point ${format(c.dew_point_2m, units.dew_point_2m)}`],
    ["Wind", format(c.wind_speed_10m, units.wind_speed_10m), `${compass(c.wind_direction_10m)} ${format(c.wind_gusts_10m, units.wind_gusts_10m)} gusts`],
    ["Pressure", format(c.pressure_msl, units.pressure_msl), `Surface ${format(c.surface_pressure, units.surface_pressure)}`],
    ["Clouds", format(c.cloud_cover, units.cloud_cover), `Visibility ${format(c.visibility, units.visibility)}`],
    ["Rain now", format(c.rain, units.rain), `Showers ${format(c.showers, units.showers)}`],
    ["Snow now", format(c.snowfall, units.snowfall), c.is_day ? "Daylight" : "Night"],
  ]);
}

function renderMarine(marine, location) {
  if (!marine?.current) {
    els.marineDistance.textContent = "";
    renderNotice(els.marineGrid, "Marine data unavailable");
    return;
  }
  const c = marine.current;
  const units = marine.current_units || {};
  const dist = distanceNm(location.lat, location.lon, marine.latitude, marine.longitude);
  els.marineDistance.textContent = `${dist.toFixed(1)} nm grid offset`;
  renderMetrics(els.marineGrid, [
    ["Sea temp", format(c.sea_surface_temperature, units.sea_surface_temperature), formatTime(c.time)],
    ["Wave height", format(c.wave_height, units.wave_height), `${format(c.wave_period, units.wave_period)} period`],
    ["Wave direction", compass(c.wave_direction), `${format(c.wave_direction, units.wave_direction)} true`],
    ["Swell", format(c.swell_wave_height, units.swell_wave_height), `${compass(c.swell_wave_direction)} swell`],
    ["Ocean current", format(c.ocean_current_velocity, units.ocean_current_velocity), compass(c.ocean_current_direction)],
    ["Sea level MSL", format(c.sea_level_height_msl, units.sea_level_height_msl), "Model sea level"],
  ]);
}

function renderAir(air) {
  if (!air?.current) {
    els.aqTime.textContent = "";
    renderNotice(els.airGrid, "Air quality unavailable");
    return;
  }
  const c = air.current;
  const units = air.current_units || {};
  els.aqTime.textContent = formatTime(c.time);
  renderMetrics(els.airGrid, [
    ["US AQI", format(c.us_aqi, units.us_aqi), aqiLabel(c.us_aqi)],
    ["EU AQI", format(c.european_aqi, units.european_aqi), "European index"],
    ["PM2.5", format(c.pm2_5, units.pm2_5), "Fine particles"],
    ["PM10", format(c.pm10, units.pm10), "Coarse particles"],
    ["Ozone", format(c.ozone, units.ozone), "O3"],
    ["NO2", format(c.nitrogen_dioxide, units.nitrogen_dioxide), "Nitrogen dioxide"],
    ["CO", format(c.carbon_monoxide, units.carbon_monoxide), "Carbon monoxide"],
    ["Dust", format(c.dust, units.dust), `AOD ${format(c.aerosol_optical_depth, units.aerosol_optical_depth)}`],
    ["UV", format(c.uv_index, units.uv_index), `Clear sky ${format(c.uv_index_clear_sky, units.uv_index_clear_sky)}`],
    ["Grass pollen", format(c.grass_pollen, units.grass_pollen), `Ragweed ${format(c.ragweed_pollen, units.ragweed_pollen)}`],
  ]);
}

function renderHourly(weather) {
  els.hourlyStrip.innerHTML = "";
  const hourly = weather?.hourly;
  if (!hourly?.time?.length) {
    renderNotice(els.hourlyStrip, "Hourly forecast unavailable");
    return;
  }
  hourly.time.slice(0, 24).forEach((time, index) => {
    const item = document.createElement("article");
    item.className = "hourly-item";
    item.innerHTML = `
      <p class="hourly-time">${escapeHtml(hourLabel(time))}</p>
      <p class="hourly-temp">${escapeHtml(format(hourly.temperature_2m?.[index], weather.hourly_units?.temperature_2m))}</p>
      <p class="hourly-mini">Rain ${escapeHtml(format(hourly.precipitation_probability?.[index], weather.hourly_units?.precipitation_probability))}</p>
      <p class="hourly-mini">Wind ${escapeHtml(format(hourly.wind_speed_10m?.[index], weather.hourly_units?.wind_speed_10m))}</p>
      <p class="hourly-mini">UV ${escapeHtml(format(hourly.uv_index?.[index], weather.hourly_units?.uv_index))}</p>
    `;
    els.hourlyStrip.appendChild(item);
  });
}

function renderTides(noaa, stations) {
  const predictions = noaa?.tidePredictions?.predictions || [];
  const station = stations?.tide;
  els.tideStationLabel.textContent = station ? `${station.name} · ${station.distanceNm.toFixed(1)} nm` : "";

  if (!predictions.length) {
    destroyChart("tide");
    els.tideRangeNote.textContent = "";
    els.tideChart.classList.remove("is-hidden");
    els.tideChart.innerHTML = '<div class="summary-item"><strong>No NOAA tide prediction returned</strong><span>Try a U.S. coastal or Great Lakes location.</span></div>';
    els.tideList.innerHTML = "";
    return;
  }

  renderTideChart(predictions);
  els.tideList.innerHTML = "";
  predictions.slice(0, 16).forEach((event) => {
    const item = document.createElement("article");
    const low = event.type === "L";
    item.className = "event-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(low ? "Low tide" : "High tide")}</strong>
        <p class="muted">${escapeHtml(formatNoaaTime(event.t))}</p>
      </div>
      <span class="event-badge ${low ? "low" : ""}">${escapeHtml(Number(event.v).toFixed(2))} ft</span>
    `;
    els.tideList.appendChild(item);
  });
}

function renderTideChart(predictions) {
  const points = predictions.slice(0, 18).map((point, index) => ({
    x: index,
    y: Number(point.v),
    type: point.type,
    label: point.t,
  })).filter((point) => Number.isFinite(point.y));

  if (points.length < 2) {
    destroyChart("tide");
    els.tideRangeNote.textContent = "";
    els.tideChart.classList.remove("is-hidden");
    els.tideChart.innerHTML = "";
    return;
  }

  const min = Math.min(...points.map((point) => point.y));
  const max = Math.max(...points.map((point) => point.y));
  els.tideRangeNote.textContent = `${(max - min).toFixed(1)} ft swing`;

  if (window.Chart && els.tideLineChart) {
    els.tideChart.classList.add("is-hidden");
    setChart("tide", els.tideLineChart, {
      type: "line",
      data: {
        labels: points.map((point) => formatNoaaTime(point.label).split(" · ")[1] || point.label),
        datasets: [{
          label: "Tide height",
          data: points.map((point) => point.y),
          borderColor: "#0b6f8f",
          backgroundColor: "rgba(11, 111, 143, 0.16)",
          fill: true,
          tension: 0.4,
          pointRadius: points.map((point) => point.type === "H" ? 5 : 4),
          pointBackgroundColor: points.map((point) => point.type === "H" ? "#b94a48" : "#2f7d58"),
          pointBorderWidth: 0,
        }],
      },
      options: chartOptions({ yTitle: "ft", legend: false }),
    });
    return;
  }

  const width = 520;
  const height = 170;
  const pad = 22;
  const range = max - min || 1;
  const step = (width - pad * 2) / (points.length - 1);
  const coords = points.map((point, index) => ({
    ...point,
    sx: pad + index * step,
    sy: height - pad - ((point.y - min) / range) * (height - pad * 2),
  }));
  const line = coords.map((point) => `${point.sx.toFixed(1)},${point.sy.toFixed(1)}`).join(" ");
  const fill = `${pad},${height - pad} ${line} ${width - pad},${height - pad}`;

  els.tideChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Tide prediction chart">
      <polygon points="${fill}" fill="rgba(11,111,143,0.14)"></polygon>
      <polyline points="${line}" fill="none" stroke="#0b6f8f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#cbd5d0"></line>
      <text x="${pad}" y="17" fill="#526171" font-size="12">${max.toFixed(1)} ft</text>
      <text x="${pad}" y="${height - 7}" fill="#526171" font-size="12">${min.toFixed(1)} ft</text>
      ${coords.map((point) => `<circle cx="${point.sx}" cy="${point.sy}" r="4" fill="${point.type === "H" ? "#0b6f8f" : "#2f7d58"}"></circle>`).join("")}
    </svg>
  `;
}

function renderNoaaObservations(noaa, stations) {
  const data = [
    ["Water level", noaa?.waterLevel?.data?.[0]?.v, "ft", stationDetail(stations?.waterLevel, noaa?.waterLevel?.data?.[0]?.t)],
    ["Water temp", noaa?.waterTemperature?.data?.[0]?.v, "°F", stationDetail(stations?.waterTemp, noaa?.waterTemperature?.data?.[0]?.t)],
    ["Air temp", noaa?.airTemperature?.data?.[0]?.v, "°F", stationDetail(stations?.met, noaa?.airTemperature?.data?.[0]?.t)],
    ["Wind", noaa?.wind?.data?.[0]?.s, "kn", windDetail(noaa?.wind?.data?.[0], stations?.met)],
    ["Pressure", noaa?.pressure?.data?.[0]?.v, "mb", stationDetail(stations?.met, noaa?.pressure?.data?.[0]?.t)],
    ["Humidity", noaa?.humidity?.data?.[0]?.v, "%", stationDetail(stations?.met, noaa?.humidity?.data?.[0]?.t)],
    ["Visibility", noaa?.visibility?.data?.[0]?.v, "nmi", stationDetail(stations?.met, noaa?.visibility?.data?.[0]?.t)],
    ["Current max/slack", currentValue(noaa?.currents), "", stations?.currents ? `${stations.currents.name} · ${stations.currents.distanceNm.toFixed(1)} nm` : "Unavailable"],
  ];
  renderMetrics(els.noaaGrid, data.map(([label, value, unit, detail]) => [label, value == null ? "No data" : `${value}${unit ? ` ${unit}` : ""}`, detail || "NOAA CO-OPS"]));
}

function renderSignals({ flood, nws, usgs, buoy, location }) {
  renderNws(nws);
  renderUsgs(usgs, location);
  renderFlood(flood);
  renderBuoy(buoy);
}

function renderNws(nws) {
  if (!nws || nws.unavailable) {
    els.nwsAlertStatus.textContent = nws?.unavailable || "Unavailable";
    els.nwsForecastStatus.textContent = "Unavailable";
    els.nwsAlertList.innerHTML = "";
    renderNotice(els.nwsGrid, "NWS data is U.S.-only");
    return;
  }

  const alerts = nws.alerts?.features || [];
  els.nwsAlertStatus.textContent = alerts.length ? `${alerts.length} active` : "No active alerts";
  els.nwsAlertList.innerHTML = "";
  if (!alerts.length) {
    els.nwsAlertList.innerHTML = '<article class="event-item"><div><strong>No active watches, warnings, or advisories</strong><p class="muted">National Weather Service active-alert endpoint</p></div><span class="event-badge low">Clear</span></article>';
  } else {
    alerts.slice(0, 5).forEach((alert) => {
      const props = alert.properties || {};
      const item = document.createElement("article");
      item.className = "event-item";
      item.innerHTML = `
        <div>
          <strong>${escapeHtml(props.event || "NWS alert")}</strong>
          <p class="muted">${escapeHtml(props.severity || "Unknown")} · ${escapeHtml(props.areaDesc || "Area unavailable")}</p>
        </div>
        <span class="event-badge">${escapeHtml(props.certainty || "Alert")}</span>
      `;
      els.nwsAlertList.appendChild(item);
    });
  }

  const periods = nws.hourly?.properties?.periods || [];
  els.nwsForecastStatus.textContent = periods.length ? `${periods.length} hourly periods` : "No hourly forecast";
  renderMetrics(els.nwsGrid, periods.slice(0, 6).map((period) => [
    hourLabel(period.startTime),
    `${period.temperature} °${period.temperatureUnit}`,
    `${period.shortForecast} · ${period.windSpeed} ${period.windDirection}`,
  ]));
}

function renderUsgs(usgs, location) {
  const series = usgs?.value?.timeSeries || [];
  if (!series.length) {
    els.usgsStatus.textContent = usgs?.unavailable || "No nearby live gauges";
    renderNotice(els.usgsGrid, "No USGS live water values in the nearby search box");
    return;
  }

  const readings = series
    .map((item) => normalizeUsgsSeries(item, location))
    .filter(Boolean)
    .sort((a, b) => a.distanceNm - b.distanceNm)
    .slice(0, 9);

  els.usgsStatus.textContent = `${readings.length} nearby readings`;
  renderMetrics(els.usgsGrid, readings.map((reading) => [
    reading.label,
    `${reading.value} ${reading.unit}`,
    `${reading.site} · ${reading.distanceNm.toFixed(1)} nm · ${formatTime(reading.time)}`,
  ]));
}

function renderFlood(flood) {
  const daily = flood?.daily;
  const values = daily?.river_discharge || [];
  const valid = values.filter((value) => Number.isFinite(Number(value))).map(Number);
  if (!daily?.time?.length || valid.length < 2 || !window.Chart) {
    els.floodStatus.textContent = "No modeled river near point";
    destroyChart("flood");
    return;
  }

  const latest = valid[0];
  const peak = Math.max(...valid);
  els.floodStatus.textContent = `Now ${formatNumber(latest)} m³/s · peak ${formatNumber(peak)} m³/s`;
  setChart("flood", els.floodChart, {
    type: "line",
    data: {
      labels: daily.time.map(shortDate),
      datasets: [{
        label: "River discharge",
        data: values,
        borderColor: "#2f7d58",
        backgroundColor: "rgba(47, 125, 88, 0.14)",
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      }],
    },
    options: chartOptions({ yTitle: flood.daily_units?.river_discharge || "m³/s", legend: false }),
  });
}

function renderBuoy(buoy) {
  if (!buoy || buoy.error || !buoy.id) {
    els.buoyStatus.textContent = buoy?.error ? "Unavailable on local dev" : "No buoy data";
    renderNotice(els.buoyGrid, buoy?.error || "Nearest buoy feed unavailable");
    return;
  }

  els.buoyStatus.textContent = `${buoy.id} · ${buoy.distanceNm.toFixed(1)} nm · ${formatTime(buoy.time)}`;
  renderMetrics(els.buoyGrid, [
    ["Wave height", format(buoy.waveHeightM, "m"), `Period ${format(buoy.dominantPeriodSec, "s")}`],
    ["Wind", format(msToMph(buoy.windSpeedMs), "mph"), `${compass(buoy.windDirectionDeg)} gust ${format(msToMph(buoy.gustMs), "mph")}`],
    ["Pressure", format(buoy.pressureHpa, "hPa"), `Tendency ${format(buoy.pressureTendencyHpa, "hPa")}`],
    ["Air temp", format(cToF(buoy.airTempC), "°F"), `Dew ${format(cToF(buoy.dewpointC), "°F")}`],
    ["Water temp", format(cToF(buoy.waterTempC), "°F"), "NOAA NDBC latest observations"],
    ["Tide", format(buoy.tideFt, "ft"), "If station reports tide"],
  ]);
}

function renderStations(stations) {
  els.stationList.innerHTML = "";
  if (!stations) {
    renderNotice(els.stationList, "Station metadata unavailable");
    return;
  }
  [
    ["Tide predictions", stations.tide],
    ["Water level", stations.waterLevel],
    ["Water temperature", stations.waterTemp],
    ["Meteorology", stations.met],
    ["Current predictions", stations.currents],
  ].forEach(([type, station]) => {
    const item = document.createElement("article");
    item.className = "station-item";
    if (!station) {
      item.innerHTML = `<div><strong>${escapeHtml(type)}</strong><p class="muted">Unavailable</p></div><span class="station-type">NOAA</span>`;
    } else {
      item.innerHTML = `
        <div>
          <strong>${escapeHtml(station.name)}</strong>
          <p class="muted">${escapeHtml(station.id)} · ${escapeHtml(station.state || "NOAA")} · ${station.distanceNm.toFixed(1)} nautical miles</p>
        </div>
        <span class="station-type">${escapeHtml(type)}</span>
      `;
    }
    els.stationList.appendChild(item);
  });
}

function renderStationMarkers(stations) {
  state.stationLayer.clearLayers();
  if (!stations) return;
  Object.entries(stations).forEach(([key, station]) => {
    if (!station) return;
    const marker = L.circleMarker([station.lat, station.lng], {
      radius: 7,
      color: key === "tide" ? "#0b6f8f" : "#2f7d58",
      weight: 2,
      fillColor: "#ffffff",
      fillOpacity: 0.9,
    }).bindPopup(`<strong>${escapeHtml(station.name)}</strong><br>${escapeHtml(key)} · ${station.distanceNm.toFixed(1)} nm`);
    marker.addTo(state.stationLayer);
  });
}

function renderMetrics(container, metrics) {
  container.innerHTML = "";
  metrics.forEach(([label, value, detail]) => {
    const node = els.metricTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".metric-label").textContent = label;
    node.querySelector(".metric-value").textContent = value ?? "No data";
    node.querySelector(".metric-detail").textContent = detail ?? "";
    container.appendChild(node);
  });
}

function renderNotice(container, text) {
  container.innerHTML = `<article class="metric"><p class="metric-value">${escapeHtml(text)}</p></article>`;
}

function setChart(key, canvas, config) {
  if (!canvas || !window.Chart) return;
  destroyChart(key);
  state.charts[key] = new Chart(canvas, config);
}

function destroyChart(key) {
  if (state.charts[key]) {
    state.charts[key].destroy();
    delete state.charts[key];
  }
}

function destroyAllCharts() {
  Object.keys(state.charts).forEach(destroyChart);
}

function chartOptions({ yTitle = "", legend = true } = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: {
        display: legend,
        position: "bottom",
        labels: { boxWidth: 10, color: "#526171", usePointStyle: true },
      },
      tooltip: {
        backgroundColor: "rgba(24, 32, 40, 0.92)",
        padding: 10,
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#7a8794", maxRotation: 0, autoSkip: true, maxTicksLimit: 7 },
      },
      y: {
        grid: { color: "rgba(216, 222, 217, 0.75)" },
        ticks: { color: "#7a8794" },
        title: { display: Boolean(yTitle), text: displayUnit(yTitle), color: "#7a8794" },
      },
    },
  };
}

function buildWeatherPhrase(current, air) {
  const temp = Number(current.temperature_2m);
  const wind = Number(current.wind_speed_10m);
  const humidity = Number(current.relative_humidity_2m);
  const aqi = Number(air?.us_aqi);
  const words = [];

  if (Number.isFinite(temp)) {
    if (temp >= 90) words.push("Hot");
    else if (temp >= 78) words.push("Warm");
    else if (temp <= 38) words.push("Cold");
    else if (temp <= 55) words.push("Cool");
    else words.push("Comfortable");
  }
  if (Number.isFinite(wind) && wind >= 20) words.push("windy");
  else if (Number.isFinite(wind) && wind >= 10) words.push("breezy");
  if (Number.isFinite(humidity) && humidity >= 80) words.push("humid");
  if (Number.isFinite(aqi) && aqi <= 50) words.push("clean air");

  return `${words.join(", ") || "Live"} conditions`;
}

function buildWeatherSubline(weather, history) {
  const todayHigh = weather?.daily?.temperature_2m_max?.[0];
  const avgHigh = average(history?.daily?.temperature_2m_max);
  if (todayHigh == null || avgHigh == null) return "Forecast loaded; historical comparison is unavailable for this point.";
  const diff = todayHigh - avgHigh;
  const direction = diff >= 0 ? "above" : "below";
  return `Today's high is ${Math.abs(diff).toFixed(1)} °F ${direction} the recent 30-day average.`;
}

function renderRaw() {
  els.rawOutput.textContent = JSON.stringify(state.raw, null, 2);
}

function renderEmpty() {
  els.summary.innerHTML = "";
  resetVisualDashboard("Waiting for location");
  renderNotice(els.weatherGrid, "Waiting for location");
  renderNotice(els.marineGrid, "Waiting for location");
  renderNotice(els.airGrid, "Waiting for location");
  renderNotice(els.noaaGrid, "Waiting for location");
}

function clearDynamicContent() {
  destroyAllCharts();
  resetVisualDashboard("Loading visual story");
  renderNotice(els.weatherGrid, "Loading weather");
  renderNotice(els.marineGrid, "Loading marine");
  renderNotice(els.airGrid, "Loading air quality");
  renderNotice(els.noaaGrid, "Loading NOAA observations");
  els.hourlyStrip.innerHTML = "";
  els.tideList.innerHTML = "";
  els.tideChart.innerHTML = "";
  els.tideChart.classList.remove("is-hidden");
  els.tideRangeNote.textContent = "";
  els.stationList.innerHTML = "";
  els.rawOutput.textContent = "{}";
}

function resetVisualDashboard(message) {
  els.tempOrbValue.textContent = "--";
  els.tempOrbUnit.textContent = "°F";
  els.tempOrb.style.setProperty("--heat", "45%");
  els.visualPhrase.textContent = message;
  els.visualSubline.textContent = "Charts will appear after a location loads.";
  els.insightGrid.innerHTML = "";
  els.tempTrendNote.textContent = "Archive + forecast";
}

function updateMarker(lat, lon, label) {
  state.map.setView([lat, lon], Math.max(state.map.getZoom(), 9), { animate: true });
  if (!state.selectedMarker) {
    state.selectedMarker = L.marker([lat, lon]).addTo(state.map);
  } else {
    state.selectedMarker.setLatLng([lat, lon]);
  }
  state.selectedMarker.bindPopup(`<strong>${escapeHtml(label)}</strong><br>${lat.toFixed(4)}, ${lon.toFixed(4)}`).openPopup();
}

function selectTab(event) {
  const selected = event.currentTarget.dataset.tab;
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === selected));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === selected));
  window.setTimeout(() => {
    Object.values(state.charts).forEach((chart) => chart.resize());
  }, 60);
}

function setStatus(text, mode) {
  els.status.textContent = text;
  els.status.classList.toggle("is-busy", mode === "busy");
  els.status.classList.toggle("is-error", mode === "error");
}

function showError(message) {
  setStatus("Error", "error");
  els.placeTitle.textContent = "Could not load data";
  state.stationLayer.clearLayers();
  destroyAllCharts();
  resetVisualDashboard("No visual data loaded");
  state.raw = { error: message };
  els.summary.innerHTML = "";
  renderNotice(els.weatherGrid, message);
  renderNotice(els.marineGrid, "No data loaded");
  renderNotice(els.airGrid, "No data loaded");
  renderNotice(els.noaaGrid, "No data loaded");
  els.hourlyStrip.innerHTML = "";
  els.tideList.innerHTML = "";
  els.tideChart.innerHTML = "";
  els.stationList.innerHTML = "";
  renderRaw();
}

function parseCoordinates(value) {
  const match = value.match(/^\s*(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;
  const lat = Number(match[1]);
  const lon = Number(match[2]);
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { lat, lon };
}

function withParams(url, params) {
  const target = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") target.searchParams.set(key, value);
  });
  return target.toString();
}

async function fetchJson(url) {
  const response = await fetch(url);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${new URL(url).hostname}`);
  }
  if (!response.ok || data.error) {
    throw new Error(data.reason || data.error?.message || `Request failed: ${response.status}`);
  }
  return data;
}

function valueOrNull(result) {
  return result.status === "fulfilled" ? result.value : null;
}

function dateRange(daysAhead) {
  const beginDate = new Date();
  const endDate = new Date();
  endDate.setDate(beginDate.getDate() + daysAhead);
  return { begin: ymd(beginDate), end: ymd(endDate) };
}

function ymd(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function ymdDash(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shortDate(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function distanceNm(lat1, lon1, lat2, lon2) {
  const earthNm = 3440.065;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return earthNm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function average(values = []) {
  const valid = values.filter((value) => Number.isFinite(Number(value))).map(Number);
  if (!valid.length) return null;
  return valid.reduce((total, value) => total + value, 0) / valid.length;
}

function sum(values = []) {
  return values.filter((value) => Number.isFinite(Number(value))).map(Number).reduce((total, value) => total + value, 0);
}

function max(values = []) {
  const valid = values.filter((value) => Number.isFinite(Number(value))).map(Number);
  return valid.length ? Math.max(...valid) : null;
}

function last(values = [], count) {
  return values.slice(Math.max(0, values.length - count));
}

function signedDiff(value, baseline, unit) {
  if (!Number.isFinite(Number(value)) || !Number.isFinite(Number(baseline))) return "No data";
  const diff = Number(value) - Number(baseline);
  const prefix = diff > 0 ? "+" : "";
  return `${prefix}${diff.toFixed(unit === " in" ? 2 : 1)}${unit}`;
}

function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "0";
  return Number(value).toFixed(Math.abs(Number(value)) >= 10 ? 1 : 2);
}

function format(value, unit = "") {
  if (value === undefined || value === null || value === "" || Number.isNaN(Number(value))) return "No data";
  const number = Number(value);
  const digits = Math.abs(number) >= 100 ? 0 : Math.abs(number) >= 10 ? 1 : 2;
  return `${number.toFixed(digits).replace(/\.0$/, "")}${unit ? ` ${displayUnit(unit)}` : ""}`;
}

function displayUnit(unit) {
  return String(unit).replace("mp/h", "mph");
}

function valueWithUnit(value, unit) {
  if (value === undefined || value === null || Number.isNaN(Number(value))) return "Unavailable";
  return `${Number(value).toFixed(0)} ${unit}`;
}

function formatTime(value) {
  if (!value) return "No timestamp";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function formatNoaaTime(value) {
  if (!value) return "No timestamp";
  return value.replace(" ", " · ");
}

function hourLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { weekday: "short", hour: "numeric" }).format(date);
}

function compass(degrees) {
  if (degrees === undefined || degrees === null || Number.isNaN(Number(degrees))) return "No direction";
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return directions[Math.round(Number(degrees) / 22.5) % 16];
}

function aqiLabel(value) {
  const aqi = Number(value);
  if (!Number.isFinite(aqi)) return "No AQI";
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for sensitive groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very unhealthy";
  return "Hazardous";
}

function stationDetail(station, time) {
  if (!station) return "Station unavailable";
  return `${station.name} · ${station.distanceNm.toFixed(1)} nm${time ? ` · ${formatNoaaTime(time)}` : ""}`;
}

function windDetail(wind, station) {
  const pieces = [];
  if (wind?.dr) pieces.push(wind.dr);
  if (wind?.g) pieces.push(`gust ${wind.g} kn`);
  if (station) pieces.push(`${station.name} · ${station.distanceNm.toFixed(1)} nm`);
  return pieces.join(" · ") || "NOAA wind";
}

function currentValue(currents) {
  const point = currents?.cp?.[0] || currents?.data?.[0];
  if (!point) return null;
  const speed = point.Velocity_Major || point.v || point.speed;
  const type = point.Type || point.type || "";
  return [type, speed ? `${speed} kn` : ""].filter(Boolean).join(" ");
}

function normalizeUsgsSeries(item, location) {
  const source = item.sourceInfo;
  const variable = item.variable;
  const latest = item.values?.[0]?.value?.at(-1);
  const geo = source?.geoLocation?.geogLocation;
  if (!source || !variable || !latest || !geo) return null;
  const lat = Number(geo.latitude);
  const lon = Number(geo.longitude);
  return {
    site: source.siteName || source.siteCode?.[0]?.value || "USGS site",
    label: variable.variableDescription || variable.variableName || "USGS value",
    value: latest.value,
    unit: variable.unit?.unitCode || "",
    time: latest.dateTime,
    distanceNm: distanceNm(location.lat, location.lon, lat, lon),
  };
}

function parseNearestBuoy(text, lat, lon) {
  const rows = text.split("\n").filter((line) => line && !line.startsWith("#"));
  const buoys = rows.map((line) => {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 22) return null;
    const latitude = Number(parts[1]);
    const longitude = Number(parts[2]);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return {
      id: parts[0],
      latitude,
      longitude,
      time: `${parts[3]}-${parts[4]}-${parts[5]}T${parts[6]}:${parts[7]}:00Z`,
      windDirectionDeg: ndbcNumber(parts[8]),
      windSpeedMs: ndbcNumber(parts[9]),
      gustMs: ndbcNumber(parts[10]),
      waveHeightM: ndbcNumber(parts[11]),
      dominantPeriodSec: ndbcNumber(parts[12]),
      averagePeriodSec: ndbcNumber(parts[13]),
      meanWaveDirectionDeg: ndbcNumber(parts[14]),
      pressureHpa: ndbcNumber(parts[15]),
      pressureTendencyHpa: ndbcNumber(parts[16]),
      airTempC: ndbcNumber(parts[17]),
      waterTempC: ndbcNumber(parts[18]),
      dewpointC: ndbcNumber(parts[19]),
      visibilityNm: ndbcNumber(parts[20]),
      tideFt: ndbcNumber(parts[21]),
      distanceNm: distanceNm(lat, lon, latitude, longitude),
    };
  }).filter(Boolean);

  return buoys.sort((a, b) => a.distanceNm - b.distanceNm)[0] || null;
}

function ndbcNumber(value) {
  return value === "MM" ? null : Number(value);
}

function cToF(value) {
  if (!Number.isFinite(Number(value))) return null;
  return Number(value) * 9 / 5 + 32;
}

function msToMph(value) {
  if (!Number.isFinite(Number(value))) return null;
  return Number(value) * 2.236936;
}

function bbox(lat, lon, delta) {
  return [
    clamp(lon - delta, -180, 180).toFixed(4),
    clamp(lat - delta, -90, 90).toFixed(4),
    clamp(lon + delta, -180, 180).toFixed(4),
    clamp(lat + delta, -90, 90).toFixed(4),
  ];
}

function isProbablyUs(lat, lon) {
  return (lat >= 18 && lat <= 72 && lon >= -170 && lon <= -64)
    || (lat >= -15 && lat <= 25 && lon >= 140 && lon <= 180);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

async function copyRaw() {
  await navigator.clipboard.writeText(els.rawOutput.textContent);
  els.copyRaw.textContent = "Copied";
  window.setTimeout(() => {
    els.copyRaw.textContent = "Copy JSON";
  }, 1200);
}
