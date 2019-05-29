echart01();
function echart01(){
  var myChart = echarts.init(document.getElementById('echarts01'));
  var option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        top: '10px',
        right:'5px',
        textStyle: {
          color: '#fff'
        },
        itemWidth:20,
        data:['算力告警','风扇告警','温度告警','网络告警','板卡告警']
      },
      series: [
        {
          name:'访问来源',
          type:'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'bold',
                    color: '#fff'
                  }
              }
          },
          labelLine: {
              normal: {
                show: false
              }
          },
          data:[
            {value:335, name:'算力告警'},
            {value:310, name:'风扇告警'},
            {value:234, name:'温度告警'},
            {value:135, name:'网络告警'},
            {value:1548, name:'板卡告警'}
          ]
        }
      ],
    color:['#ff7f50','#87cefa','#da70d6','#32cd32','#25f3e6']
  };
  myChart.setOption(option);
}
