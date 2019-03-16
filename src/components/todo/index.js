import React, { Component } from 'react'
import { linkSync } from 'fs';

class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render() {
    return (

    )
  }
  addTitle = (title) => {
    let { list } = this.state
    list.push(title);
    this.setState({
      list
    })
  }
}

export default Todo