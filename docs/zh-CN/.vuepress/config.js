// 根据打包命令参数，决定打包输出路径
// npm run build -- ams-os 打包路径将是ams-os库在你本地的路径（按需修改）
const dest = 'dist'

module.exports = {
  title: 'AMS文档',
  base: '/ams/',
  description: '基于JSON配置来快速搭建管理后台前端页面的JavaScript框架',
  dest: dest, // 指定 vuepress build 的输出目录, 默认值: .vuepress/dist
  head: [
    ['link', { rel: 'icon', href: 'https://h5rsc.vipstatic.com/ams/favicon64*2.ico' }]
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
      { text: '首页', link: '/' },
      { text: '用户指南',
        link: '/api/'
      },
      {
        text: '字段',
        link: '/field/'
      },
      {
        text: '区块',
        link: '/block/'
      },
      {
        text: '市场',
        link: '/market/'
      },
      {
        text: '示例',
        link: 'https://vipshop.github.io/ams/example/#/'
      },
      {
        text: '版本更新',
        items: [
          {
            text: '更新日志',
            link: '/version/changelog'
          },
          {
            text: '规划总览',
            link: '/version/VERSION'
          },
          {
            text: 'cdn资源',
            link: '/version/cdn-script'
          }
        ]
      },
      {
        text: 'GITHUB',
        link: 'https://github.com/vipshop/ams'
      }
    ],
    sidebar: {
      '/api/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '',
            'try',
            'quickstart',
            'resource',
            'block',
            'template',
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
            'cli',
            'custom',
            'ams-config',
            'default-config',
            'access',
            'icon'
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
          children: ['text','password', 'textarea', 'switch',  'color', 'rate', 'unitselect', 'link', 'button', 'html', 'tree']
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
          children: ['image', 'audio', 'video', 'file', 'originfile']
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
        },
        {
          title: '深入',
          collapsable: false,
          children: ['props-style-rules', 'get-set-view']
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
              'grid',
              'list',
              'imagelist',
              'table',
              'dialog',
              'drawer',
              'error',
              'router',
              'collapse',
              'component',
              'title',
              'tabs',
              'steps',
              'card',
              'dropdown',
              'popover'
            ]
        },
        {
          title: '深入',
          collapsable: false,
          children: [
            'deep-operation', 'deep-router', 'action', 'deep-watermark'
          ]
        },
        {
            title: '定制',
            collapsable: false,
            children: ['chart']
        }
      ],
      '/version/': ['changelog', 'VERSION', 'cdn-script']
    }
  }
};
