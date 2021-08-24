import { Box, Button, Heading } from 'grommet'
import { Add } from 'grommet-icons'
import { useState } from 'react'

import AppBar from '../components/AppBar'
import Overlay from '../components/Overlay'
import Sidebar from '../components/Sidebar'
import AddBottleForm from '../components/AddBottleForm'

type Props = {
  size: string
}

const Home = ({ size }: Props): JSX.Element => {
  const [showAddBottle, setShowAddBottle] = useState(false)
  const addBottleTitle = 'Add New Bottle'

  return (
    <Box fill>
      <AppBar>
        <Heading level="3" margin="none">
          My Bottles
        </Heading>
        <Button
          a11yTitle="Add new bottle button"
          icon={<Add />}
          onClick={() => setShowAddBottle(true)}
        />
      </AppBar>
      <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
        <Box flex align="center" justify="center">
          app body
        </Box>
        {size === 'small' ? (
          <Overlay
            isOpen={showAddBottle}
            onClose={() => setShowAddBottle(false)}
            title={addBottleTitle}
          >
            <AddBottleForm />
          </Overlay>
        ) : (
          <Sidebar
            isOpen={showAddBottle}
            onClose={() => setShowAddBottle(false)}
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
