const blockConfig = {
  blocks: {
    listViewAll: {
      type: 'list',
      resource: 'list',
      ctx: 'view',
      // 过滤设置（列表特有）
      filters: {
        select: {
          // 多选
          multiple: true,
          // 远程过滤
          remote: true
        }
      },
      // 排序设置（列表特有）
      sorts: {
        inputnumber: true
      },

      // 列表pageSize（列表特有）
      pageSize: 10,

      data: {
        list: [
          {
            text: '双11活动',
            inputnumber: 3,
            select: 'a,b,c'
          },
          {
            text: '双11活动2',
            inputnumber: 4,
            select: 'b,c'
          },
          {
            text: '双11活动3',
            inputnumber: 5,
            select: 'a,b,c'
          },
          {
            text: '双11活动4',
            inputnumber: 6,
            select: 'c'
          }
        ],
        total: 20
      },
      events: {
        editItem: '@editItem',
        removeItem: '@removeItem'
      },
      fields: {
        text: {
          label: '列表文本'
        }
      },
      actions: {
        editItem(context) {
          console.log('context', context);
        },
        removeItem({ $prevReturn }) {
          const { id } = $prevReturn;
          for (let i = 0; i < this.data.list.length; i++) {
            if (this.data.list[i].id === id) {
              this.data.list.splice(i, 1);
              break;
            }
          }
        }
      },
      operations: {
        editItem: {
          type: 'button',
          props: {
            type: 'primary',
            icon: 'el-icon-edit',
            circle: true
          }
        },
        removeItem: {
          type: 'button',
          props: {
            type: 'danger',
            icon: 'el-icon-delete',
            circle: true
          }
        },

        select: {
          slot: 'searchs',
          type: 'field',
          field: 'select'
          // label: '可省略'
        },
        testNewInput: {
          slot: 'searchs',
          type: 'field',
          field: {
            type: 'text',
            props: {
              placeholder: '折'
            },
            style: {
              width: '50px'
            }
          }
        },
        search: {
          slot: 'searchs',
          type: 'button',
          props: {
            type: 'primary'
          },
          label: '搜索',
          event: 'list'
        },
        reset: {
          slot: 'searchs',
          type: 'reset',
          label: '重置'
        },
        buttonMulti: {
          slot: 'multipleSelect',
          type: 'button',
          label: '删除',
          event: 'multi'
        }
      }
    }
  }
};

export default blockConfig;
