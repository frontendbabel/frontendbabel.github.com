import React, { Component } from 'react'

import Article, {ArticleDetails} from '../Article'

import style from './style.css'

export default class RecentPosts extends Component {

  render() {

    const { title, posts, snippets, texts } = this.props

    let postsList = posts.map((post, i) => {
      const dir = `/${post.paths.dir}/`
      const key = `Post_${i}`
      const published = (new Date(post.date)).toLocaleDateString('en-GB')
      return (
        <li className={style.item} key={key}>
          <span className={style.date}>{published}</span>
          <span className={style.text}>
            <a href={dir}>{post.title}</a>
          </span>
        </li>
      )
    })

    postsList = (<ul className={style.list}>{postsList}</ul>)

    return (
      <Article title={title}>
        {postsList}
      </Article>
    )

  }

}
