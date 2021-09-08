import { Box, Button, Heading } from 'grommet'
import { Add } from 'grommet-icons'
import { useAppDispatch } from '../app/hooks'

import { setBottleFormOpen } from '../features/bottles/slice'

import AppBar from '../components/AppBar'
import BottleForm from '../features/bottles/BottleForm'
import BottlesContainer from '../features/bottles/BottlesContainer'

type Props = {
  size: string
}

const Home = ({ size }: Props): JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <Box fill overflow="hidden">
      <AppBar>
        <Heading level="3" margin="none">
          My Bottles
        </Heading>
        <Button
          a11yTitle="Add new bottle button"
          icon={<Add />}
          onClick={() => dispatch(setBottleFormOpen())}
        />
      </AppBar>
      <Box direction="row" flex>
        <BottlesContainer />
        <BottleForm size={size} />
      </Box>
    </Box>
  )
}

export default Home
