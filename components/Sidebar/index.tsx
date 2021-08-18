import { Box, Button, Collapsible } from 'grommet'
import { FormClose } from 'grommet-icons'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ children, isOpen, onClose }: Props): JSX.Element => (
  <Collapsible direction="horizontal" open={isOpen}>
    <Box
      background="light-2"
      tag="header"
      justify="start"
      align="center"
      direction="row"
    >
      <Button a11yTitle="Close" icon={<FormClose />} onClick={onClose} />
    </Box>
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
