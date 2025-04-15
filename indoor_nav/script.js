import { getMapData, show3dMap } from "https://cdn.skypack.dev/@mappedin/mappedin-js";

const MAP_ID = "67f3fe1d0b03ee000b42fd65";
const KEY = "mik_yeBk0Vf0nNJtpesfu560e07e5";
const SECRET = "mis_2g9ST8ZcSFb5R9fPnsvYhrX3RyRwPtDGbMGweCYKEq385431022";

async function initMap() {
  const container = document.getElementById("map-container");

  const mapData = await getMapData({
    key: KEY,
    secret: SECRET,
    mapId: MAP_ID,
  });

  const map = await show3dMap(container, mapData);
  console.log("Map Loaded");

  // Show all labels
  map.Labels.all();

  // Add a simulated blue dot
  const dot = map.Markers.create({
    position: { latitude: 43.6532, longitude: -79.3832 },
    color: "blue",
    radius: 0.5,
  });

  // Simulate movement
  let lat = 43.6532, lng = -79.3832;
  setInterval(() => {
    lat += 0.00001;
    lng += 0.00001;
    dot.move({ latitude: lat, longitude: lng });

    // Simulated "proximity" check
    if (lat >= 43.65325) {
      sendNotification("You're near the lab!");
    }
  }, 3000);
}

initMap();

// Push notification
function sendNotification(message) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(reg => {
      reg?.showNotification("Indoor Nav Alert", {
        body: message,
        icon: "./assets/icon.png"
      });
    });
  }
}

// Ask for permission
if ("Notification" in window && navigator.serviceWorker) {
  navigator.serviceWorker.register("service-worker.js");
  Notification.requestPermission();
}
