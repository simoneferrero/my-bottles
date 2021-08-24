import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Overlay from './'

describe('Given <Overlay />', () => {
  const title = 'This is the title'
  const body = 'This is the body'
  const handleClose = jest.fn()

  // TODO: Enable when grommet release fix
  xit('should display when open', () => {
    render(
      <Overlay isOpen onClose={handleClose} title={title}>
        {body}
      </Overlay>
    )

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(body)).toBeInTheDocument()
  })

  // TODO: Enable when grommet release fix
  xit('should call the `onClose` function when closed', () => {
    render(
      <Overlay isOpen onClose={handleClose} title={title}>
        {body}
      </Overlay>
    )
    userEvent.click(screen.getByLabelText('Close'))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('should NOT display when closed', () => {
    render(
      <Overlay isOpen={false} onClose={handleClose} title={title}>
        {body}
      </Overlay>
    )

    expect(screen.queryByText(title)).not.toBeInTheDocument()
    expect(screen.queryByText(body)).not.toBeInTheDocument()
  })
})
