import '@testing-library/jest-dom'
import { render, screen } from '@/__test__/test-utils'
import { createButton } from './index'

const Button = createButton()

test('renders button', () => {
  render(
    <Button> click me! </Button>
  )
  const linkElement = screen.getByText(/click me!/i)
  expect(linkElement).toBeInTheDocument()
});
