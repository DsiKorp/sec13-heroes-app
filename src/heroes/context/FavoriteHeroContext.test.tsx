import { use } from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    FavoriteHeroContext,
    FavoriteHeroContextProvider,
} from './FavoriteHeroContext';
import type { Hero } from '../types/hero.interface';

const mockHero: Hero = {
    id: '1',
    name: 'Bruce Wayne',
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

// Componente de prueba que usa el contexto
const TestComponent = () => {
    // Se toma todo el comportamiento del contexto FavoriteHeroContext
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
        localStorage.clear();
    });

    test('should initialize with default values', () => {
        //render(<FavoriteHeroContextProvider />)
        renderContextTest();
        //screen.debug();

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('favorite-list').children.length).toBe(0);
    });

    test('should add hero to favorites when toggleFavorite is called with new Hero', () => {
        renderContextTest();
        screen.debug();
        const button = screen.getByTestId('toggle-favorite');

        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('Bruce Wayne');
        expect(localStorage.getItem('favorite-heroes')).toBe(JSON.stringify([mockHero]));
    });

    test('should remove hero from favorites when toggleFavorite is called', () => {
        localStorage.setItem('favorite-heroes', JSON.stringify([mockHero]));

        renderContextTest();
        screen.debug();
        expect(screen.getByTestId('favorite-count').textContent).toBe('1');
        expect(screen.getByTestId('is-favorite').textContent).toBe('true');
        expect(screen.getByTestId('hero-1').textContent).toBe('Bruce Wayne');

        const button = screen.getByTestId('toggle-favorite');
        fireEvent.click(button);

        expect(screen.getByTestId('favorite-count').textContent).toBe('0');
        expect(screen.getByTestId('is-favorite').textContent).toBe('false');
        expect(screen.queryByTestId('hero-1')).toBeNull();
        screen.debug();
    });
});