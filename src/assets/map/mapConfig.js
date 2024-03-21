export function getMapConfig(
    mapName = 'attach-china',
    tooltip,
    {
        piece,
        provinceColor
    },
    dataList,
) {
    const baseOptions = {
        tooltip,
        visualMap: {
            show: true,
            x: 'left',
            y: 'bottom',
            pieces: [
                {start: -1, end: -1, label: '暂无数据'},
                ...piece
            ],
            color: provinceColor,
            controller: {
                outOfRange: {
                    color: '#ccc'
                }
            },
            itemWidth: 10,
            itemHeight: 10,
            align: 'left',
            itemGap: 3,
            textGap: 5,
            textStyle: {
                color: '#999',
                fontSize: 8,
                fontFamily: 'Arial'
            }
        },
        geo: {
            show: true,
            map: mapName,
            // zoom: isProvinceMap ? 1 : 1.2, // zoom 在 resize 时有 bug
            // roam: true,
            // scaleLimit: {
            //     min: 1,
            //     max: 2
            // },
            top: 5,
            bottom: -85,
            layoutCenter: ['50%', '50%'],
            // aspectScale: 1,
            selectedMode: 'single',
            select: {
                itemStyle: {
                    borderColor: '#000'
                }
            },
            label: {
                normal: {
                    show: true,
                    fontSize: 8,
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    color: 'rgba(0,0,0,1)'
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                color: '#EEEEEE',
                normal: {
                    areaColor: '#EEEEEE',
                    borderWidth: 0.3,
                    borderColor: '#555'
                }
            },
            emphasis: {
                areaColor: '#C7FFFD'
            },
            regions: [
                {
                    name: '南海诸岛',
                    label: {
                        show: false,
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        borderWidth: 0,
                        areaColor: '#555',
                        emphasis: {
                            areaColor: '#555'
                        }
                    }
                }, {
                    name: '陆地边界线',
                    label: {
                        show: false
                    },
                    selectedMode: 'single',
                    itemStyle: {
                        borderJoin: 'round',
                        borderColor: '#000',
                        borderWidth: 2
                    },
                    emphasis: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    },
                    select: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    }
                },
                {
                    name: '新疆边界线',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderJoin: 'round',
                        borderWidth: 0.5
                    },
                    emphasis: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    },
                    select: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    }
                },
                {
                    name: '上海海上边界线',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderJoin: 'round',
                        borderColor: '#aaa',
                        borderWidth: 0.5
                    },
                    emphasis: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    },
                    select: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    }
                },
                {
                    name: '海南海上边界线',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderJoin: 'round',
                        borderColor: '#aaa',
                        borderWidth: 0.5
                    },
                    emphasis: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    },
                    select: {
                        disabled: true,
                        label: {
                            show: false
                        }
                    }
                },
                {
                    name: '新疆',
                    itemStyle: {
                        borderWidth: 0
                    }
                }
            ]
        },
        series: [
            {
                type: "map",
                map: mapName, // 引入地图数据
                geoIndex: 0,
                data: dataList
            },
        ]
    };
    return baseOptions;
}

export function getTooltipConfig(style, index = 0, searchLinkMap) {
    return {
        className: 'virus-map-tootip',
        trigger: "item",
        triggerOn: 'click',
        transitionDuration: 0.1,
        padding: 6,
        borderWidth: 0,
        backgroundColor: 'rgba(50, 50, 50, 0.7)',
        extraCssText: 'text-align: left;border-radius: 5px; z-index: 99;',
        confine: true,
        enterable: true,
        formatter: function(params) {
            const data = params.data || {};
            const isShowData = params && params.data && params.data.name && params.data.value;
            const href = `baiduboxapp://v1/browser/open?url=${encodeURIComponent(searchLinkMap[data.name])}`;
            return isShowData ? `<div class="${style['virus-map-tips']}">
                <div>
                    <div class="${style['virus-map-tips-area']}">地区：${data.name}</div>
                    <div>${index === 0 ? '搜索比例' : '问诊比例' }：${data.value}</div>
                </div>
                <div
                    class="${style['virus-map-tips-more']} virus-map-tips-detail"
                    data-href="${href}"
                >详情</div>
            </div>` : null;
        }
    };
}
