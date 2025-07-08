import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create axios instance
const axiosInstance = axios.create();

// Attach mock adapter
const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

// Mock data
const potholeData = [
  {
    id: 1,
    lat: 12.9351,
    lng: 77.6142,
    severity: 'High',
    timestamp: '2025-07-08T10:24:00Z',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Muchos_baches_inundados.jpg',
  },
  {
    id: 2,
    lat: 12.9345,
    lng: 77.6101,
    severity: 'Medium',
    timestamp: '2025-07-08T09:10:00Z',
    imageUrl: 'https://media.istockphoto.com/id/183851840/photo/bad-repair-pothole-in-road-t-junction-suffers-frost-damage.jpg?s=1024x1024&w=is&k=20&c=clP3ardTZgLV-QiMaAuDF50EIUzpsBWDRslcKaYg1fc=',
  },
  {
    id: 3,
    lat: 12.9311,
    lng: 77.6157,
    severity: 'Low',
    timestamp: '2025-07-07T18:52:00Z',
    imageUrl: 'https://media.istockphoto.com/id/947936404/photo/pot-hole-on-city-street-a-hazard-to-motorists.jpg?s=1024x1024&w=is&k=20&c=ILx9Xj6CTFk1mBSmSlr2M7wdjS_XL5DP151UcPb0oHU=',
  },
  {
    id: 4,
    lat: 12.9382,
    lng: 77.6188,
    severity: 'High',
    timestamp: '2025-07-08T11:45:00Z',
    imageUrl: 'https://media.istockphoto.com/id/502561495/photo/pot-holed-road.jpg?s=1024x1024&w=is&k=20&c=XrGYa8BwBP8U96-00tfCcsZ55aXqRfMD4BYv84ze688=',
  },
  {
    id: 5,
    lat: 12.9367,
    lng: 77.6123,
    severity: 'Medium',
    timestamp: '2025-07-08T08:30:00Z',
    imageUrl: 'https://media.istockphoto.com/id/930733334/photo/old-road-potholes-holes-outside-city-autumn-weather-hdr.jpg?s=1024x1024&w=is&k=20&c=zERfIYX_SoKBYRvbk2FJk3TzUql1Mx3JJHQACCxfRTg=',
  },
  {
    id: 6,
    lat: 12.9333,
    lng: 77.6172,
    severity: 'Low',
    timestamp: '2025-07-07T17:20:00Z',
    imageUrl: 'https://media.istockphoto.com/id/157743690/photo/dangerous-pot-hole-on-the-road.jpg?s=1024x1024&w=is&k=20&c=p1DDJJvGS4FpMYTWINj-8Qbp_M387SjuRBnCnNaUCZ0=',
  },
  {
    id: 7,
    lat: 12.9398,
    lng: 77.6199,
    severity: 'Low',
    timestamp: '2025-07-08T12:30:00Z',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Vddj-2.jpg',
  },
  {
    id: 8,
    lat: 12.9325,
    lng: 77.6118,
    severity: 'Low',
    timestamp: '2025-07-08T10:55:00Z',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Lfds-1.jpg',
  },
  {
    id: 9,
    lat: 12.9309,
    lng: 77.6164,
    severity: 'Low',
    timestamp: '2025-07-07T16:10:00Z',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Lcb-1.jpg/250px-Lcb-1.jpg',
  },
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
