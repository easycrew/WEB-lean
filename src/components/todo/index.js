import React, { Component } from 'react'
import Input from './input/index'
import List from './list/index'

class Todo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      title:''
    }
  }
  render() {
    const { list } = this.state
    return (
      <div>
        <Input addTitle={this.addTitle}></Input>
        <List list={list}></List>
      </div>
    )
  }

  addTitle = (title) => {
    const { list } = this.state
    this.setState({
      list:list.concat(title)
    })
  }
}

export default Todo