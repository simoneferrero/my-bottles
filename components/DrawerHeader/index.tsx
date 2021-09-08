import { Box, Button, Heading } from 'grommet'
import { FormClose } from 'grommet-icons'

type Props = {
  onClose: () => void
  title: string
}

const DrawerHeader = ({ onClose, title }: Props): JSX.Element => (
  <Box
    background="dark-2"
    tag="header"
    justify="between"
    align="center"
    direction="row"
    pad={{ left: 'medium' }}
    style={{ zIndex: 200 }}
  >
    <Heading level="4" margin="none">
      {title}
    </Heading>
    <Button a11yTitle="Close" icon={<FormClose />} onClick={onClose} />
  </Box>
)

export default DrawerHeader
