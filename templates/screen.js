import React from 'react'

class <%= props.pascalName %> extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      someKey: 'someValue'
    }
  }
  render () {
    return <div />
  }
}
export { <%= props.pascalName %> }

