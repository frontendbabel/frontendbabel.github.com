import React, { Component } from 'react'

import style from './style.css'

export default class Article extends Component {

  render() {
    const { title, link, author, source } = this.props

    const header = link ? (
      <h2 className={style.header}>
        <a href={link} className={style.link}>
          {title}
        </a>
      </h2>
    ) : (
      <h1 className={style.header}>{title}</h1>
    )

    const meta = author ? (
      <div>
        Written by {author.name}
      </div>
    ) : null

    const sourceInfo = source ? (
      <div>
        Source: {source.lang.toUpperCase()}, <a href={source.url}>{source.name}</a>
      </div>
    ) : null

    return (
      <div className={style.article} role="main">
        <div className={style.body}>
          {header}
        </div>
        {meta}
        <div className={style.text}>
          {this.props.children}
        </div>
        {sourceInfo} 
      </div>
    )

  }

}

export class ArticleDetails extends Component {

  render() {

    const blockClass = style.details + ' author vcard'

    return (
      <span className={blockClass}>
        {this.props.children}
      </span>
    )

  }

}
