import { Box, Button, Heading } from 'grommet'
import { Add } from 'grommet-icons'
import { useAppSelector, useAppDispatch } from '../app/hooks'

import {
  selectIsAddBottleOpen,
  toggleIsAddBottleOpen,
} from '../features/bottles/slice'

import AppBar from '../components/AppBar'
import Overlay from '../components/Overlay'
import Sidebar from '../components/Sidebar'
import AddBottleForm from '../components/AddBottleForm'

type Props = {
  size: string
}

const Home = ({ size }: Props): JSX.Element => {
  const addBottleTitle = 'Add New Bottle'

  const isAddBottleOpen = useAppSelector(selectIsAddBottleOpen)
  const dispatch = useAppDispatch()

  return (
    <Box fill>
      <AppBar>
        <Heading level="3" margin="none">
          My Bottles
        </Heading>
        <Button
          a11yTitle="Add new bottle button"
          icon={<Add />}
          onClick={() => dispatch(toggleIsAddBottleOpen())}
        />
      </AppBar>
      <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align="center" justify="center">
          app body
        </Box>
        {size === 'small' ? (
          <Overlay
            isOpen={isAddBottleOpen}
            onClose={() => dispatch(toggleIsAddBottleOpen())}
            title={addBottleTitle}
          >
            <AddBottleForm />
          </Overlay>
        ) : (
          <Sidebar
            isOpen={isAddBottleOpen}
            onClose={() => dispatch(toggleIsAddBottleOpen())}
            title={addBottleTitle}
          >
            <AddBottleForm />
          </Sidebar>
        )}
      </Box>
    </Box>
  )
}

export default Home
