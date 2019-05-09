import React from 'react'
import styled from 'styled-components'
import Button from '../src/base/button/button'

const ExamplePage = () => (
  <div>
    <Button>
      Button
    </Button>
    <Button danger>
      TomatoButton
    </Button>
    <Button small>
      Small
    </Button>
    <Button medium>
      Medium
    </Button>
    <Button large>
      Large
    </Button>
  </div>
)

export { ExamplePage }
