// import {prefix} from '../../../utils/common'

const fields = {
	text: {
		label: '文本',
		type: 'text'
	},
	inputnumber: {
		type: 'inputnumber',
		label: '数字输入'
	},
	select: {
		type: 'select',
		label: 'select多选',
		props: {
			options: {
				a: '黄金糕',
				b: '双皮奶',
				c: '蚵仔煎',
				d: '龙须面',
				e: '北京烤鸭'
			}
		}
	}
}
export default {
	defaultList: {
		type: 'list',
		resource: {
			fields: fields
        },
        options: {
            watermark: true
        },
		data: {
			list: [{
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
			}]
		}
	},
	customList: {
		type: 'list',
		resource: {
			fields: fields
        },
        options: {
            watermark: {
                width: '200px', // 默认值300px
                height: '150px', // 默认值 200px
                textAlign: 'center', // 默认值center
                textBaseLine: 'middle', // 默认值middle
                font: '18px Microsoft Yahei', // 设置字体，默认为：18px Microsoft Yahei
                fillStyle: 'rgba(236, 234, 234, 1)', // 设置颜色，默认为：rgba(236, 234, 234, 0.8)
                content: 'zebin.wu', // 设置水印内容，默认为“请勿外传”
                rotate: '30', // 设置旋转角度，默认30
                zIndex: 1000 // 设置z-index层级，默认 
            }
        },
		data: {
			list: [{
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
			}]
		}
	}
};