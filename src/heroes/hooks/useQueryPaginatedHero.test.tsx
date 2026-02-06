import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { useQueryPaginatedHero } from './useQueryPaginatedHero';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

vi.mock('../actions/get-heroes-by-page.action', () => ({
    getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const tanStackCustomProvider = () => {
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('usePaginatedHero', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useQueryPaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider(),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBe(undefined);
        expect(result.current.data).toBeUndefined();
    });

    test('should return success state with data when API call succeeds', async () => {
        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => useQueryPaginatedHero(1, 6), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, 'all');
    });

    test('should call getHeroesByPageActions with arguments', async () => {
        const mockHeroesData = {
            total: 20,
            pages: 4,
            heroes: [],
        };

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

        const { result } = renderHook(() => useQueryPaginatedHero(2, 16, 'heroesABC'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.status).toBe('success');
        expect(mockGetHeroesByPageAction).toHaveBeenCalled();
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(2, 16, 'heroesABC');
    });
});