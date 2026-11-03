# Diwali Air and Darshan

A small, mobile-friendly Diwali website for exploring city-level air-quality estimates, reading sourced safety guidance and viewing temple recordings.

[Open the demo](https://yashrajpge.github.io/diwali-air-darshan/?v=7db88ed)

## What it does

- Covers 56 Indian cities, with Pune and Latur first.
- Shows modelled PM2.5 and PM10 estimates and a three-day PM2.5 graph.
- Provides illustrated, sourced precautions and a manual Indian AQI category selector.
- Includes specific recordings from official temple channels in embedded players.
- Offers an optional, experimental on-device AI explanation of a sourced safety card.

## Know the limits

- Air values come from the CAMS model through Open-Meteo. They are not CPCB station readings or the Indian AQI. The global model uses a grid of about 45 km and can differ from local conditions.
- Estimates refresh when a city is selected or the page is reloaded, not continuously. Missing or stale data is shown as unavailable.
- The precautions tool requires the user to supply an AQI category, date and source. It does not calculate Indian AQI from the model estimates.
- Temple videos are recordings, not verified live feeds. Playback remains unconfirmed and may be restricted by YouTube. Siddhivinayak and Shirdi are marked unavailable.
- AI answer generation has not been verified. It requires a compatible device and an initial download of roughly 200 MB. The original advice stays visible; generated text is not official advice and can be wrong.
- This site does not attribute pollution to crackers or give a safe number of crackers. Safety information is general, not medical advice or permission to use fireworks. Check local rules.

## Built with

HTML, CSS and JavaScript in a single `index.html` file, hosted on GitHub Pages. Air estimates use Open-Meteo; optional AI uses WebLLM. There is no build step.

To run locally, serve the repository with an HTTP server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Internet access is needed for estimates, video players and the optional model download.

## Sources and usage

- [Open-Meteo air-quality documentation](https://open-meteo.com/en/docs/air-quality-api)
- [Copernicus Atmosphere Monitoring Service](https://atmosphere.copernicus.eu/)
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) for the attributed air data
- [Open-Meteo terms](https://open-meteo.com/en/terms)
- Safety sources, including CPCB and Indian health and fire-safety guidance, are linked in the website's Safety tab.

This is a non-commercial test with no ads. The free air-data service has usage limits; availability is not guaranteed. The data licence does not grant a licence to third-party videos or other source material.
