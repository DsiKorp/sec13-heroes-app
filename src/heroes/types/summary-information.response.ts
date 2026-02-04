import type { Hero } from "./hero.interface";

export interface SumaryInformationResponse {
    totalHeroes: number;
    strongestHero: Hero;
    smartestHero: Hero;
    heroCount: number;
    villainCount: number;
}


