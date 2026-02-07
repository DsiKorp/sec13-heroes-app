import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';
import { CustomBreadcrumbs } from './CustomBreadcrumbs';


describe('CustomBreadcrumbs', () => {
    test('should render breadcrumbs with home link', () => {
        render(
            <MemoryRouter>
                <CustomBreadcrumbs currentPage="Heroes" />
            </MemoryRouter>
        );

        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });

    test('should render breadcrumbs with current page', () => {
        render(
            <MemoryRouter>
                <CustomBreadcrumbs currentPage="Heroes" />
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Heroes')).toBeInTheDocument();
    });

    test('should render breadcrumbs with multiple levels', () => {
        render(
            <MemoryRouter>
                <CustomBreadcrumbs
                    currentPage="Batman"
                    breadcrumbs={[{ label: 'DC', to: '/dc' }]}
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('DC')).toBeInTheDocument();
        expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    test('should render breadcrumbs array correctly', () => {
        render(
            <MemoryRouter>
                <CustomBreadcrumbs
                    currentPage="Spider-Man"
                    breadcrumbs={[{ label: 'Marvel', to: '/marvel' }]}
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Marvel')).toBeInTheDocument();
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    });

    test('should render correct links for breadcrumb items', () => {
        render(
            <MemoryRouter>
                <CustomBreadcrumbs
                    currentPage="Superman"
                    breadcrumbs={[{ label: 'DC', to: '/dc' }]}
                />
            </MemoryRouter>
        );

        const dcLink = screen.getByText('DC');
        expect(dcLink).toHaveAttribute('href', '/dc');
    });
});
