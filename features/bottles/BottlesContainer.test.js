import React from 'react'
import { render, screen } from '../../utils/test-utils'
import { setupServer } from 'msw/node'

import { successHandlers, errorHandlers } from '../../mocks/handlers'

import BottlesContainer from './BottlesContainer'
import { wineBottle, beerBottle } from '../../mocks/bottles'

describe('Given <BottlesContainer />', () => {
  describe('When there are NO bottles', () => {
    it('should display a NO BOTTLES message', async () => {
      const server = setupServer(successHandlers.getBottlesEmpty)
      server.listen()
      render(<BottlesContainer />)

      const loadingMessage = await screen.findByText('Loading bottles...')

      expect(loadingMessage).toBeInTheDocument()

      const noBottlesMessage = await screen.findByText(
        'There are no bottles in your collection.'
      )

      expect(noBottlesMessage).toBeInTheDocument()

      server.close()
    })
  })

  describe('When there are bottles', () => {
    it('should display the bottles', async () => {
      const server = setupServer(successHandlers.getBottles)
      server.listen()
      render(<BottlesContainer />)

      const loadingMessage = await screen.findByText('Loading bottles...')

      expect(loadingMessage).toBeInTheDocument()

      const wineBottleName = await screen.findByText(RegExp(wineBottle.name))

      expect(wineBottleName).toBeInTheDocument()

      const beerBottleName = await screen.findByText(beerBottle.name)

      expect(beerBottleName).toBeInTheDocument()

      server.close()
    })
  })

  describe('When there is an error', () => {
    it('should display the error', async () => {
      const server = setupServer(errorHandlers.getBottles)
      server.listen()
      render(<BottlesContainer />)

      const loadingMessage = await screen.findByText('Loading bottles...')

      expect(loadingMessage).toBeInTheDocument()

      const errorMessage = await screen.findByText(
        'There was an error loading your bottles.'
      )

      expect(errorMessage).toBeInTheDocument()

      server.close()
    })
  })
})
