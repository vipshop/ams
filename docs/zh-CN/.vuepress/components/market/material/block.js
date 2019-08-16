import fieldData from '../fieldBlockData';

const blockConfig = {
  type: 'material-card',
  resource: 'resource-material',
  ctx: 'edit',
  filters: {},
  sorts: {},
  operations: {
    // title: {
    //   slot: 'searchs',
    //   type: 'field',
    //   field: {
    //     type: 'text',
    //     props: {
    //       placeholder: '请输入名称'
    //     }
    //   }
    // },
    // name: {
    //   slot: 'searchs',
    //   type: 'field',
    //   field: {
    //     type: 'text',
    //     props: {
    //       placeholder: '请输入包名'
    //     }
    //   }
    // },
    // search: {
    //   slot: 'searchs',
    //   type: 'button',
    //   label: '搜索',
    //   props: {
    //     type: 'primary'
    //   },
    //   event: 'list'
    // },
    // reset: {
    //   slot: 'searchs',
    //   type: 'reset',
    //   label: '重置'
    // },
    view: {
      type: 'button',
      label: '查看详情',
      props: {
        type: 'primary',
        size: 'mini',
        round: true,
        icon: 'el-icon-view'
      },
      style: {
        'margin-top': '7px'
      }
    }
  },
  data: {
    list: {},
    page: 1,
    pageSize: 100,
    total: 0
  },
  events: {
    init: '@list',
    view: '@view'
  },
  actions: {
    view({ $prevReturn }) {
      window.open(`/ams/market/detail.html?type=${this.data.type}&materielId=${$prevReturn.materielId}`, '_blank');
    },
    list() {
        this.data.list = fieldData;
    }
  }
};

export default blockConfig;
