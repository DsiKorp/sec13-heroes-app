import { describe, expect, test, vi } from 'vitest';
import { appRouter } from './app.router';
import { render, screen } from '@testing-library/react';
import {
    createMemoryRouter,
    Outlet,
    RouterProvider,
    useParams,
} from 'react-router';

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    HeroesLayout: () => (
        <div data-testid="heroes-layout">
            <Outlet />
        </div>
    ),
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
    HomePage: () => <div data-testid="home-page"></div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    HeroPage: () => {
        const { idSlug = '' } = useParams();

        return <div data-testid="hero-page">HeroPage - {idSlug}</div>;
    },
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    // default por que esta exportado export default SearchPage; ya que es lazy loading
    default: () => <div data-testid="search-page"></div>,
}));

vi.mock('@/admin/pages/AdminPage', () => ({
    // default por que esta exportado export default AdminPage; ya que es lazy loading
    default: () => <div data-testid="admin-page"></div>,
}));

describe('appRouter', () => {
    test('should be configured as expected', () => {
        //console.log(appRouter.routes)
        expect(appRouter.routes).toMatchSnapshot();
    });

    test('should render home page at root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);
        //screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render hero page at /heroes/:idSlug path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman'],
        });
        render(<RouterProvider router={router} />);

        //screen.debug();
        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
    });

    test('should render search page at /search path', async () => {
        // /search es un lazy loading
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search'],
        });

        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();
    });

    test('should redirect to home page for unknown routes', () => {
        // path: "*",
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/otra-pagina-rara'],
        });

        render(<RouterProvider router={router} />);
        //screen.debug();
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render admin page at /admin path', async () => {
        // /admin es un lazy loading
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/admin'],
        });

        render(<RouterProvider router={router} />);
        screen.debug();
        expect(await screen.findByTestId('admin-page')).toBeDefined();
    });
});