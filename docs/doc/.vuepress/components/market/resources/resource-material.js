export default {
  key: 'materielId',
  // foreignKeys: ['classId'],
  api: {
    contentType: 'form',
    // api前缀
  },
  fields: {
    materielId: {
      label: 'materielId',
      type: 'text',
      ctx: 'view'
    },
    name: {
      label: '物料名',
      type: 'text'
    },
    image: {
      label: '展示图片',
      type: 'image'
    },
    title: {
      label: '标题',
      type: 'text'
    },
    author: {
      label: '作者',
      type: 'text'
    },
    content: {
      // label: '配置信息',
      type: 'text',
      hidden: true,
      label: 'content'
    },
    version: {
      label: '版本号',
      type: 'text'
    },
    sdkVersion: {
      label: 'sdk版本',
      type: 'text',
      view(val) {
        console.log(val, 'sdkVersion');
        return val === '0' ? 'latest' : val;
      }
    },
    createTime: {
      label: '创建时间',
      type: 'datetime'
    },
    updateTime: {
      label: '更新时间',
      type: 'datetime'
    },
    status: {
      label: '状态',
      type: 'switch',
      default: 1
    },
    // 'isDeleted': {
    //     'label': 'isDeleted',
    //     'type': 'switch'
    // },
    readme: {
      label: 'readme',
      type: 'textarea',
      props: {
        rows: 16
      }
    },
    homepage: {
      label: '首页',
      type: 'text',
      show: 'homepage'
    },
    description: {
      label: '说明',
      type: 'textarea',
      view(val) {
        return val || '暂无相关说明';
      }
    },
    tags: {
      label: '标签',
      type: 'checkbox',
      props:{
        options: {}
      }
    },
  }
};
