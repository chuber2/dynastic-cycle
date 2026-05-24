export const SLEEPER_BASE_API = 'https://api.sleeper.app/v1';
export const SLEEPER_PLAYERS_API = 'https://api.sleeper.app/players/nfl';

export const fetcher = async <T>(url: string | URL): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const data = await response.json();
  return data;
};
