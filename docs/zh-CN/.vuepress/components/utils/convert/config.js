export default {
  resources: {
    data: {
      fields: {
        url: {
          type: 'text',
          label: '地址',
          props: {
            placeholder: '如： http://localhost:9528/examples/admin/mock/read.json'
          }
        },
        and: {
          type: 'text',
          ctx: 'view'
        },
        text: {
          type: 'textarea',
          props: {
            rows: 10,
            placeholder: '如： {"data":{"select": "aaaa.bbb", "text": "hello"}}'
          },
          label: '数据'
        },
        ans: {
          label: '资源配置：',
          type: 'textarea',
          props: {
            rows: 10
          }
        }
      }
    }
  },
  blocks: {
    buttons: {
      type: 'form',
      ctx: 'view',
      events: {
        submit: 'edit.submit',
        format: 'edit.format',
        clear: 'edit.clear'
      },
      operations: {
        submit: {
          label: '生成',
          type: 'button',
          props: {
              type: 'primary'
          }
        },
        format: {
          label: '格式化',
          type: 'button'
        },
        clear: {
          label: '清空',
          type: 'button'
        }
      }
    },
    edit: {
      type: 'form',
      ctx: 'edit',
      resource: 'data',
      data: {
        and: '或',
      },
      style: {
        width: '100%'
      },
      actions: {
        // function getItemConfig(value, key = ''){
        //   const type = ams.utils.getType(value);
        //   if(type === 'object'){
        //     const fields = {}
        //     Object.keys(value).forEach(i => {
        //       fields[i] = getItemConfig(value[i], i)
        //     })
        //     return {
        //       type: 'object',
        //       label: key,
        //       fields
        //     }
        //   } else if (type === 'array'){
        //     let field;
        //     if(typeof value[0] != 'undefined'){
        //       field = getItemConfig(value[0], key)
        //     } else {
        //       field = {
        //         type: 'text',
        //         label: key
        //       }
        //     }
        //     return {
        //       type: 'array',
        //       label: key,
        //       field
        //     }
        //   } else {
        //     if(type === 'string'){
        //       const field = {label: key}
        //       if(/\.(mp4|avi|rmvb)$/.test(value)){
        //         field.type = 'video'
        //         field.props = {action: '/'}
        //       } else if(/\.(mp3)$/.test(value)){
        //         field.type = 'audio'
        //         field.props = {action: '/'}
        //       } else if(/\.(png|jpe?g|gif)$/.test(value)){
        //         field.type = 'image'
        //         field.props = {action: '/'}
        //       } else if(/\.\w{1,5}$/.test(value)){
        //         field.type = 'file'
        //         field.props = {action: '/'}
        //       } else if(/^<.*>$/.test(value)){
        //         field.type = 'editor'
        //       } else if(/^\w+,\w+/.test(value)){
        //         field.type = 'select'
        //         field.props ={
        //           options: {
        //               a: '黄金糕',
        //               b: '双皮奶',
        //               c: '蚵仔煎',
        //               d: '龙须面',
        //               e: '北京烤鸭'
        //           }
        //         }
        //       } else if(/^\d{2}:\d{2}/.test(value)){
        //         field.type = 'time'
        //       } else if(value.length < 20) {
        //         field.type = 'text'
        //       } else {
        //         field.type = 'textarea'
        //       }
        //       return field;
        //     } else if (type === 'number') {
        //       const field = {label: key}
        //       if((value + '').length === 13){
        //         field.type = 'datetime'
        //       } else if(value >= 0 && value <= 5){
        //         field.type = 'rate'
        //       } else if(value === 1){
        //         field.type = 'switch'
        //       } else if(parseInt(value) === value && value <= 100 && value >= 0){
        //         field.type = 'progress'
        //       } else {
        //         field.type = 'inputnumber'
        //       }
        //       return field;
        //     } else {
        //       return {
        //         type: 'text',
        //         label: key
        //       }
        //     }
        //   }
        // }
        async getFields() {
          try {
            let data = JSON.parse(this.data.text);
            if (data.data) {
              data = data.data;
            }
            const arr = []
            Object.keys(data).forEach(name => {
              const type = ['int', 'text', 'float', 'year', 'mediumtex', 'datetime', 'char', 'bigint', 'smallint', 'mediumblob', 'tinyint', 'json', 'blo', 'blob', 'longblo', 'varchar', 'timestamp', 'time', 'longtex', 'tinytex', 'date', 'bit', 'mediumblo', 'tex', 'longtext', 'double', 'decimal', 'tinytext', 'mediumtext', 'mediumint', 'varbinary', 'tinyblob', 'longblob']
              arr.push ({
                'name': name,
                'type': type[1]
              })
            })
            const res = await this.$ams.request({
              url: 'http://w3cmark.com/getBayes',
              method: 'post',
              data: { data: JSON.stringify(arr) },
              withCredentials: false
            })
            const fields = {}
            res.data.res.forEach(val => {
              fields[val.name] = {
                label: val.name,
                type: val.res[0]
              }
            })
            const ans = {
              key: 'id',
              api: {
                prefix: '/',
                read: ''
              },
              fields: fields
            }
            this.data.ans = JSON.stringify(ans, null, 4);
            const ams = this.$ams;
            delete ams.resources.new
            ams.resource('new', ans);
            this.callAction('@preview.update');
          } catch (e) {
           this.data.ans = e;
          }
        },
        submit() {
          if (this.data.url) {
            this.$ams.request({
              url: this.data.url,
              withCredentials: false
            }).then(res => {
              if (res.data.list && Array.isArray(res.data.list) && res.data.list.length > 0) {
                this.data.text = JSON.stringify(res.data.list[0], null, 4)
              } else {
                this.data.text = JSON.stringify(res.data, null, 4)
              }
              this.callAction('edit.getFields')
            });
          } else if(this.data.text){
            this.callAction('edit.getFields')
          } else {
            this.data.ans = '请输入url或者数据';
          }
        },
        format() {
          try {
            if (this.data.text) {
              const data = JSON.parse(this.data.text);
              this.data.text = JSON.stringify(data, null, 4);
            }
          } catch (e) {
            this.data.ans = e;
          }
        },
        clear() {
          this.data.text = '';
          this.data.url = '';
          this.data.ans = '';
          delete ams.resources.new;
          this.callAction('@preview.update');
        }
      }
    },
    preview: {
      type: 'form',
      ctx: 'edit',
      resource: 'new',
      style: {
        width: '100%',
        marginTop: '40px',
        paddingTop: '40px',
        borderTop: '1px solid #eaecef'
      },
      actions: {
        update(){
          console.log('update')
          this.initBlock();
        }
      }
    }
  }
};

/**
方法：post
参数：data: [{"name": "name1", "type": "type1"}, {"name": "name2", "type": "type2"}]
接口返回数据：
{
  res:[
    {
      "name": "name1",
      "rate": [],
      "res": []
    }
  ],
  "statusCode": 200
}
**/
