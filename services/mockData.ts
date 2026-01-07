// Mock data for the energy app

export const userData = {
  name: 'Alex',
  email: 'alex@email.com',
  initials: 'AL',
};

export const energyFlowData = {
  export: 1.5,
  home: 64,
  produce: 3.65,
  stored: 129,
};

export const batteryData = {
  level: 64,
  timeRemaining: '1h 10 min',
  capacity: 4500,
};

export const consumptionData = [
  { id: '1', name: 'Car', icon: 'car', value: 3.2, color: '#4CAF50' },
  { id: '2', name: 'Electronics', icon: 'television', value: 1.8, color: '#FF9800' },
  { id: '3', name: 'AC', icon: 'snowflake-o', value: 4.5, color: '#2196F3' },
  { id: '4', name: 'Lights', icon: 'lightbulb-o', value: 0.8, color: '#FFC107' },
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
  { id: '1', start: '12:00 AM', end: '06:00 AM', rate: 7000, frequency: 'Everyday' },
  { id: '2', start: '10:00 PM', end: '11:30 PM', rate: 3500, frequency: 'Everyday' },
];
