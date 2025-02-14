import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY;

const baseURL = 'http://localhost:3000/api/'; // Proxy server URL

function sendHttpRequest(endpoint: string): Promise<any> {
    const url = `${baseURL}${endpoint}`;
    return new Promise((resolve, reject) => {
        overwolf.web.sendHttpRequest(
            url,
            overwolf.web.enums.HttpRequestMethods.GET,
            [], // No headers needed (handled by the proxy)
            '',
            (response) => {
                resolve(response)
            }
        );
    });
}

export async function getPlayerInfo(name: string): Promise<any> {
    await sendHttpRequest(`player/${name}/update`)
    const player_info = await sendHttpRequest(`player/${name}`);
    return player_info['data']

}

export async function getPlayerMostPlayedHeroes(name: string): Promise<Object[]> {
    try {
        const playerInfo = await getPlayerInfo(name);
        let infoParsed = JSON.parse(playerInfo);
        let heroes = infoParsed.heroes_ranked;

        const heroStats = heroes.map(hero => {
            const totalMatches = hero.matches;
            const winRate = totalMatches > 0 ? (hero.wins / totalMatches) : 0;

            return {
                heroName: hero.hero_name,
                winRate: `${winRate*100}%`,
                totalMatches: totalMatches
            };
        });


        heroStats.sort((a, b) => b.totalMatches - a.totalMatches);

        return heroStats;
    } catch (error) {
        return [{'error fetching players': error}];
    }
}