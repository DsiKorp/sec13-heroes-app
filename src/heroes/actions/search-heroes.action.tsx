import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";
import type { SearchOptions } from "../types/search-options.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (searchOptions: SearchOptions) => {

    const { name, team, category, universe, status, strength } = searchOptions;

    // If no search parameters are provided, return empty array to prevent unnecessary API calls
    // and 400 errors from the API
    if (!name && !team && !category && !universe && !status && !strength) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>('/search', {
        params: { name, team, category, universe, status, strength }
    });

    return data.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    }));
}