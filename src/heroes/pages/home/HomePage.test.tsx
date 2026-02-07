import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import { MemoryRouter } from 'react-router';
import { useQueryPaginatedHero } from '@/heroes/hooks/useQueryPaginatedHero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteHeroContextProvider } from '@/heroes/context/FavoriteHeroContext';

// Mock the hook
vi.mock('@/heroes/hooks/useQueryPaginatedHero');

// Mock the return value
const mockUsePaginatedHero = vi.mocked(useQueryPaginatedHero);

// Set default return value
mockUsePaginatedHero.mockReturnValue({
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true,
} as unknown as ReturnType<typeof useQueryPaginatedHero>);

// Create a new query client for each test
const queryClient = new QueryClient();

// initialEntries is the URL that the app will start at
const renderHomePage = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <FavoriteHeroContextProvider>
                <QueryClientProvider client={queryClient}>
                    <HomePage />
                </QueryClientProvider>
            </FavoriteHeroContextProvider>
        </MemoryRouter>
    );
};

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('should render HomePage with default values', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should call usePaginatedHero with default values', () => {
        renderHomePage();
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('should call usePaginatedHero with custom query params', () => {
        renderHomePage(['/?page=2&limit=10&category=villains']);
        expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'villains');
    });

    test('should called usePaginatedHero with default page and same limit on tab clicked', () => {
        renderHomePage(['/?tab=favorites&page=2&limit=10']);

        // const [allTabs, favoriteTab, heroesTab, villainsTab] = screen.getAllByRole('tab');
        const [, , , villainsTab] = screen.getAllByRole('tab');

        //screen.debug(villainsTab);
        fireEvent.click(villainsTab);
        //screen.debug(villainsTab);

        expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
    });
});