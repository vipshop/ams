import ams from '@ams-team/ams';

ams.block('grid', {
    blocks: {
        text1: {
            type: 'component',
            options: {
                is: 'h4',
                text: '一行两列：'
            }
        },
        grid1: {
            type: 'grid',
            style: {
                height: '200px',
                'grid-gap': '0'
            },
            blocks: {
                item1: {
                    type: 'component',
                    style: {
                        background: '#f60',
                        width: '50%',
                        height: '100%'
                    },
                    options: {
                        'text': 'item1'
                    }
                },
                item2: {
                    type: 'component',
                    style: {
                        background: '#f50',
                        width: '50%',
                        height: '100%'
                    },
                    options: {
                        'text': 'item2'
                    }
                }
            }
        },
        text2: {
            type: 'component',
            options: {
                is: 'h4',
                text: '一行两列，间距20px：'
            }
        },
        grid2: {
            type: 'grid',
            style: {
                height: '200px'
            },
            blocks: {
                grid2headerTitle1: {
                    type: 'card',
                    options: {
                        headerTitle: '卡片类型自带的标题'
                    },
                    style: {
                        width: 'calc(50% - 10px)',
                        height: '100%',
                        'margin-right': '10px'
                    },
                    blocks: {
                        emptyCardTextGrid21: {
                            type: 'component',
                            options: {
                                is: 'div',
                                text: '自定义内容，没有标题'
                            }
                        }
                    }
                },
                grid2headerTitle2: {
                    type: 'card',
                    options: {
                        headerTitle: '卡片类型自带的标题'
                    },
                    style: {
                        width: 'calc(50% - 10px)',
                        height: '100%',
                        'margin-left': '10px'
                    },
                    blocks: {
                        emptyCardTextGrid22: {
                            type: 'component',
                            options: {
                                is: 'div',
                                text: '自定义内容，没有标题'
                            }
                        }
                    }
                }
            }
        },
        text3: {
            type: 'component',
            options: {
                is: 'h4',
                text: '一行三列，间距20px：'
            }
        },
        grid3: {
            type: 'grid',
            style: {
                height: '200px',
                'grid-template-columns': '1fr 1fr 1fr'
            },
            blocks: {
                grid3emptyCardBlock1: {
                    type: 'card',
                    blocks: {
                        emptyCardTextGrid31: {
                            type: 'component',
                            options: {
                                is: 'div',
                                text: '自定义内容'
                            }
                        },
                        emptyCardTextGrid32: {
                            slot: 'header',
                            type: 'title',
                            options: {
                                title: '标题类型的主标题',
                                subTitle: '标题类型的副标题'
                            }
                        }
                    }
                },
                grid3emptyCardBlock2: {
                    type: 'card',
                    blocks: {
                        emptyCardTextGrid33: {
                            type: 'component',
                            options: {
                                is: 'div',
                                text: '自定义内容'
                            }
                        },
                        emptyCardTextGrid34: {
                            slot: 'header',
                            type: 'title',
                            options: {
                                title: '标题类型的主标题',
                                subTitle: '标题类型的副标题'
                            }
                        }
                    }
                },
                grid3emptyCardBlock3: {
                    type: 'card',
                    blocks: {
                        emptyCardTextGrid35: {
                            type: 'component',
                            options: {
                                is: 'div',
                                text: '自定义内容'
                            }
                        },
                        emptyCardTextGrid36: {
                            slot: 'header',
                            type: 'title',
                            options: {
                                title: '标题类型的主标题',
                                subTitle: '标题类型的副标题'
                            }
                        }
                    }
                }
            }
        },
        text4: {
            type: 'component',
            options: {
                is: 'h4',
                text: '两行两列（每个网格里面继续用网格布局），间距20px：'
            }
        },
        grid4: {
            type: 'grid',
            style: {
                height: '620px',
                'grid-template-columns': '1fr 1fr',
                'grid-template-rows': '1fr 1fr'
            },
            blocks: {
                grid4cardBlock5: {
                    type: 'card',
                    blocks: {
                        titleBlock3: {
                            type: 'title',
                            slot: 'header',
                            options: {
                                title: '任务区'
                            }
                        },
                        componentBlock5: {
                            type: 'grid',
                            style: {
                                'grid-template-columns': '1fr 1fr 1fr 1fr',
                                'grid-template-rows': '1fr 1fr'
                            },
                            blocks: {
                                icon1: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(238, 112, 109);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;\"><i class="el-icon-place"></i></div><p style="margin: 12px 0 0;font-size:12px;">终本案件 <span style="color: #ff3000;">0</span></p>'
                                    }
                                },
                                icon2: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(94, 131, 251);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-edit-outline"></i></div><p style="margin: 12px 0 0;font-size:12px;">登记立案待立案 <span style="color: #ff3000;">1</span></p>'
                                    }
                                },
                                icon3: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(247, 218, 71);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-refresh-left"></i></div><p style="margin: 12px 0 0;font-size:12px;">待恢复立案 <span style="color: #ff3000;">3</span></p>'
                                    }
                                },
                                icon4: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(88, 202, 154);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-s-release"></i></div><p style="margin: 12px 0 0;font-size:12px;">本案立案庭拒签 <span style="color: #ff3000;">0</span></p>'
                                    }
                                },
                                icon5: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(94, 131, 251);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-document"></i></div><p style="margin: 12px 0 0;font-size:12px;">已收案待立案 <span style="color: #ff3000;">1</span></p>'
                                    }
                                },
                                icon6: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(247, 218, 71);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-s-promotion"></i></div><p style="margin: 12px 0 0;font-size:12px;">已收案待发送 <span style="color: #ff3000;">2</span></p>'
                                    }
                                },
                                icon7: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(88, 202, 154);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-finished"></i></div><p style="margin: 12px 0 0;font-size:12px;">已申请保全待立案 <span style="color: #ff3000;">0</span></p>'
                                    }
                                },
                                icon8: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="background: rgb(238, 112, 109);margin: 0 auto;width: 40px;height: 40px;padding: 8px 0;text-align: center;border-radius: 8px;color:#fff;font-size:24px;"><i class="el-icon-message"></i></div><p style="margin: 12px 0 0;font-size:12px;">执保已立案待发送 <span style="color: #ff3000;">1</span></p>'
                                    }
                                }
                            }
                        }
                    }
                },
                grid4cardBlock6: {
                    type: 'card',
                    blocks: {
                        titleBlock4: {
                            slot: 'header',
                            type: 'title',
                            options: {
                                title: '功能区'
                            }
                        },
                        componentBlock6: {
                            type: 'grid',
                            style: {
                                'grid-template-columns': '1fr 1fr 1fr 1fr',
                                'grid-template-rows': '1fr 1fr 1fr'
                            },
                            blocks: {
                                button1: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button2: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button3: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button4: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button5: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button6: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button7: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button8: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button9: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button10: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button11: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                },
                                button12: {
                                    type: 'component',
                                    options: {
                                        html: '<p style="border: 1px dashed #1861d5;cursor: pointer;overflow: hidden;font-size: 12px;text-align: center;white-space: nowrap;border-radius: 12px;text-overflow: ellipsis;background-color: #e2edff;line-height: 24px;">变更承办人</p>'
                                    }
                                }
                            }
                        }
                    }
                },
                grid4cardBlock7: {
                    type: 'card',
                    blocks: {
                        titleBlock5: {
                            slot: 'header',
                            type: 'title',
                            options: {
                                title: '预警区'
                            }
                        },
                        componentBlock7: {
                            type: 'grid',
                            style: {
                                height: '180px',
                                'align-content': 'center',
                                'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
                            },
                            blocks: {
                                iconButton1: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="margin:0 auto; width: 50px;height: 50px;padding: 10px 0;position: relative;border-radius: 8px;background: rgb(94, 131, 251); color:#fff;font-size: 28px;"><i class="el-icon-time"></i><div style="top: -6px;color: #fff;width: 18px;right: -6px;height: 18px;position: absolute;font-size: 12px;line-height: 18px;border-radius: 50%;background-color: #ff3000;">1</div></div><p style="margin-top: 12px;font-size:12px;">已经到期未办理</p>'
                                    }
                                },
                                iconButton2: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="margin:0 auto; width: 50px;height: 50px;padding: 10px 0;position: relative;border-radius: 8px;background: rgb(247, 218, 71); color:#fff;font-size: 28px;"><i class="el-icon-time" style="transform: rotate(72deg);"></i><div style="top: -6px;color: #fff;width: 18px;right: -6px;height: 18px;position: absolute;font-size: 12px;line-height: 18px;border-radius: 50%;background-color: #ff3000;">1</div></div><p style="margin-top: 12px;font-size:12px;">距离到期还有1天</p>'
                                    }
                                },
                                iconButton3: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="margin:0 auto; width: 50px;height: 50px;padding: 10px 0;position: relative;border-radius: 8px;background: rgb(88, 202, 154); color:#fff;font-size: 28px;"><i class="el-icon-time" style="transform: rotate(144deg)"></i><div style="top: -6px;color: #fff;width: 18px;right: -6px;height: 18px;position: absolute;font-size: 12px;line-height: 18px;border-radius: 50%;background-color: #ff3000;">1</div></div><p style="margin-top: 12px;font-size:12px;">距离到期还有5天</p>'
                                    }
                                },
                                iconButton4: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="margin:0 auto; width: 50px;height: 50px;padding: 10px 0;position: relative;border-radius: 8px;background: rgb(238, 112, 109); color:#fff;font-size: 28px;"><i class="el-icon-time" style="transform: rotate(200deg)"></i><div style="top: -6px;color: #fff;width: 18px;right: -6px;height: 18px;position: absolute;font-size: 12px;line-height: 18px;border-radius: 50%;background-color: #ff3000;">1</div></div><p style="margin-top: 12px;font-size:12px;">距离到期还有15天</p>'
                                    }
                                },
                                iconButton5: {
                                    type: 'component',
                                    style: {
                                        'text-align': 'center'
                                    },
                                    options: {
                                        html: '<div style="margin:0 auto; width: 50px;height: 50px;padding: 10px 0;position: relative;border-radius: 8px;background: rgb(144, 68, 255); color:#fff;font-size: 28px;"><i class="el-icon-time" style="transform: rotate(288deg);"></i><div style="top: -6px;color: #fff;width: 18px;right: -6px;height: 18px;position: absolute;font-size: 12px;line-height: 18px;border-radius: 50%;background-color: #ff3000;">1</div></div><p style="margin-top: 12px;font-size:12px;">距离到期还有30天</p>'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
