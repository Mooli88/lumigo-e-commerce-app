import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Searchbox } from 'components/Searchbox'

jest.useFakeTimers({
  advanceTimers: true,
})

// setup function
function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup({
      delay: 10,
    }),
    ...render(jsx),
  }
}

describe('Searchbox', () => {
  it('renders Searchbox', () => {
    render(<Searchbox id='tst' onChange={() => null} />)

    const searchboxEl = screen.getByRole('searchbox')

    expect(searchboxEl).toBeInTheDocument()
  })

  it('Should call `onChange` with user input', async () => {
    const onChange = jest.fn()

    const { user } = setup(<Searchbox id='tst' onChange={onChange} />)
    const searchboxEl = screen.getByRole('searchbox')
    const inputVal = 'hello world'

    await user.type(searchboxEl, inputVal)

    // At this point in time, the onChange should not have been called yet
    expect(onChange).not.toBeCalled()

    // Fast-forward until all timers have been executed
    jest.advanceTimersByTime(300)

    // Now our onChange should have been called!
    expect(onChange).toBeCalled()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(inputVal)
  })
})
