import { Box, Layer, Button } from 'grommet'
import { FormClose } from 'grommet-icons'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Overlay = ({ children, isOpen, onClose }: Props): JSX.Element =>
  !isOpen ? null : (
    <Layer full onClickOutside={onClose} onEsc={onClose}>
      <Box
        background="light-2"
        tag="header"
        justify="end"
        align="center"
        direction="row"
      >
        <Button a11yTitle="Close" icon={<FormClose />} onClick={onClose} />
      </Box>
      <Box fill background="light-2" align="center" justify="center">
        {children}
      </Box>
    </Layer>
  )

export default Overlay
