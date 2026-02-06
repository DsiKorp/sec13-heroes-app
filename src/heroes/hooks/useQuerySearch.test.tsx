import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useQuerySearch } from './useQuerySearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { searchHeroesAction } from '../actions/search-heroes.action';
import type { Hero } from '../types/hero.interface';

vi.mock('../actions/search-heroes.action', () => ({
    searchHeroesAction: vi.fn(),
}));

const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

const tanStackCustomProvider = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useQuerySearch', () => {
    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useQuerySearch('batman'), {
            wrapper: tanStackCustomProvider(),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeUndefined();
    });

    test('should return success state with data when search succeeds', async () => {
        const mockHeroes = [
            { id: '1', name: 'Batman', image: 'batman.jpg' },
            { id: '2', name: 'Batgirl', image: 'batgirl.jpg' },
        ] as Hero[];

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        const { result } = renderHook(() => useQuerySearch('bat'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.isError).toBe(false);
        expect(result.current.data).toStrictEqual(mockHeroes);
        expect(mockSearchHeroesAction).toHaveBeenCalledWith({ name: 'bat', strength: undefined });
    });

    test('should call searchHeroesAction with name and strength parameters', async () => {
        mockSearchHeroesAction.mockResolvedValue([]);

        const { result } = renderHook(() => useQuerySearch('superman', '10'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(mockSearchHeroesAction).toHaveBeenCalledWith({ name: 'superman', strength: '10' });
    });

    test('should return error state when search fails', async () => {
        const mockError = new Error('Search failed');
        mockSearchHeroesAction.mockRejectedValue(mockError);

        const { result } = renderHook(() => useQuerySearch('unknown'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });

        expect(result.current.error).toBeDefined();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error?.message).toBe('Search failed');
    });

    test('should return empty array when no results found', async () => {
        mockSearchHeroesAction.mockResolvedValue([]);

        const { result } = renderHook(() => useQuerySearch('nonexistent'), {
            wrapper: tanStackCustomProvider(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toStrictEqual([]);
    });
});
