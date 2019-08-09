const MarkdownIt = require('markdown-it');
import fieldData from '../fieldBlockData';

/**
 * 加载js
 * @url 需要加载的js链接
 */
function loadAmsJS(url) {
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      // IE
      script.onreadystatechange = function() {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null;
          resolve('success: ' + url);
        }
      };
    } else {
      // Others
      script.onload = function() {
        resolve('success: ' + url);
      };
    }

    script.onerror = function() {
      reject(Error(url + 'load error!'));
    };

    script.src = url;
    document.body.appendChild(script);
  });
}

const loadedList = {};

function loadAll(arr, callback, error) {
  if (arr[0]) {
    if (loadedList[arr[0]]) {
      loadAll(arr.slice(1), callback);
    } else {
      loadAmsJS(arr[0])
        .then(a => {
          loadAll(arr.slice(1), callback);
        })
        .catch(error);
    }
  } else {
    callback();
  }
}

/**
 * 加载CSS
 * @url 需要加载的css链接
 */
function loadAmsCSS(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';

  link.href = url;
  document.body.appendChild(link);
}

const blockConfig = {
  type: 'collapse',
  data: {
    active: 'detailArea'
  },
  options: {
    detailArea:
      '<i class="el-icon-edit-outline"></i>&nbsp;&nbsp;可视化配置 & 参数列表',
    infoForm: '<i class="el-icon-info"></i>&nbsp;&nbsp;基础信息',
    detailImage: '<i class="el-icon-picture"></i>&nbsp;&nbsp;预览图片',
    howToInstall: '<i class="el-icon-download"></i>&nbsp;&nbsp;安装使用',
    detailContent: '<i class="el-icon-more"></i>&nbsp;&nbsp;说明'
  },
  blocks: {
    infoForm: {
      type: 'form',
      resource: 'resource-material',
      ctx: 'view',
      props: {
        'label-position': 'left'
      },
      fields: {
        materielId: false,
        status: false,
        image: {
          hidden: true
        },
        // content: {
        //   hidden: true
        // },
        readme: {
          hidden: true
        }
      },
      // style: {
      //   width: '25%',
      //   marginLeft: '5%'
      // },
      events: {
        init: '@read @loadModules @sendData @detailArea.render'
      },
      actions: {
          read(){
            const isField = ams.utils.getQueryString('type') === 'field';
            const materielId = ams.utils.getQueryString('materielId');
            let data;
            let source = fieldData;
            for(let i = 0; i < source.length; i++){
                if (source[i].materielId == materielId) {
                    data = source[i];
                    break;
                }
            }
            console.log(data);
            // this.data = {
            //     ...this.data,
            //     ...data
            // }
            try {
                data.content = new Function(`return ${data.content}`)();
            // console.log(data.content);
            } catch (error) {
            data.content = {};
            }
            data.author = data.content.author || '';
            data.tags = data.content.tags || '';
            this.setBlockData(data);
          },
        loadModules() {
          return new Promise((resolve, reject) => {
            let cdn = [];
            if (this.data.content.cdn) {
              // 拷贝一份cdn依赖
              cdn = this.data.content.cdn.slice(0);
            }
            const isField = /^field\-/.test(this.data.name);
            cdn.push(
              `https://h5rsc.vipstatic.com/ams/${
                isField ? 'fields' : 'block'
              }/${this.data.name}@${this.data.version}.js`
            );
            loadAll(
              cdn,
              () => {
                console.log('load all');
                resolve();
              },
              () => {
                console.error('what the fuck, load cdn script fail');
              }
            );
            // return Promise.all(cdn.map( name => loadAmsJS(name) ))
          });
        },
        // read() {
        //   return new Promise((resolve, reject) => {
        //     this.$ams.actions.read.call(this, {
        //       success(res) {
        //         if (res.data && res.data.code === 0) {
        //           const data = res.data.data;
        //           try {
        //             data.content = new Function(`return ${data.content}`)();
        //             // console.log(data.content);
        //           } catch (error) {
        //             data.content = {};
        //           }
        //           data.author = data.content.author || '';
        //           data.tags = data.content.tags || '';
        //           this.setBlockData(data);
        //           resolve();
        //         }
        //       }
        //     });
        //   });
        // },
        sendData() {
          return this.data;
        }
      },
      blocks: {
        baseTitle: {
          type: 'title',
          options: {
            title: '基础信息'
          },
          slot: 'top'
        },
        infoTitle: {
          type: 'title',
          options: {
            title: '物料说明'
          },
          slot: 'field:updateTime'
        }
      }
    },
    detailImage: {
      type: 'component',
      opitons: {
        is: 'div'
      },
      props: {
        id: 'ams-material-detail-image'
      }
    },
    detailArea: {
      type: 'component',
      options: {
        is: 'div'
      },
      // style: {
      //   width: '70%'
      // },
      props: {
        id: 'ams-material-detail-area'
      },
      actions: {
        render({ $prevReturn }) {
          // console.log($prevReturn)
          let { readme, content, image, name, version } = $prevReturn;
          const isField = /^field\-/.test(name);
          const moduleName = name.replace(/^(?:field|block)-/, '');
          if (content.amsConfig) {
            AMS_CONFIG[isField ? 'field' : 'block'][moduleName] =
              content.amsConfig;

            ams.block('detailAmsConfig', {
              type: 'ams-config',
              options: {
                type: isField ? 'field' : 'block',
                name: moduleName
              }
            });
          } else {
            ams.block('detailAmsConfig', {
              type: 'component',
              options: {
                is: 'center',
                text: '该物料暂未支持可视化配置'
              },
              style: {
                'line-height': '100px'
              }
            });
          }
          this.block.blocks.push('detailAmsConfig');

          if (image) {
            document.getElementById(
              'ams-material-detail-image'
            ).innerHTML = `<img class="ams-material-detail-img" src="${image}"/>`;
          }
          // 安装使用
          let pkgName = `${isField ? 'field' : 'block'}-${moduleName}`;
          let pkgVarName = moduleName.replace(/\-/g, '');
          console.log('pkgVarName', pkgVarName, moduleName, moduleName.replace(/\-/g, ''))
          let cdnLinks = content.cdn && content.cdn.map(url => {
            return `<script src="${url}"></script>`
          }).join('\n');
          if(cdnLinks){
            cdnLinks = `<!-- 引用依赖 -->\n` + cdnLinks;
          } else {
            cdnLinks = ''
          }
          const str = `### 通过npm安装（依赖node环境）
下载物料
\`\`\`sh
npm i --save @ams-team/${pkgName}
\`\`\`
安装物料
\`\`\`js
import ${pkgVarName} from '@ams-team/${pkgName}';
Vue.use(${pkgVarName});
\`\`\``;
          document.getElementById(
            'ams-material-howto-install'
          ).innerHTML = `<div class="markdown">${new MarkdownIt().render(
            str
          )}</div>`;

          // readme
          let html = `<div class="markdown">${
            readme
              ? new MarkdownIt().render(readme)
              : '<center style="line-height: 100px">暂无相关信息</center>'
          }</div>`;
          document.getElementById(
            'ams-material-detail-content'
          ).innerHTML = html;
        }
      },
      blocks: []
    },
    howToInstall: {
      type: 'component',
      options: {
        is: 'div'
      },
      props: {
        id: 'ams-material-howto-install'
      }
    },
    detailContent: {
      type: 'component',
      options: {
        is: 'div'
      },
      props: {
        id: 'ams-material-detail-content'
      }
    }
  }
};

export default blockConfig;
