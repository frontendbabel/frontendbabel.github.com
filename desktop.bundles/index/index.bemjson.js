({
    block: 'page',
    title: 'Article',
    favicon: '/favicon.ico',
    head: [
        { elem: 'css', url: 'index.min.css', ie: false },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'header'
        },
        {
            block: 'layout',
            content: [
                {
                    block: 'main',
                    content: [
                        {
                            block: 'article',
                            title: 'The Case of The Wonderful Button',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        },
                        {
                            block: 'slide'
                        },
                        {
                            block: 'recent-posts'
                        },
                        {
                            block: 'comments'
                        },
                        {
                            block: 'related',
                            content: 'xxx'
                        }
                    ]
                },
                {
                    block: 'sidebar',
                    content: [
                        {
                            block: 'menu-vert',
                            content: [
                                {
                                    elem: 'title',
                                    mix: [{ block: 'box', elem: 'title'}],
                                    content: 'On this site'
                                },
                                {
                                    elem: 'item',
                                    content: {
                                        block: 'link',
                                        url: '#',
                                        content: 'Blog'
                                    }
                                },
                                {
                                    elem: 'item',
                                    content: {
                                        block: 'link',
                                        url: '#',
                                        content: 'Articles and talks'
                                    }
                                },
                                {
                                    elem: 'item',
                                    content: {
                                        block: 'link',
                                        url: '#',
                                        content: 'About me'
                                    }
                                }
                            ]
                        },
                        {
                            block: 'github',
                            js: { user: 'varya' }
                        }
                    ]
                },
                {
                    block: 'prompting',
                    content: [
                        {
                            block: 'languages'
                        },
                        {
                            block: 'social-ico',
                            url: '#'
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer',
            content: [
                {
                    elem: 'left'
                },
                {
                    elem: 'center'
                },
                {
                    elem: 'right'
                }
            ]
        },
        /*{ block: 'custom-fonts' },*/
        { elem: 'js', url: 'index.min.js' }
    ]
})
