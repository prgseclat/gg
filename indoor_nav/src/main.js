import { getMapData, show3dMap } from '@mappedin/mappedin-js';

async function init() {
  const mapData = await getMapData({
    key: 'mik_yeBk0Vf0nNJtpesfu560e07e5',
    secret: 'mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022',
    mapId: '67f3fe1d0b03ee000b42fd65'
  });

  const mapContainer = document.getElementById('app');
  const map = await show3dMap(mapContainer, mapData);
}
init();
