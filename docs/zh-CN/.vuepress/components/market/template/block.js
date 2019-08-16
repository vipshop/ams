import beautify from 'js-beautify'
import templateData from '../templateData';

const classList = [
    {
        id: 0,
        class: '全部',
        num: '3000'
    },
    {
        id: 1,
        class: 'VIP模版库',
        num: '3000'
    },
    {
        id: 2,
        class: '区块DEMO',
        num: '3000'
    },
    {
        id: 3,
        class: '字段DEMO',
        num: '3000'
    },
    {
        id: 4,
        class: '定制物料',
        num: '3000'
    }
];

const blockConfig = {
  options: {
    classList
  },
  type: 'template-card',
  resource: 'resource-template',
  ctx: 'edit',
  filters: {},
  sorts: {},
  operations: {
    title: {
      slot: 'searchs',
      type: 'field',
      label: '名称'
    },
    search: {
      slot: 'searchs',
      type: 'button',
      label: '搜索',
      props: {
        type: 'primary'
      },
      event: 'list'
    },
    reset: {
      slot: 'searchs',
      type: 'reset',
      label: '重置'
    },
    json: {
      type: 'button',
      label: '查看配置',
      props: {
        type: 'primary',
        size: 'mini',
        round: true,
        icon: 'el-icon-edit-outline'
      },
      style: {
        'margin-top': '7px'
      }
    },
    view: {
      type: 'button',
      label: '预览',
      props: {
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
    init: '@getList',
    json: '@templateJsonDialog.show @console',
    view: '@view'
  },
  actions: {
    view({ $prevReturn }) {
        window.open(`/ams/market/template-preview.html?templateId=${$prevReturn.templateId}`, '_blank')
    },
    getList() {
      this.filters = {};
      this.searchs = {};
      this.sortField = 'id';
      this.sortOrder = 'descending';
      this.callAction('@list');
    },
    list() {
        this.data.list = templateData;
    }
  },
  blocks: {
    templateJsonDialog: {
      type: 'dialog',
      data: {
        visible: false,
        title: '配置'
      },
      blocks: {
        templateJsonForm: {
          type: 'form',
          ctx: 'edit',
          resource: {
            fields: {
              json: {
                type: 'ams-code',
                labelWidth: '0'
                // label: '配置'
              }
            }
          },
          actions: {
            init({ $prevReturn }) {
              this.data.json = beautify($prevReturn.templateContent, { indent_size: 4, space_in_empty_paren: true });
            }
          }
        }
      }
      // actions: {
      //   data(args){
      //     // this.data.json = $prevReturn;
      //     console.log('args', args)
      //     console.log('ams.$prevReturn', ams.$prevReturn)
      //   }
      // },
      // events: {
      //   update: '@show @data'
      // },
      // operations: {
      //   hide: {
      //     type: 'button',
      //     label: '关闭'
      //   }
      // }
    }
  }
};

export default blockConfig;
