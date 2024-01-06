import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  it('renders app', () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('renders different textContent of button after 2 button clicks', async () => {
    const user = userEvent.setup();

    render(<App />);
    const button = screen.getByRole('button', { name: 'count is 0' });

    await user.click(button);
    await user.click(button);

    expect(button.textContent).toMatch(/count is 2/i);
  });
});
