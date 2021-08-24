import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Sidebar from './'

describe('Given <Sidebar />', () => {
  const title = 'This is the title'
  const body = 'This is the body'
  const handleClose = jest.fn()

  it('should display when open', () => {
    render(
      <Sidebar isOpen onClose={handleClose} title={title}>
        {body}
      </Sidebar>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(body)).toBeInTheDocument()
  })

  it('should call the `onClose` function when closed', () => {
    render(
      <Sidebar isOpen onClose={handleClose} title={title}>
        {body}
      </Sidebar>
    )
    userEvent.click(screen.getByLabelText('Close'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should NOT display when closed', () => {
    render(
      <Sidebar isOpen={false} onClose={handleClose} title={title}>
        {body}
      </Sidebar>
    )

    expect(screen.queryByText(title)).not.toBeInTheDocument()
    expect(screen.queryByText(body)).not.toBeInTheDocument()
  })
})
