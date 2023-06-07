import * as echarts from 'echarts';

// 折线图/柱状图/折线图
export const OptionBar = () => ({
  title: {
    text: '',
    subtext: '',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    padding: 20
  },
  color: ['#4AA4FB', '#51D1DE', '#4BDB86', '#BBF26D', '#FCFBAA'],
  legend: {
    bottom: '5%',
    data: [],
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 50,
    textStyle: {
      color: '#fff'
    }
  },
  grid: {

  },
  tooltip: {
    // borderColor: 'transparent', // 气泡边框颜色
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#fff',
        type: 'solid'
      }
    },
    textStyle: {
      fontSize: 12// 气泡字体
    },
    transitionDuration: 0 // 防止浏览器抖动
  },
  dataZoom: [], // 区域缩放
  xAxis: {
    type: 'category',
    data: [],
    name: '',
    boundaryGap: true, // 两边留白
    axisLine: {
      lineStyle: {
        color: 'transparent'
      }
    },
    axisLabel: {
      fontSize: 13,
      color: '#fff',
      interval: 'auto'
    },
    splitLine: {
      show: false
    },
    axisTick: {},
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 13,
      color: '#fff',
      align: 'right',
      lineHeight: 74,
      verticalAlign: 'top'
    }
  },
  yAxis: {
    type: 'value',
    name: '',
    nameLocation: 'end',
    nameTextStyle: {
      fontSize: 13,
      color: '#fff',
      align: 'right'
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    axisLabel: {
      fontSize: 13,
      color: '#fff'
    },
    splitLine: {
      show: false
    },
    axisTick: {}
  },
  series: []
});

// 里程
export const OptionMileage = () => ({
  title: {
    text: '',
    textStyle: {
      color: '#0f0f0f',
      fontSize: 17
    },
    padding: 20
  },
  color: ['#4AA4FB', '#51D1DE', '#4BDB86', '#BBF26D', '#FCFBAA'],
  legend: {
    show: false,
    top: 'bottom',
    data: []
  },
  tooltip: {
    trigger: 'axis',
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    textStyle: {
      color: '#000000',
      fontSize: 13
    },
    axisPointer: {
      type: 'none'
    },
    borderColor: 'transparent' // 气泡边框颜色
  },
  angleAxis: {
    type: 'category',
    data: []
  },
  radiusAxis: {
    z: 15
  },
  polar: {
    radius: [40, '85%'],
    center: ['50%', '50%']
  },
  series: []
});

// 驯鹿
export const OptionXunlu = () => ({
  title: {
    text: '',
    textStyle: {
      fontSize: 17,
      color: '#0f0f0f'
    },
    padding: 20
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    borderColor: 'transparent' // 气泡边框颜色
  },
  grid: {

  },
  xAxis: {
    data: [],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#666',
      fontSize: 12
    }
  },
  yAxis: {
    splitLine: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { show: false }
  },
  color: ['#4FDFB3', '#F7B400'],
  series: [
    {
      name: '',
      type: 'pictorialBar',
      barCategoryGap: '-130%',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      // 图形上方显示数值
      label: {
        show: true, // 开启显示
        position: 'top', // 在上方显示
        color: '#666',
        fontWeight: 'bold',
        fontSize: 12
      },
      itemStyle: {
        opacity: 1,
        color: new echarts.graphic.LinearGradient(
          0,
          1,
          0,
          0,
          [
            {
              offset: 1,
              color: '#4FDFB3' // 0% 处的颜色
            },
            {
              offset: 0,
              color: '#0BB6E1' // 100% 处的颜色
            }
          ],
          false
        )
      },
      emphasis: {
        itemStyle: {
          opacity: 0.7
        }
      },
      data: [],
      z: 10
    }
  ]
});

