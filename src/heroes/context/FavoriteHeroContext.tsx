import { createContext, useState, useEffect, type PropsWithChildren } from "react";
import * as z from 'zod';

import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContextType {
    // State
    favorites: Hero[];
    favoriteCount: number;

    // Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// export const FavoriteHeroContext = createContext<FavoriteHeroContextType>({
export const FavoriteHeroContext = createContext({} as FavoriteHeroContextType);

// Zod Schema para validar Hero
const HeroSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    alias: z.string(),
    powers: z.array(z.string()),
    description: z.string(),
    strength: z.number(),
    intelligence: z.number(),
    speed: z.number(),
    durability: z.number(),
    team: z.string(),
    image: z.string(),
    firstAppearance: z.string(),
    status: z.string(),
    category: z.string(),
    universe: z.string(),
});

const HeroesArraySchema = z.array(HeroSchema);

const getFavoritesFromLocalStorage = (): Hero[] => {
    try {
        const storedFavorites = localStorage.getItem('favorite-heroes');

        if (!storedFavorites) {
            return [];
        }

        // Validar con Zod
        const result = HeroesArraySchema.safeParse(JSON.parse(storedFavorites));

        if (!result.success) {
            console.error('Error al validar favoritos desde localStorage:', result.error);
            localStorage.removeItem('favorite-heroes');
            return [];
        }

        return result.data;
    } catch (error) {
        console.error('Error al parsear favoritos desde localStorage:', error);
        // Si hay error de parsing, limpiamos el localStorage y retornamos array vacío
        localStorage.removeItem('favorite-heroes');
        return [];
    }
}

// higher order component
export const FavoriteHeroContextProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if (heroExist) {
            setFavorites(favorites.filter(h => h.id !== hero.id));
            return;
        }

        setFavorites([...favorites, hero]);
    }

    const isFavorite = (hero: Hero) => favorites.some(h => h.id === hero.id);

    // Sincronizar con localStorage cada vez que cambien los favoritos
    useEffect(() => {
        localStorage.setItem('favorite-heroes', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext.Provider
            value={{
                // State
                favorites: favorites,
                favoriteCount: favorites.length,
                // Methods
                isFavorite: isFavorite,
                toggleFavorite: toggleFavorite,
            }}
        >
            {children}
        </FavoriteHeroContext.Provider>
    )
}
