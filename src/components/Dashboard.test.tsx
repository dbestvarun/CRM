import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
// Dashboard component uses React Router's <Link>, which requires a Router context to work
// This test is not valid because it doesn't provide a Router context
// To fix it, we need to wrap the Dashboard component in a Router
import { MemoryRouter } from 'react-router-dom';
describe('Dashboard', () => {
  test('renders Dashboard title', () => {
    // render(<Dashboard />);
    render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>
    )
    const title = screen.getByText(/dashboard/i);
    expect(title).toBeInTheDocument();
  });

  test('renders summary cards for Companies, Products, and Tasks', () => {
    render( //MemoryRouter is a special router for testing and non-browser environments.
    <MemoryRouter>
        <Dashboard />
    </MemoryRouter>
    );
    expect(screen.getByText(/companies/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });
}); 