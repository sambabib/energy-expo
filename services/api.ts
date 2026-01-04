// Simulated API functions with fake delay

import {
  analyticsConsumptionData,
  batteryData,
  co2Saved,
  consumptionData,
  energyFlowData,
  performanceData,
  userData,
} from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchUserData() {
  await delay(300);
  return userData;
}

export async function fetchEnergyFlow() {
  await delay(200);
  return energyFlowData;
}

export async function fetchBatteryStatus() {
  await delay(200);
  return batteryData;
}

export async function fetchConsumption() {
  await delay(250);
  return consumptionData;
}

export async function fetchAnalyticsData() {
  await delay(300);
  return {
    consumption: analyticsConsumptionData,
    performance: performanceData,
    co2Saved,
  };
}
