import ams from '@ams-team/ams';

ams.block('carousel', {
    blocks: {
        carousel1Title: {
            type: 'title',
            options: {
                title: '普通文案竖排'
            }
        },
        carousel1: {
            type: 'carousel',
            options: {
                name1: '11111',
                name2: '22222',
                name3: '33333'
            },
            style: {
                'background-color': '#d3dce6'
            },
            props: {
                direction: 'vertical'
            }
        },
        carousel2Title: {
            type: 'title',
            options: {
                title: '普通文案横排（高度200px）'
            }
        },
        carousel2: {
            type: 'carousel',
            options: {
                name1: '11111',
                name2: '22222',
                name3: '33333'
            },
            style: {
                'background-color': '#d3dce6',
                'height': '200px'
            }
        },
        carousel3title: {
            type: 'title',
            options: {
                title: '带按钮横排'
            }
        },
        carousel3: {
            type: 'carousel',
            options: {
                name1: '11111',
                name2: '22222',
                name3: '33333'
            },
            props: {
            },
            style: {
                'background-color': '#d3dce6'
            },
            operations: {
                prev: {
                    type: 'button',
                    label: '上一张'
                },
                next: {
                    type: 'button',
                    label: '下一张'
                },
                setActiveItem: {
                    type: 'button',
                    label: '回到第一张'
                }
            },
            actions: {
                next() {
                    this.next();
                },
                prev() {
                    this.prev();
                },
                setActiveItem() {
                    this.setActiveItem(0);
                }
            }
        },
        carousel4title: {
            type: 'title',
            options: {
                title: '嵌套blocks'
            }
        },
        carousel4: {
            type: 'carousel',
            options: {
                carouselBlock1: '11111',
                carouselBlock2: '22222',
                carouselBlock3: '33333'
            },
            props: {
                'item-type': 'block'
            },
            blocks: {
                carouselBlock41: {
                    type: 'component',
                    options: {
                        is: 'el-rate'
                    },
                    props: {
                        value: 5
                    },
                    style: {
                        'height': '150px'
                    }
                },
                carouselBlock42: {
                    type: 'component',
                    options: {
                        is: 'div'
                    },
                    operations: {
                        test: {
                            type: 'button',
                            label: 'test'
                        }
                    },
                    style: {
                        'height': '150px'
                    }
                },
                carouselBlock43: {
                    type: 'component',
                    options: {
                        text: '第三页'
                    }
                }
            },
            style: {
                'background-color': '#d3dce6'
            },
            on: {
                change(val) {
                    console.log('change', val);
                }
            }
        },
        carousel5title: {
            type: 'title',
            options: {
                title: '卡片化'
            }
        },
        carousel5: {
            type: 'carousel',
            options: {
                carouselBlock1: '11111',
                carouselBlock2: '22222',
                carouselBlock3: '33333'
            },
            props: {
                type: 'card',
                'item-type': 'block'
            },
            blocks: {
                carouselBlock51: {
                    type: 'component',
                    options: {
                        is: 'el-rate'
                    },
                    props: {
                        value: 5
                    },
                    style: {
                        'height': '150px',
                        'background-color': '#fff'
                    }
                },
                carouselBlock52: {
                    type: 'component',
                    options: {
                        is: 'div'
                    },
                    operations: {
                        test: {
                            type: 'button',
                            label: 'test'
                        }
                    },
                    style: {
                        'height': '150px',
                        'background-color': '#fff'
                    }
                },
                carouselBlock53: {
                    type: 'component',
                    options: {
                        text: '第三页'
                    },
                    style: {
                        'background-color': '#fff'
                    }
                }
            },
            style: {
                'background-color': '#d3dce6'
            }
        },
        carousel6title: {
            type: 'title',
            options: {
                title: '图片'
            }
        },
        carousel6: {
            type: 'carousel',
            options: {
                carouselBlock1: '11111',
                carouselBlock2: '22222',
                carouselBlock3: '33333'
            },
            props: {
                type: 'card',
                'item-type': 'block'
            },
            blocks: {
                carouselBlock61: {
                    type: 'component',
                    options: {
                        is: 'img'
                    },
                    props: {
                        src: 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
                    },
                    style: {
                        height: '100%',
                        'object-fit': 'contain'
                    }
                },
                carouselBlock62: {
                    type: 'component',
                    options: {
                        is: 'img'
                    },
                    props: {
                        src: 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
                    },
                    style: {
                        height: '100%',
                        'object-fit': 'contain'
                    }
                },
                carouselBlock63: {
                    type: 'component',
                    options: {
                        is: 'img'
                    },
                    props: {
                        src: 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
                    },
                    style: {
                        height: '100%',
                        'object-fit': 'contain'
                    }
                }
            }
        }
    }
});
