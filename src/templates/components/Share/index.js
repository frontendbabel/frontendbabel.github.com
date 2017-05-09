import React, { Component } from 'react'

import style from './style.css'

export default class Share extends Component {

  render() {

    const { lang } = this.props

    let shareParams = 'twitter,facebook,gplus'
    if ( lang === 'ru' ) {
      shareParams += ',vkontakte'
    }

    return (
      <div className={style.share}>
        <script type="text/javascript" src="//yandex.st/share/share.js" charSet="utf-8"></script>
        <span
          className="yashare-auto-init"
          data-yashareQuickServices={shareParams}
          data-yashareL10n={lang}
          data-yashareTheme="counter"
        />
      </div>
    )

  }

}
