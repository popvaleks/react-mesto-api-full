import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/no-unresolved
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
