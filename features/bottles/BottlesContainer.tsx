import { Box } from 'grommet'

const BottlesContainer = (): JSX.Element => {
  const noBottlesMessage = 'There are no bottles in your collection.'
  return (
    <Box flex align="center" justify="center" pad="medium">
      {noBottlesMessage}
    </Box>
  )
}

export default BottlesContainer