// 中国地图
export const OptionMap = () => ({
  title: {
    text: '',
    textStyle: {
      fontSize: 17,
      color: '#0f0f0f'
    },
    padding: 20
  },
  geo: {
    map: '',
    roam: false, // 一定要关闭拖拽
    zoom: 1,
    center: [], // 调整地图位置
    label: {
      normal: {
        show: false, // 关闭省份名展示
        fontSize: '10',
        color: 'rgba(0,0,0,0.7)'
      },
      emphasis: {
        show: false
      }
    }
  },
  tooltip: {
    triggerOn: 'mousemove', // mousemove、click
    borderColor: 'transparent', // 气泡边框颜色
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    formatter: function(e:any) {
      let data = e.data;
      if (!data) {
        data = {
          name: '',
          value: 0,
          cnt: 0
        };
      }
      let res = `<div class="formatter-name">${e.name}</div>`;
      res += `
        <div class="formatter-box">
          <span class="formatter-circle" style="background: ${e.color};"></span> <span class="formatter-title">活跃车辆</span><span class="formatter-value">${data.value}台/天</span>
        </div>
      `;
      return res;
    }
  },
  visualMap: {
    min: 0,
    max: 100,
    left: '5%',
    bottom: '8%',
    text: ['高', '低'],
    calculable: true,
    color: ['#4FDFB3', '#0BB6E1', '#F0F0F0']
  },
  series: [
    {
      type: 'map',
      map: '',
      roam: false,
      zoom: 1,
      center: [],
      showLegendSymbol: false, // 存在legend时显示
      label: {
        normal: {
          show: false,
          color: '#fff'
        },
        emphasis: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#F0F0F0',
          borderColor: '#f5f5f5',
          borderWidth: 2
        },
        emphasis: {
          areaColor: '#C7F4CC'
        }
      },
      select: {
        label: {
          show: false
        }
        // itemStyle: {
        //   areaColor: '#4FDFB3'
        // }
      },
      data: []
    }
  ]
});

// 桑基图
export const OptionSankey = () => ({
  color: ['#4AA4FB', '#51D1DE', '#4BDB86', '#BBF26D', '#FCFBAA'],
  title: {
    text: '',
    textStyle: {
      fontSize: 17,
      color: '#0f0f0f'
    },
    padding: 20
  },
  tooltip: {
    borderColor: 'transparent' // 气泡边框颜色
  },
  series: {
    type: 'sankey',
    layout: 'none',
    nodeWidth: 30,
    nodeGap: 20,
    left: '4%',
    top: '6%',
    right: '7%',
    bottom: '8%',
    emphasis: {
      focus: 'adjacency' // 除了当前项 其余隐藏
    },
    data: [],
    links: [],
    levels: [
      {
        depth: 0,
        itemStyle: {
          color: 'rgba(112, 124, 254, 0.8)'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.2
        }
      },
      {
        depth: 1,
        itemStyle: {
          color: 'rgba(45, 198, 253, 0.8)'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.2
        }
      },
      {
        depth: 2,
        itemStyle: {
          color: 'rgba(79, 223, 179, 0.8)'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.2
        }
      },
      {
        depth: 3,
        itemStyle: {
          color: 'rgba(247, 184, 31, 0.8)'
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.2
        }
      }
    ]
  }
});

// 自定义仪表
export const OptionGroup = () => ({
  animationEasing: _animationEasingUpdate,
  animationDuration: _animationDuration,
  animationDurationUpdate: _animationDurationUpdate,
  animationEasingUpdate: _animationEasingUpdate,
  dataset: {
    source: []
  },
  tooltip: {
    transitionDuration: 0,
    formatter: (params:any) => {
      let res = '';
      res += `
        <div class="formatter-box">
          <span class="formatter-circle" style="background: linear-gradient(to top,#4FDFB3,#0BB6E1)"></span> <span class="formatter-title">${params.seriesName}</span><span class="formatter-value">${params.data[1]}%</span>
        </div>
      `;

      return res;
    },
    borderColor: 'transparent' // 气泡边框颜色
  },
  angleAxis: {
    type: 'value',
    startAngle: 0,
    show: false,
    min: 0,
    max: _valOnRadianMax
  },
  radiusAxis: {
    type: 'value',
    show: false
  },
  title: {
    text: '',
    textStyle: {
      fontSize: 17,
      color: '#0f0f0f'
    },
    padding: 20
  },
  polar: {},
  series: [
    {
      type: 'custom',
      name: '激活成功率',
      coordinateSystem: 'polar',
      renderItem: renderItem
    }
  ]
});

const _panelImageURL = '/custom-gauge-panel.png';
const _animationDuration = 1000;
const _animationDurationUpdate = 1000;
const _animationEasingUpdate = 'quarticInOut';
const _valOnRadianMax = 100;
const _outerRadius = 90;
const _innerRadius = 70;
const _pointerInnerRadius = 30;
const _insidePanelRadius = 50;

