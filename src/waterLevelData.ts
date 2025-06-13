// Water level data over 100,000 years
// Based on paleoclimatic data and sea level reconstructions

export interface WaterLevelData {
  year: number; // Years ago (0 = present)
  seaLevel: number; // Meters relative to present day
  temperature: number; // Temperature anomaly in °C
  period: string; // Geological/climatic period name
}

export const waterLevelHistory: WaterLevelData[] = [
  // Present day
  { year: 0, seaLevel: 0, temperature: 0, period: "Present Day" },
  
  // Little Ice Age
  { year: 500, seaLevel: -0.2, temperature: -0.5, period: "Little Ice Age" },
  
  // Medieval Warm Period
  { year: 1000, seaLevel: 0.1, temperature: 0.3, period: "Medieval Warm Period" },
  
  // Late Holocene
  { year: 2000, seaLevel: -1, temperature: -0.2, period: "Late Holocene" },
  { year: 4000, seaLevel: -2, temperature: -0.3, period: "Mid Holocene" },
  { year: 6000, seaLevel: -4, temperature: -0.5, period: "Holocene Optimum" },
  { year: 8000, seaLevel: -8, temperature: -1, period: "Early Holocene" },
  
  // Younger Dryas
  { year: 11000, seaLevel: -35, temperature: -3, period: "Younger Dryas" },
  { year: 12000, seaLevel: -45, temperature: -4, period: "Younger Dryas" },
  
  // Last Glacial Maximum
  { year: 15000, seaLevel: -85, temperature: -6, period: "Last Glacial Maximum" },
  { year: 18000, seaLevel: -120, temperature: -8, period: "Last Glacial Maximum" },
  { year: 21000, seaLevel: -125, temperature: -8.5, period: "Last Glacial Maximum" },
  
  // Late Glacial Period
  { year: 25000, seaLevel: -110, temperature: -7, period: "Late Glacial" },
  { year: 30000, seaLevel: -95, temperature: -6, period: "Late Glacial" },
  { year: 35000, seaLevel: -80, temperature: -5, period: "Late Glacial" },
  
  // Mid-Glacial Period
  { year: 40000, seaLevel: -70, temperature: -4, period: "Mid Glacial" },
  { year: 45000, seaLevel: -60, temperature: -3.5, period: "Mid Glacial" },
  { year: 50000, seaLevel: -55, temperature: -3, period: "Mid Glacial" },
  
  // Early Glacial Period
  { year: 55000, seaLevel: -45, temperature: -2.5, period: "Early Glacial" },
  { year: 60000, seaLevel: -35, temperature: -2, period: "Early Glacial" },
  
  // Last Interglacial (Eemian)
  { year: 70000, seaLevel: -25, temperature: -1, period: "Glacial Inception" },
  { year: 80000, seaLevel: -15, temperature: 0, period: "Late Eemian" },
  { year: 90000, seaLevel: -5, temperature: 1, period: "Mid Eemian" },
  { year: 100000, seaLevel: 2, temperature: 2, period: "Eemian Interglacial" },
];

export function interpolateWaterLevel(targetYear: number): WaterLevelData {
  // Find the two closest data points
  const sortedData = [...waterLevelHistory].sort((a, b) => a.year - b.year);
  
  if (targetYear <= sortedData[0].year) {
    return sortedData[0];
  }
  
  if (targetYear >= sortedData[sortedData.length - 1].year) {
    return sortedData[sortedData.length - 1];
  }
  
  for (let i = 0; i < sortedData.length - 1; i++) {
    const current = sortedData[i];
    const next = sortedData[i + 1];
    
    if (targetYear >= current.year && targetYear <= next.year) {
      const ratio = (targetYear - current.year) / (next.year - current.year);
      
      return {
        year: targetYear,
        seaLevel: current.seaLevel + (next.seaLevel - current.seaLevel) * ratio,
        temperature: current.temperature + (next.temperature - current.temperature) * ratio,
        period: ratio < 0.5 ? current.period : next.period
      };
    }
  }
  
  return sortedData[0];
}

export function getColorFromSeaLevel(seaLevel: number): string {
  // Color mapping based on sea level
  if (seaLevel >= 0) {
    // Above current sea level - warmer colors (red/orange)
    const intensity = Math.min(seaLevel / 10, 1);
    return `hsl(${10 - intensity * 10}, 80%, ${50 + intensity * 20}%)`;
  } else {
    // Below current sea level - cooler colors (blue/cyan)
    const intensity = Math.min(Math.abs(seaLevel) / 125, 1);
    return `hsl(${200 + intensity * 40}, ${60 + intensity * 30}%, ${70 - intensity * 30}%)`;
  }
}