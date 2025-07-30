import { render, screen,} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {act} from 'react';
import Home from '@/app/page';

describe('Home', () => {
    it('renders an empty basket', () => {
        render(<Home />);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent('Basket: 0 items');
    });

    it('renders a basket with 1 item after adding one item', async () => {
        const user = userEvent.setup();
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await act(async () => {
            await user.click(buttons[0]);
        });

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
    });

    it(
        'renders a basket with 2 items after adding two different items',
        async () => {
            const user = userEvent.setup();
            render(<Home />);

            const buttons = screen.getAllByRole('button', {
                name: /Add to basket/i,
            });

            await act(async () => {
                await user.click(buttons[0]);
            });

            await act(async () => {
                await user.click(buttons[1]);
            });

            const basketButton = screen.getByRole('button', {
                name: /Basket:/i,
            });

            expect(basketButton).toHaveTextContent(/Basket: 2 items$/);
        }
    );
});
