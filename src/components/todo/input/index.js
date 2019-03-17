import React, { Component } from 'react'

export default class Input extends Component {
  constructor(props){
    super(props)
    this.state={
      title:''
    }
  }
  render() {
    const { title } = this.state
    return (
      <div>
        <input value={title} onChange={this.changeHandle}></input>
        <button onClick={this.clickHandle}>Submit</button>
      </div>
    )
  }
  changeHandle =(e)=>{
    this.setState({
      title:e.target.value
    })
  }
  clickHandle = ()=>{
    const { title } = this.state
    const { addTitle } = this.props
    addTitle(title)
    this.setState({
      title:''
    })
  }
}
