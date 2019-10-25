export default {
	unitselectField1: {
		type: 'form',
		resource: {
			fields: {
				unitselectFieldA: {
					type: 'unitselect',
					label: '单位选择',
					units: ["毫米", "厘米", "分米", "千米"]
				},
				unitselectFieldB: {
					type: 'unitselect',
					label: '带默认单位',
					units: ["毫米", "厘米", "分米", "千米"],
					defaultUnit: "千米"
				},
				unitselectFieldC: {
					type: 'unitselect',
					label: '带默认值',
					units: ["毫米", "厘米", "分米", "千米"],
					default: "100分米"
				}
			}
		},
		ctx: 'edit'
	},
	unitselectField2: {
		type: 'form',
		resource: {
			fields: {
				unitselectFieldA: {
					type: 'unitselect',
					label: '单位选择',
					units: ["毫米", "厘米", "分米", "千米"]
				},
				unitselectFieldB: {
					type: 'unitselect',
					label: '带默认单位',
					units: ["毫米", "厘米", "分米", "千米"],
					defaultUnit: "千米"
				},
				unitselectFieldC: {
					type: 'unitselect',
					label: '带默认值',
					units: ["毫米", "厘米", "分米", "千米"],
					default: "100分米"
				}
			}
		},
		data: {
			unitselectFieldA: '10厘米',
			unitselectFieldB: '1000千米',
		},
		ctx: 'view'
	},
	unitselectField3: {
		type: 'form',
		resource: {
			fields: {
				unitselectFieldD: {
					type: 'unitselect',
					label: '公司名称',
					units: ["股份有限公司", "外商独资公司"],
					default: "股份有限公司",
					props: {
						unitWidth: '150px'
					}
				}
			}
		},
		ctx: 'edit'
	},
	unitselectField4: {
		type: 'form',
		resource: {
			fields: {
				url: {
					type: 'unitselect',
					label: '网址',
					defaultUnit: 'http://',
					units: ['http://', 'https://'],
					style: {
						width: '50%'
					},
					props: {
						slot: 'prepend',
						unitWidth: '100px'
					}
				},
				url2: {
					type: 'unitselect',
					label: '网址',
					defaultUnit: '.com',
					units: ['.com', '.cn'],
					style: {
						width: '50%'
					},
					props: {
						slot: 'append',
						unitWidth: '100px'
					}
				}
			}
		},
		ctx: 'edit'
	}
};
