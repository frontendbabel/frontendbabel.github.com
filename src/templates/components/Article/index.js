import React, { Component } from 'react'

import style from './style.css'

export default class Article extends Component {

  render() {
    const { title, link } = this.props

    const header = link ? (
      <h2 className={style.header}>
        <a href={link} className={style.link}>
          {title}
        </a>
      </h2>
    ) : (
      <h1 className={style.header}>{title}</h1>
    )

    return (
      <div className={style.article} role="main">
        <div className={style.body}>
          {header}
        </div>
        <div className={style.text}>
          {this.props.children}
        </div>
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
