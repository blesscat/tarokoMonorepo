import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createButton } from './index'

const Button = createButton()

test('renders button', () => {
  render(
    <Button> click me! </Button>
  )
  const linkElement = screen.getByText(/click me!/i)
  expect(linkElement).toBeInTheDocument()
});
