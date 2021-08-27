import { Box, Button, Heading } from 'grommet'
import { Add } from 'grommet-icons'
import { useAppSelector, useAppDispatch } from '../app/hooks'

import {
  selectShowAddBottle,
  setShowAddBottle,
} from '../features/bottles/slice'
import { useGetBottlesQuery } from '../services/bottles'

import AppBar from '../components/AppBar'
import Overlay from '../components/Overlay'
import Sidebar from '../components/Sidebar'
import AddBottleForm from '../components/AddBottleForm'

type Props = {
  size: string
}

const Home = ({ size }: Props): JSX.Element => {
  const addBottleTitle = 'Add New Bottle'

  // TODO: move into BottlesContainer
  const { data, error, isLoading } = useGetBottlesQuery('')

  const showAddBottle = useAppSelector(selectShowAddBottle)
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
          onClick={() => dispatch(setShowAddBottle(true))}
        />
      </AppBar>
      <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align="center" justify="center">
          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            <>There are bottles</>
          ) : null}
        </Box>
        {size === 'small' ? (
          <Overlay
            isOpen={showAddBottle}
            onClose={() => dispatch(setShowAddBottle(false))}
            title={addBottleTitle}
          >
            <AddBottleForm />
          </Overlay>
        ) : (
          <Sidebar
            isOpen={showAddBottle}
            onClose={() => dispatch(setShowAddBottle(false))}
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
