export type Spreader = {
    brand: string;
    model: string;
    getSetting?: (rate: number, sgn: number) => number;
    notes?: string;
  };
  
  export const spreaderDatabase: Spreader[] = [
    {
      brand: "LESCO",
      model: "Broadcast Spreader 80 lb",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 3.75 * rate * modifier;
      },
    },
    {
      brand: "LESCO",
      model: "Broadcast Spreader 50 lb",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 3.25 * rate * modifier;
      },
    },
    {
      brand: "Turfco",
      model: "T3200 Spreader Sprayer",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.25 * rate * modifier;
      },
    },
    {
      brand: "Turfco",
      model: "T5000 Spreader Sprayer",
      notes: "Use dashboard presets: Light, Medium, Heavy",
    },
    {
      brand: "Turfco",
      model: "TriWave 60 Overseeder",
      notes: "Use seed rate chart; no formula",
    },
    {
      brand: "Turfco",
      model: "TriWave 45 Overseeder",
      notes: "Use seed rate chart; no formula",
    },
    {
      brand: "Andersons",
      model: "SR-2000 Rotary",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.1 * Math.pow(rate, 1.2) * modifier;
      },
    },
    {
      brand: "Andersons",
      model: "Model 2000 Rotary",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.1 * Math.pow(rate, 1.2) * modifier;
      },
    },
    {
      brand: "Andersons",
      model: "SSD Drop",
      notes: "Lookup from manual; rate-based gate setting",
    },
    {
      brand: "Andersons",
      model: "LCO-1000 Rotary",
      notes: "Similar to SR-2000; use chart if available",
    },
    {
      brand: "Spyker",
      model: "SPY Series",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 0.85 * rate * modifier + 0.35;
      },
    },
    {
      brand: "Scotts",
      model: "EdgeGuard Mini",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.9 * rate * modifier;
      },
    },
    {
      brand: "Scotts",
      model: "EdgeGuard DLX",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.9 * rate * modifier;
      },
    },
    {
      brand: "Scotts",
      model: "Elite Spreader",
      getSetting: (rate, sgn) => {
        const modifier = sgn <= 130 ? 1.1 : sgn >= 200 ? 0.9 : 1.0;
        return 1.75 * rate * modifier;
      },
    },
    {
      brand: "Gandy",
      model: "Drop Spreaders (All)",
      notes: "Use rate chart; linear scale per model",
    },
    {
      brand: "Lely",
      model: "L1250",
      notes: "Use PTO speed + feedring chart; no formula",
    },
    {
      brand: "Lely",
      model: "L1500",
      notes: "Use PTO speed + feedring chart; no formula",
    },
    {
      brand: "Lely",
      model: "L2010",
      notes: "Use PTO speed + feedring chart; no formula",
    },
    {
      brand: "Lely",
      model: "Centerliner SE/SX",
      notes: "Use cubic ft to lbs conversion + pin setting",
    },
  ];