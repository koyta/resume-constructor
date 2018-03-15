import React, { Component } from 'react'
import MenuComponent from '../../../components/sider/Menu'
import { inject, observer } from 'mobx-react'

@inject('routing', 'user')
@observer
class Menu extends Component {
  state = {
    collapsed: true,
  }

  onCollapse = (collapsed) => {
    this.setState({collapsed})
  }

  render () {
    return <MenuComponent
      collapsed={this.state.collapsed}
      onCollapse={this.onCollapse}
    />
  }
}

export default Menu