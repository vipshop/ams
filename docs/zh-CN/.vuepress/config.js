// 根据打包命令参数，决定打包输出路径
const dest = 'dist'

module.exports = {
  title: 'AMS',
  base: '/ams/',
  description: '基于JSON配置来快速搭建管理后台前端页面的JavaScript框架',
  dest: dest, // 指定 vuepress build 的输出目录, 默认值: .vuepress/dist
  head: [
    ['link', { rel: 'icon', href: 'https://h5rsc.vipstatic.com/ams/favicon64.ico' }]
  ],
  plugins: [
    'flowchart'
  ],
  themeConfig: {
    algolia: {
      apiKey: '9120457b8cefe7956c453725782efd99',
      indexName: 'ams'
    },
    // lastUpdated: '最后更新',
    nav: [
      { text: '接入', link: '/api/' },
      { text: '字段', link: '/field/' },
      { text: '区块', link: '/block/' },
      { text: '市场', link: '/market/' },
      {
        text: '0.17.x',
        items: [
          {
            text: '更新日志',
            link: '/version/changelog'
          },
          {
            text: '版本总览',
            link: '/version/VERSION'
          }
        ]
      },
      { text: '仓库', link: 'https://github.com/vipshop/ams' }
    ],
    sidebar: {
      '/api/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
            'resource',
            'block',
            'icon',
            'demo'
          ]
        },
        {
          title: '规范',
          collapsable: false,
          children: [
            'api'
          ]
        },
        {
          title: '深入',
          collapsable: false,
          children: [
            'operation',
            'field',
            'cli',
            'custom',
            'ams-config',
            'default-config',
            'router',
            'faq'
          ]
        },
        {
          title: 'API',
          collapsable: false,
          children: [
            'ams-ams',
            'ams-mixins',
            'ams-utils'
          ]
        }
      ],
      '/field/': [
        '',
        {
          title: '基础',
          collapsable: false,
          children: ['text','password', 'textarea', 'switch',  'color', 'rate', 'unitselect', 'link']
        },
        {
          title: '时间',
          collapsable: false,
          children: ['date', 'time', 'timepicker', 'timerange', 'datetime', 'datetimerange']
        },
        {
          title: '选择',
          collapsable: false,
          children: ['radio', 'checkbox', 'select', 'cascader', 'transfer']
        },
        {
          title: '上传',
          collapsable: false,
          children: ['image', 'headImage', 'audio', 'video', 'file', 'originfile']
        },
        {
          title: '数字',
          collapsable: false,
          children: ['slider', 'progress', 'inputnumber']
        },
        {
          title: '复合',
          collapsable: false,
          children: ['array', 'object', 'union']
        }
      ],
      '/block/': [
        '',
        {
            title: '基础',
            collapsable: false,
            children: [
              'api',
              'form',
              'list',
              'imagelist',
              'table',
              'dialog',
              'error',
              'router',
              'collapse',
              'component',
              'title',
              'tabs',
              'steps',
              'card',
              'dropdown'
            ]
        },
        {
            title: '定制',
            collapsable: false,
            children: ['chart']
        }
      ],
      '/version/': ['changelog', 'VERSION']
    }
  }
};
