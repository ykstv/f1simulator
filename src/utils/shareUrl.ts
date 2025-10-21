import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { Race } from '../types';

interface ScenarioPayload {
  v: number;
  r: Record<string, number[]>;
}

export function encodeScenario(races: Race[]): string {
  const payload: ScenarioPayload = {
    v: 1,
    r: {}
  };

  races.forEach(race => {
    payload.r[race.id] = race.positions;
  });

  const json = JSON.stringify(payload);
  const compressed = compressToEncodedURIComponent(json);

  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('s', compressed);

  return url.toString();
}

export function decodeScenario(currentSchedule: Race[]): Race[] | null {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('s');

  if (!encoded) {
    return null;
  }

  try {
    const json = decompressFromEncodedURIComponent(encoded);
    if (!json) {
      return null;
    }

    const payload: ScenarioPayload = JSON.parse(json);

    if (payload.v !== 1) {
      return null;
    }

    const updatedRaces = currentSchedule.map(race => {
      const positions = payload.r[race.id];
      if (positions && Array.isArray(positions) && positions.length === 3) {
        return { ...race, positions };
      }
      return race;
    });

    return updatedRaces;
  } catch (error) {
    console.error('Failed to decode scenario:', error);
    return null;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
