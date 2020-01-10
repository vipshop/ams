export default {
    defaultSteps: {
        type: 'steps',
        data: {
            active: 0
        },
        options: {
            step1: 'step1',
            step2: 'step2',
            step3: 'step3'
        },
        blocks: {
            step1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step1的内容'
                },
                style: {
                    padding: '100px',
                }
            },
            step2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step2的内容'
                },
                style: {
                    padding: '100px',
                }
            },
            step3: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step3的内容'
                },
                style: {
                    padding: '100px',
                }
            }
        },
        operations: {
            next: {
                type: 'button',
                label: '下一步',
                props: {
                    type: 'primary'
                }
            }
        },
        actions: {
            next() {
                let next = this.block.data.active = this.block.data.active + 1
                if (next >= Object.keys(this.block.blocks).length) {
                    this.block.data.active = 0
                    next = 0
                }
                this.setBlockData({
                    active: next
                })
            }
        }
    },
    descriptionSteps: {
        type: 'steps',
        data: {
            active: 0
        },
        options: {
            descriptionstep1: 'step1',
            descriptionstep2: 'step2',
            descriptionstep3: {
                title: 'step3',
                description: '这是一段很长很长很长的描述性文字'
            }
        },
        props: {
            'align-center': true
        },
        blocks: {
            descriptionstep1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step1的内容'
                },
                style: {
                    padding: '100px',
                }
            },
            descriptionstep2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step2的内容'
                },
                style: {
                    padding: '100px',
                }
            },
            descriptionstep3: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是step3的内容'
                },
                style: {
                    padding: '100px',
                }
            }
        },
        operations: {
            next: {
                type: 'button',
                label: '下一步',
                props: {
                    type: 'primary'
                }
            }
        },
        actions: {
            next() {
                let next = this.block.data.active = this.block.data.active + 1
                if (next >= Object.keys(this.block.blocks).length) {
                    this.block.data.active = 0
                    next = 0
                }
                this.setBlockData({
                    active: next
                })
            }
        }
    }
}