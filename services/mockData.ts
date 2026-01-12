// Mock data for the energy app

export const userData = {
  name: 'George',
  email: 'george@email.com',
  initials: 'AL',
};

export const energyFlowData = {
  export: 3.06,
  home: 64,
  produce: 128,
  stored: 2.6,
};

export const batteryData = {
  level: 64,
  timeRemaining: '1h 10 min',
  capacity: 4500,
};

export const consumptionData = [
  { id: '1', name: 'Grid', icon: 'bolt', value: 3.06, unit: 'kW', color: '#ef5350' },
  { id: '2', name: 'Home', icon: 'home', value: 64, unit: 'kW', color: '#66bb6a' },
  { id: '3', name: 'Solar', icon: 'sun-o', value: 128, unit: 'W', color: '#ff7043' },
  { id: '4', name: 'Battery', icon: 'battery-3', value: 2.6, unit: 'kW', color: '#26a69a' },
  { id: '5', name: 'EV', icon: 'car', value: 3.2, unit: 'kWh', color: '#4CAF50' },
];

export const analyticsConsumptionData = [
  { solar: 60, battery: 30, grid: 10 },
  { solar: 55, battery: 30, grid: 15 },
  { solar: 80, battery: 26, grid: 14 },
  { solar: 74, battery: 26, grid: 20 },
  { solar: 100, battery: 0, grid: 0 },
  { solar: 55, battery: 30, grid: 15 },
  { solar: 63, battery: 37, grid: 15 },
];

export const performanceData = {
  energy: [180, 220, 280, 320, 380, 420, 350],
  efficiency: [45, 55, 70, 85, 95, 100, 80],
};

export const co2Saved = 750;

export const scheduledCharges = [
  { id: '1', start: '12:00 AM', end: '06:00 AM', rate: 7000, frequency: 'Everyday', type: 'charge' },
  { id: '2', start: '10:00 PM', end: '11:30 PM', rate: 3500, frequency: 'Everyday', type: 'charge' },
  { id: '3', start: '06:00 PM', end: '09:00 PM', rate: 2000, frequency: 'Weekends', type: 'discharge' },
];

export const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
