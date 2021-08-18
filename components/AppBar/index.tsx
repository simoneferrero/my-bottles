import { Box } from 'grommet'

type Props = {
  children: React.ReactNode
}

const AppBar = ({ children }: Props): JSX.Element => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: 1 }}
  >
    {children}
  </Box>
)

export default AppBar
