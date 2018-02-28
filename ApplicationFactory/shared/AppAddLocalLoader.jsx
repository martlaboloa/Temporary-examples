import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

const AppAddLocalLoader = ({ loading, children }) => (
  <div style={{ height: '100%' }}>
    <Dimmer active={loading} inverted>
      <Loader inverted />
    </Dimmer>

    {children}
  </div>
)

export default AppAddLocalLoader
