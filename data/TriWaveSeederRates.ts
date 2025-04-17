// TriWaveSeederRates.ts

export type SeedingRateEntry = {
    setting: number;
    rate: number;
  };
  
  export type SeedVarietyRateMap = {
    [variety: string]: SeedingRateEntry[];
  };
  
  export const triWaveRates: SeedVarietyRateMap = {
    'Bentgrass - Penncross': [
      { setting: 5, rate: 0.25 },
      { setting: 10, rate: 0.65 },
      { setting: 15, rate: 1.4 },
      { setting: 20, rate: 2.2 },
      { setting: 25, rate: 3.0 },
      { setting: 30, rate: 3.2 },
      { setting: 35, rate: 5.4 },
      { setting: 40, rate: 7.1 },
      { setting: 45, rate: 8.3 },
      { setting: 50, rate: 10.9 },
      { setting: 55, rate: 11.8 },
      { setting: 60, rate: 13.7 },
      { setting: 65, rate: 13.7 },
      { setting: 70, rate: 13.7 },
      { setting: 75, rate: 13.7 },
      { setting: 80, rate: 13.7 },
    ],
    'Bermuda - Hulled': [
      { setting: 5, rate: 0.5 },
      { setting: 10, rate: 1.3 },
      { setting: 15, rate: 2.2 },
      { setting: 20, rate: 3.4 },
      { setting: 25, rate: 5.0 },
      { setting: 30, rate: 6.5 },
      { setting: 35, rate: 8.4 },
      { setting: 40, rate: 10.4 },
      { setting: 45, rate: 12.5 },
      { setting: 50, rate: 14.9 },
      { setting: 55, rate: 17.5 },
      { setting: 60, rate: 20.9 },
    ],
    // Add remaining seed types from chart here...
  };
  
  export function getTriWaveSetting(targetRate: number, table: SeedingRateEntry[]): number | null {
    for (let i = 0; i < table.length - 1; i++) {
      const current = table[i];
      const next = table[i + 1];
      if (targetRate >= current.rate && targetRate <= next.rate) {
        const ratio = (targetRate - current.rate) / (next.rate - current.rate);
        return current.setting + ratio * (next.setting - current.setting);
      }
    }
    return null;
  }