import { Box, Layer } from 'grommet'

import DrawerHeader from '../DrawerHeader'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

const Overlay = ({ children, isOpen, onClose, title }: Props): JSX.Element =>
  !isOpen ? null : (
    <Layer full onClickOutside={onClose} onEsc={onClose}>
      <DrawerHeader onClose={onClose} title={title} />
      <Box
        data-testid="overlay"
        fill
        background="light-2"
        align="center"
        justify="center"
      >
        {children}
      </Box>
    </Layer>
  )

export default Overlay
