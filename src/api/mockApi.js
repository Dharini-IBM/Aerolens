import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });

// Mock pothole detection response
mock.onGet("/api/potholes").reply(200, {
  data: [
    { id: 1, lat: 12.97, lng: 77.59, severity: "High" },
    { id: 2, lat: 12.96, lng: 77.58, severity: "Moderate" },
  ],
});

// Mock illegal parking detection
mock.onGet("/api/violations").reply(200, {
  data: [
    { id: "KA05AB1234", location: "Zone A", imageUrl: "/assets/car1.jpg" },
  ],
});

export default axiosInstance;
