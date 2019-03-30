import React, { Component } from 'react'

class List extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    const { list } = this.props
    return (
      <ul>
        {
          list.map((item,index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    )
  }
}

export default List
