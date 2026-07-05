export default async function handler(request, response) {
  try {
    const upstream = await fetch("https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt");
    if (!upstream.ok) {
      response.status(upstream.status).json({ error: `NDBC request failed: ${upstream.status}` });
      return;
    }

    const text = await upstream.text();
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.status(200).send(text);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}
