import { use } from 'react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    FavoriteHeroContext,
    FavoriteHeroContextProvider,
} from './FavoriteHeroContext';
import type { Hero } from '../types/hero.interface';


const mockHero: Hero = {
    id: '1',
    name: 'batman',
    slug: 'bruce-wayne',
    alias: 'Batman',
    powers: ['Inteligencia', 'Artes marciales', 'Tecnología'],
    description: 'El Caballero Oscuro de Gotham',
    strength: 7,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: 'Liga de la Justicia',
    image: 'batman.jpg',
    firstAppearance: '1939',
    status: 'Active',
    category: 'Hero',
    universe: 'DC',
};

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
};

// sobreescribimos el localStorage global
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

const TestComponent = () => {
    const { favoriteCount, favorites, isFavorite, toggleFavorite } =
        use(FavoriteHeroContext);

    return (
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>

            <div data-testid="favorite-list">
                {favorites.map((hero) => (
                    <div key={hero.id} data-testid={`hero-${hero.id}`}>
                        {hero.name}
                    </div>
                ))}
            </div>

            <button
                data-testid="toggle-favorite"
                onClick={() => toggleFavorite(mockHero)}
            >
                Toggle Favorite
            </button>
            <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
        </div>
    );
};

const renderContextTest = () => {
    return render(
        <FavoriteHeroContextProvider>
            <TestComponent />
        </FavoriteHeroContextProvider>
    );
};

describe('FavoriteHeroContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should initialize with default values', () => {
        //console.log('Local Storage')
        //console.log(localStorage);
        renderContextTest();
        //screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        //screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'favorite-heroes',
            '[{\"id\":\"1\",\"name\":\"batman\",\"slug\":\"bruce-wayne\",\"alias\":\"Batman\",\"powers\":[\"Inteligencia\",\"Artes marciales\",\"Tecnología\"],\"description\":\"El Caballero Oscuro de Gotham\",\"strength\":7,\"intelligence\":10,\"speed\":6,\"durability\":7,\"team\":\"Liga de la Justicia\",\"image\":\"batman.jpg\",\"firstAppearance\":\"1939\",\"status\":\"Active\",\"category\":\"Hero\",\"universe\":\"DC\"}]'
        );

        //console.log(localStorage);
    });

    test('should remove hero from favorites when toggleFavorite is called', () => {
        localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

        renderContextTest();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('batman');

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();

        expect(localStorageMock.setItem).toHaveBeenCalled();
        expect(localStorageMock.setItem).toHaveBeenCalledWith('favorite-heroes', '[]');
    });
});