function renderItem(params:any, api:any) {
  const valOnRadian = api.value(1);
  const coords = api.coord([api.value(0), valOnRadian]);
  const polarEndRadian = coords[3];
  const imageStyle = {
    image: _panelImageURL,
    x: params.coordSys.cx - _outerRadius,
    y: params.coordSys.cy - _outerRadius,
    width: _outerRadius * 2,
    height: _outerRadius * 2
  };
  return {
    type: 'group',
    children: [
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'sector',
          shape: {
            cx: params.coordSys.cx,
            cy: params.coordSys.cy,
            r: _outerRadius,
            r0: _innerRadius,
            startAngle: 0,
            endAngle: -polarEndRadian,
            transition: 'endAngle',
            enterFrom: { endAngle: 0 }
          }
        }
      },
      {
        type: 'image',
        style: imageStyle,
        clipPath: {
          type: 'polygon',
          shape: {
            points: makePionterPoints(params, polarEndRadian)
          },
          extra: {
            polarEndRadian: polarEndRadian,
            transition: 'polarEndRadian',
            enterFrom: { polarEndRadian: 0 }
          },
          during: function(apiDuring:any) {
            apiDuring.setShape(
              'points',
              makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
            );
          }
        }
      },
      {
        type: 'circle',
        shape: {
          cx: params.coordSys.cx,
          cy: params.coordSys.cy,
          r: _insidePanelRadius
        },
        style: {
          fill: '#fff',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 0,
          shadowColor: 'rgba(79, 223, 179, 0.2)'
        }
      },
      {
        type: 'text',
        extra: {
          valOnRadian: valOnRadian,
          transition: 'valOnRadian',
          enterFrom: { valOnRadian: 0 }
        },
        style: {
          text: makeText(valOnRadian),
          fontSize: 24, // 字号
          fontWeight: 700,
          x: params.coordSys.cx,
          y: params.coordSys.cy,
          fill: '#4FDFB3',
          align: 'center',
          verticalAlign: 'middle',
          enterFrom: { opacity: 0 }
        },
        during: function(apiDuring:any) {
          apiDuring.setStyle(
            'text',
            makeText(apiDuring.getExtra('valOnRadian'))
          );
        }
      }
    ]
  };
}
function convertToPolarPoint(renderItemParams:any, radius:any, radian:any) {
  return [
    Math.cos(radian) * radius + renderItemParams.coordSys.cx,
    -Math.sin(radian) * radius + renderItemParams.coordSys.cy
  ];
}
function makePionterPoints(renderItemParams:any, polarEndRadian:any) {
  return [
    convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
    convertToPolarPoint(
      renderItemParams,
      _outerRadius,
      polarEndRadian + Math.PI * 0.03
    ),
    convertToPolarPoint(renderItemParams, _pointerInnerRadius, polarEndRadian)
  ];
}
function makeText(valOnRadian:any) {
  // Validate additive animation calc.
  if (valOnRadian < -10) {
    alert('illegal during val: ' + valOnRadian);
  }
  return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + '%';
}

export const provinces = {
  // 23个省
  '台湾': 'taiwan',
  '河北': 'hebei',
  '山西': 'shanxi',
  '辽宁': 'liaoning',
  '吉林': 'jilin',
  '黑龙江': 'heilongjiang',
  '江苏': 'jiangsu',
  '浙江': 'zhejiang',
  '安徽': 'anhui',
  '福建': 'fujian',
  '江西': 'jiangxi',
  '山东': 'shandong',
  '河南': 'henan',
  '湖北': 'hubei',
  '湖南': 'hunan',
  '广东': 'guangdong',
  '海南': 'hainan',
  '四川': 'sichuan',
  '贵州': 'guizhou',
  '云南': 'yunnan',
  '陕西': 'shanxi1',
  '甘肃': 'gansu',
  '青海': 'qinghai',
  // 5个自治区
  '新疆': 'xinjiang',
  '广西': 'guangxi',
  '内蒙古': 'neimenggu',
  '宁夏': 'ningxia',
  '西藏': 'xizang',
  // 4个直辖市
  '北京': 'beijing',
  '天津': 'tianjin',
  '上海': 'shanghai',
  '重庆': 'chongqing',
  // 2个特别行政区
  '香港': 'xianggang',
  '澳门': 'aomen'
};
