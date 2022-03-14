import { render, screen } from '@testing-library/react';
import FormContainer from './Containers/FormContainer';

test('renders learn react link', () => {
  render(<FormContainer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
