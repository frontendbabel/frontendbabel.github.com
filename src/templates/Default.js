import React, { Component } from 'react'

export default class Post extends Component {

  render() {
    const { title, contents } = this.props

    return (
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contents }}/>
      </div>
    )

  }

}
