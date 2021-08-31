import React from 'react'
import { render, screen } from '../../utils/test-utils'

import { wineBottle, beerBottle, spiritBottle } from '../../mocks/bottles'

import BottleCard from './'

describe('Given <BottleCard />', () => {
  it('should display the details of a wine bottle', () => {
    render(<BottleCard {...wineBottle} />)

    expect(screen.getByText('Barbera (1990)')).toBeInTheDocument()
    expect(screen.getByText('Wine: Red')).toBeInTheDocument()
    expect(screen.getByText('ABV: 14%')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Edit Details')).toBeInTheDocument()
  })

  it('should display the details of a beer bottle', () => {
    render(<BottleCard {...beerBottle} />)

    expect(screen.getByText('Hop House 13')).toBeInTheDocument()
    expect(screen.getByText('Beer: Lager')).toBeInTheDocument()
    expect(screen.getByText('ABV: 4.3%')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 10')).toBeInTheDocument()
    expect(screen.getByLabelText('Edit Details')).toBeInTheDocument()
  })

  it('should display the details of a spirit bottle', () => {
    render(<BottleCard {...spiritBottle} />)

    expect(
      screen.getByText('Russian Standard Platinum Vodka')
    ).toBeInTheDocument()
    expect(screen.getByText('Spirit')).toBeInTheDocument()
    expect(screen.getByText('ABV: 43%')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Edit Details')).toBeInTheDocument()
  })
})
