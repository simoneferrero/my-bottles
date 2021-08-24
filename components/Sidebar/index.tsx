import { Box, Collapsible } from 'grommet'

import DrawerHeader from '../DrawerHeader'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

const Sidebar = ({ children, isOpen, onClose, title }: Props): JSX.Element => (
  <Collapsible direction="horizontal" open={isOpen}>
    <DrawerHeader onClose={onClose} title={title} />
    <Box
      flex
      width="medium"
      background="light-2"
      elevation="small"
      align="center"
      justify="center"
    >
      {children}
    </Box>
  </Collapsible>
)

export default Sidebar
