import { describe, expect, test, beforeEach } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { searchHeroesAction } from './search-heroes.action';
import { heroApi } from '../api/hero.api';

const BASE_URL = import.meta.env.VITE_API_URL;

describe('searchHeroesAction', () => {
    const heroesApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroesApiMock.reset();
    });

    test('should return empty array when no search parameters are provided', async () => {
        const result = await searchHeroesAction({});

        expect(result).toStrictEqual([]);
        expect(heroesApiMock.history.get.length).toBe(0);
    });

    test('should return heroes with complete image URLs when searching by name', async () => {
        heroesApiMock.onGet('/search').reply(200, [
            { id: '1', name: 'Batman', image: 'batman.jpg' },
            { id: '2', name: 'Batgirl', image: 'batgirl.jpg' },
        ]);

        const result = await searchHeroesAction({ name: 'bat' });

        expect(result).toStrictEqual([
            { id: '1', name: 'Batman', image: `${BASE_URL}/images/batman.jpg` },
            { id: '2', name: 'Batgirl', image: `${BASE_URL}/images/batgirl.jpg` },
        ]);
    });

    test('should call the API with correct params when searching by name', async () => {
        heroesApiMock.onGet('/search').reply(200, []);
        heroesApiMock.resetHistory();

        await searchHeroesAction({ name: 'superman' });

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({
            name: 'superman',
            team: undefined,
            category: undefined,
            universe: undefined,
            status: undefined,
            strength: undefined,
        });
    });

    test('should call the API with multiple search parameters', async () => {
        heroesApiMock.onGet('/search').reply(200, []);
        heroesApiMock.resetHistory();

        await searchHeroesAction({
            name: 'man',
            team: 'Liga de la Justicia',
            category: 'Hero',
            universe: 'DC',
        });

        const params = heroesApiMock.history.get[0].params;
        expect(params).toStrictEqual({
            name: 'man',
            team: 'Liga de la Justicia',
            category: 'Hero',
            universe: 'DC',
            status: undefined,
            strength: undefined,
        });
    });

    test('should call the API when only team is provided', async () => {
        heroesApiMock.onGet('/search').reply(200, []);
        heroesApiMock.resetHistory();

        await searchHeroesAction({ team: 'Avengers' });

        expect(heroesApiMock.history.get.length).toBe(1);
        expect(heroesApiMock.history.get[0].params.team).toBe('Avengers');
    });

    test('should call the API when only strength is provided', async () => {
        heroesApiMock.onGet('/search').reply(200, []);
        heroesApiMock.resetHistory();

        await searchHeroesAction({ strength: '8' });

        expect(heroesApiMock.history.get.length).toBe(1);
        expect(heroesApiMock.history.get[0].params.strength).toBe('8');
    });

    test('should return empty array and not call API when all parameters are undefined', async () => {
        const result = await searchHeroesAction({
            name: undefined,
            team: undefined,
            category: undefined,
            universe: undefined,
            status: undefined,
            strength: undefined,
        });

        expect(result).toStrictEqual([]);
        expect(heroesApiMock.history.get.length).toBe(0);
    });
});
