export const fillChartsConfig = (config:any) => {
  const seriesFunction = function(item:any) {
    return {
      name: item.name,
      type: 'line',
      data: item.yAxisData,
      lineStyle: {
        color: item.topColor
      },
      step: config.showAlone ? 'middle' : false,
      itemStyle: {
        color: item.topColor,
        borderColor: item.topColor
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: item.topColor // 0% 处的颜色
          }, {
            offset: 1, color: item.bottomColor // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    };
  };
  let legendData = null;
  let xAxisData = null;
  const seriesData = [];
  if(config.children) {
    legendData = config.children.map((item:any) => item.name);
    xAxisData = config.children[0].xAxisData;
    config.children.forEach((item:any) => {
      seriesData.push(seriesFunction(item));
    });
  }else{
    xAxisData = config.xAxisData;
    seriesData.push(seriesFunction(config));
  }

  return {
    height: config.showAlone ? '50%' : '85%',
    textStyle: {
      color: '#fff'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#fff'
        }
      },
      formatter: config.showAlone ? function(params:any) {
        let res = params[0].name + '<br/>MIL状态：';
        let texts = '';
        if (params[0].value === 0 || params[0].value === '0') {
          texts = 'off';
        } else if (params[0].value === 1 || params[0].value === '1') {
          texts = 'on';
        }
        res = res + texts;
        return res;
      } : null
    },
    legend: {
      data: legendData,
      show: config.children,
      top: 10,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: 15,
      top: config.showAlone ? 10 : 40,
      right: 30,
      bottom: 30,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 1
          }
        },
        splitNumber: config.showAlone ? 1 : 5,
        axisLabel: {
          formatter: function(value:string|number) {
            const texts = [];
            if (value === 0 || value === '0') {
              texts.push('off');
            } else if (value === 1 || value === '1') {
              texts.push('on');
            }
            return config.showAlone ? texts : value;
          }
        }
      }
    ],
    series: seriesData
  };
};
