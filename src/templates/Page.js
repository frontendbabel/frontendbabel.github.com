import React, { Component } from 'react'

import Posts from './Posts'
import XPage from './components/Page'
import Article from './components/Article'

export default class Page extends Component {

  render() {
    const { title, contents, lang, texts } = this.props

    return (
      <XPage {...this.props}>
        <Article title={title}>
          <div dangerouslySetInnerHTML={{ __html: contents }}/>
        </Article>
      </XPage>
    )

  }

}
