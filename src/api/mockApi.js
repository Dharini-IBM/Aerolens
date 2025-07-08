import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create axios instance
const axiosInstance = axios.create();

// Attach mock adapter
const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

// Mock data
const potholeData = [
  { id: 1, lat: 12.9716, lng: 77.5946, severity: "High" },
  { id: 2, lat: 12.2958, lng: 76.6394, severity: "Moderate" },
  { id: 3, lat: 13.0827, lng: 80.2707, severity: "Low" }
];

const violationData = [
  { id: 1, plate: "KA01AB1234", zone: "Zone A", imageUrl: "/assets/car1.jpg" },
  { id: 2, plate: "DL03XY9876", zone: "Zone B", imageUrl: "/assets/car2.jpg" }
];

const routeSuggestions = [
  { id: 1, route: "Main Street → Elm Street → Park Avenue", congestion: "Low" },
  { id: 2, route: "Maple Ave → 5th Cross → Ring Road", congestion: "Moderate" }
];

// Pothole Detection Endpoint
mock.onGet("/api/potholes").reply(200, potholeData);

// Parking Violations Endpoint
mock.onGet("/api/violations").reply(200, violationData);

// Traffic Optimization Endpoint
mock.onGet("/api/routes").reply(200, routeSuggestions);

// Export the mock axios instance
export default axiosInstance;
