import React from 'react'
import { render, screen } from '../../utils/test-utils'

import BottlesContainer from './BottlesContainer'

describe('Given <BottlesContainer />', () => {
  describe('When there are NO bottles', () => {
    it('should display a NO BOTTLES message', () => {
      render(<BottlesContainer />)

      const noBottlesMessage = screen.getByText(
        'There are no bottles in your collection.'
      )

      expect(noBottlesMessage).toBeInTheDocument()
    })
  })
})
