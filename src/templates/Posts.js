import React, { Component } from 'react'

import Page from './components/Page'
import Article, {ArticleDetails} from './components/Article'

export default class Posts extends Component {

  render() {

    const { title, snippets, texts } = this.props
    const posts = this.props.metadata.collections.articles

    let postsList = posts.map((post, i) => {
      const dir = `/${post.paths.dir}/`
      const key = `Post_${i}`
      const published = (new Date(post.date)).toLocaleDateString('en-GB')
      const snippetCode = snippets ? (<div dangerouslySetInnerHTML={{ __html: post.snippet }}/>) : null
      return (
        <Article title={post.title} key={key} link={dir}>
          <ArticleDetails>{texts.publishedOn} {published}</ArticleDetails>
          {snippetCode}
        </Article>
      )
    })

    return (
      <Page {...this.props}>
        <div>
          {postsList}
        </div>
      </Page>
    )

  }

}
