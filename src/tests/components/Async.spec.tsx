import { render, screen , waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '../../components/Async';
test('it renders correctly', async () => {
  render(<Async />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
  expect(await screen.findByText('Click me')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText('Loading...')).toBeInTheDocument());
  // await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
})