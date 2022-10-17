import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
  xit('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'PLAY THE GAME',
    })

    expect(heading).toBeInTheDocument()

    // const button = test.getElementsByClassName('.btn')
    // console.log('ini button ',test)
  })
})
