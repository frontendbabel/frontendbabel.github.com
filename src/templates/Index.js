import React, { Component } from 'react'

import Posts from './Posts'
import Page from './components/Page'
import Article from './components/Article'
import RecentPosts from './components/RecentPosts'

export default class Index extends Component {

  render() {
    const { title, contents, lang, texts } = this.props
    const posts = this.props.metadata.collections[`posts_${lang}`]

    return (
      <Page {...this.props}>
        <Article title={title}>
          <div dangerouslySetInnerHTML={{ __html: contents }}/>
        </Article>
      </Page>
    )
        //<RecentPosts posts={posts} title={texts.recentPostsTitle}/>

  }

}
