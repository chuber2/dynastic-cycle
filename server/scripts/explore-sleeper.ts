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

const userRes = await fetcher(`https://api.sleeper.app/v1/user/${user_id}`);
console.log(userRes)

export { };

