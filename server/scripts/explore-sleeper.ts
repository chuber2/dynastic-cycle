const fetcher = async (url: string | URL): Promise<unknown> => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  const data = await response.json();
  return data;
}

const user_id = process.env.SLEEPER_USER_ID
if(!user_id) {
  throw new Error('Sleeper USER_ID not set in .env')
}

const league_id = process.env.SLEEPER_DYNASTY_LEAGUE_ID
if(!league_id) {
  throw new Error('Sleeper dynasty league id not set in env')
}

const userRes = await fetcher(`https://api.sleeper.app/v1/user/${user_id}`);

const leaguesRes = await fetcher(`https://api.sleeper.app/v1/user/${user_id}/leagues/nfl/2026`)

const dynastyRes = await fetcher(`https://api.sleeper.app/v1/league/${league_id}`)

const rostersRes = await fetcher(`https://api.sleeper.app/v1/league/${league_id}/rosters`)

console.log(rostersRes)

export { };

