import React, { Component } from 'react'

import Posts from './Posts'

export default class TechPosts extends Component {

  render() {
    const { title, lang } = this.props

    const collectionName = `posts_${lang}`

    const posts = this.props.metadata.collections[collectionName]

    return (
      <Posts
        { ...this.props }
        title={title}
        posts={posts}
        snippets={true}
        />
    )

  }

}
