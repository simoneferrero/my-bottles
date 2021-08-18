import { grommet } from 'grommet'
import { deepMerge } from 'grommet/utils'

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Helvetica',
      size: '14px',
      height: '20px',
    },
  },
})

export default theme
