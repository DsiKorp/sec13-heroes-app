import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

console.log(typeof window.ResizeObserver)

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    }
    window.ResizeObserver = ResizeObserver;
}

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    );
};

describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();

        //screen.debug();
        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        );

        //screen.debug(input);

        expect(input.getAttribute('value')).toBe('Batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        );
        expect(input.getAttribute('value')).toBe('Batman');

        //screen.debug(input);

        fireEvent.change(input, { target: { value: 'Superman' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        //screen.debug(input);
        expect(input.getAttribute('value')).toBe('Superman');
    });

    test('should change params strength when slider is changed', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);
        const slider = screen.getByRole('slider');
        // screen.debug(slider);
        // console.log('--------------------------------------');
        // console.log(slider.getAttribute('aria-valuenow'));
        expect(slider.getAttribute('aria-valuenow')).toBe('0');

        fireEvent.keyDown(slider, { key: 'ArrowRight' });

        // screen.debug(slider);
        // console.log('--------------------------------------');
        // console.log(slider.getAttribute('aria-valuenow'));

        expect(slider.getAttribute('aria-valuenow')).toBe('1');
    });

    test('should accordion be open when active-accordion param is set', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advanced-filters']);

        const accordion = screen.getByTestId('accordion');
        // console.log('--------------------------------------');
        // screen.debug(accordion);

        const accordionItem = accordion.querySelector('div');
        // console.log('--------------------------------------');
        // if (accordionItem) screen.debug(accordionItem);

        expect(accordionItem?.getAttribute('data-state')).toBe('open');
    });

    test('should accordion be closed when active-accordion param is not set', () => {
        // No lleva&active-accordion=advanced-filters para simular el acordion cerrado
        renderWithRouter(['/?name=Batman']);

        const accordion = screen.getByTestId('accordion');
        const accordionItem = accordion.querySelector('div');

        expect(accordionItem?.getAttribute('data-state')).toBe('closed');
    });
});