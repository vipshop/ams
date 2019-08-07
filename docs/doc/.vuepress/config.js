// 根据打包命令参数，决定打包输出路径
const dest = 'dist'

module.exports = {
  title: 'AMS文档',
  base: '/ams/',
  description: '后台自动化平台',
  dest: dest, // 指定 vuepress build 的输出目录, 默认值: .vuepress/dist
  head: [
    ['link', { rel: 'icon', href: 'https://h5rsc.vipstatic.com/ams/favicon64.ico' }]
  ],
  plugins: [
    'flowchart'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@ams/ams": "@ams-team/ams"
      }
    }
  }, //设置别名
  themeConfig: {
    // lastUpdated: '最后更新',
    nav: [
      { text: '接入', link: '/api/' },
      { text: '字段', link: '/field/' },
      { text: '区块', link: '/block/' },
      { text: '市场', link: '/market/' },
      {
        text: '版本',
        items: [
          {
            text: '版本总览',
            link: '/version/VERSION'
          },
          {
            text: '0.9.9（最新）',
            link: '/version/0.9'
          },
          {
            text: '0.8.7',
            link: '/version/0.8'
          },
          {
            text: '0.7.18',
            link: '/version/0.7'
          },
          {
            text: '0.6.12',
            link: '/version/0.6'
          },
          {
            text: '0.5.33',
            link: '/version/0.5'
          },
          {
            text: '0.4.14',
            link: '/version/0.4'
          },
          {
            text: '0.3.5',
            link: '/version/0.3'
          },
          {
            text: '0.2.1',
            link: '/version/0.2'
          },
          {
            text: '0.1.0',
            link: '/version/0.1'
          }
        ]
      }
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
            'router'
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
          children: ['text','password', 'textarea', 'switch',  'color', 'rate', 'unitselect']
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
      '/version/': ['VERSION', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1']
    }
  }
};
