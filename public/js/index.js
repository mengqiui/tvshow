$(function () {
  echart01();
  tableAjax(tableInterval);
  setInterval(function(){
    blockData();
    // $(".number").each(function(){
    //   var arr = new Array(6);
    //   arr.push($(this).prop("id"));
    //   console.log(arr)
    // })
    $("#activeNum").leoTextAnimate({delay: 10, autorun: true, start: ''},"#activeNum")
    $("#allNum").leoTextAnimate({delay: 10, autorun: true, start: ''},"#allNum");
    $("#realTime").leoTextAnimate({delay: 10, autorun: true, start: ''},"#realTime");
    $("#allcal").leoTextAnimate({delay: 10, autorun: true, start: ''},"#allcal");
    $("#badall").leoTextAnimate({delay: 10, autorun: true, start: ''},"#badall");
    $("#badvol").leoTextAnimate({delay: 10, autorun: true, start: ''},"#badvol");
  },5000)
})

function echart01() {
  var myChart = document.getElementById('echarts01');
  var domtitle = document.getElementById("echarts01title");
  var myindex = 0;
  var mycolor = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#25f3e6'];
  function DrawPieArea(drawdom, piedata, color, curIndex, titleDom) {
    var option = {
      color: color,
      series: [{
        type: 'pie',
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        label: {
          normal: {show: false,position: 'center'},
          emphasis: {
            show: true,
            formatter: "\n{B|{c}}\n{S|{d}%}",
            textStyle: {
              fontSize: '18',
              fontWeight: 'bold',
              color: '#ddd',
              rich: {
                B: {fontSize: 18,fontWeight: 'bolder',},
                S: {fontSize: 14}
              },
            }
          }
        },
        labelLine: {normal: {show: false}},
        data: piedata
      }]
    };
    var chart_pie = echarts.init(drawdom);
    chart_pie.setOption(option, true);
    if (curIndex == null) {
      chart_pie.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 });
      if(titleDom) {
        titleDom.text = piedata[0].name;
        titleDom.style.color=color[0];
        }
    }else {
      chart_pie.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: curIndex });
      if(titleDom) {
        titleDom.innerHTML = piedata[curIndex].name;
        titleDom.style.color=color[curIndex];
        }
      setInterval(function () {
        var dataLen = piedata.length;
        // 取消高亮
        chart_pie.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: curIndex });
        curIndex = (curIndex + 1) % dataLen;
        if(titleDom) {
          titleDom.innerHTML = piedata[curIndex].name;
          titleDom.style.color=color[curIndex];
          }
        //设置高亮
        chart_pie.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: curIndex });
      }, 2000);
    }
  }
  var data = [
    { value: 335, name: '算力告警' },
    { value: 310, name: '风扇告警' },
    { value: 234, name: '温度告警' },
    { value: 135, name: '网络告警' },
    { value: 1548, name: '板卡告警' }
  ];
  DrawPieArea(myChart, data, mycolor, myindex, domtitle);
}

//表格数据刷新
var n = 0;
function tableInterval(){
  //table中最多可放置6条数据
  var strHtml = '';
  if(n%2==0){
    strHtml +=`
    <tr class="tr-error">
      <td>192.168.80.201</td>
      <td>实时上报测试${n++}</td>
      <td>05-29 15:54:35</td>
      <td>--</td>
    </tr>
  `;
  }else{
    strHtml +=`
    <tr class="tr-ok">
      <td>192.168.80.201</td>
      <td>实时上报测试${n++}</td>
      <td>05-29 15:54:35</td>
      <td>05-29 16:54:35</td>
    </tr>
  `;
  }
  var count = $("#modelData tr").length;
  if(count > 6){
    // 参数1 tableID,参数2 div高度，参数3 速度，参数4 插入数据长度
    tableScroll('tableId', 250, 30, 1)
  };
  $("#modelData").append(strHtml);
  
}
//表格初始数据获取
var tableAjax = function(callbackFn){
  var strHtml =`
    <tr class="tr-error">
      <td>192.168.80.201</td>
      <td>算力异常</td>
      <td>05-29 15:54:35</td>
      <td>--</td>
    </tr>
    <tr class="tr-ok">
      <td>192.168.80.69</td>
      <td>算力异常恢复</td>
      <td>05-29 15:54:35</td>
      <td>05-29 15:54:35</td>
    </tr>
  `;
  $("#modelData").html(strHtml+strHtml);
  if (callbackFn) setInterval(callbackFn, 5000); 
  
  
}

//三小块数据刷新
function blockData(){
  var data = {
    "one":[{"activeNum":5500,"allNum":6000},{"activeNum":2060,"allNum":3200},{"activeNum":3224,"allNum":5800},{"activeNum":1200,"allNum":6603},{"activeNum":3532,"allNum":6600},{"activeNum":5000,"allNum":6600}],
    "two":[{"realTime":300,"allcal":600},{"realTime":260,"allcal":320},{"realTime":86,"allcal":100},{"realTime":120,"allcal":240},{"realTime":66,"allcal":100},{"realTime":87,"allcal":125}],
    "three":[{"badvol":56,"badall":895},{"badvol":2,"badall":200},{"badvol":40,"badall":400},{"badvol":20,"badall":600},{"badvol":20,"badall":600},{"badvol":20,"badall":600}],
  }

  var index = Math.floor(Math.random()*(data.one.length+1));

  $("#activeNum").text(data.one[index].activeNum);
  $("#allNum").text(data.one[index].allNum);

  if(data.one[index].activeNum<4200){$("#activeNum").css("color","#ff4e4e")}
  else if(data.one[index].activeNum>5400){$("#activeNum").css("color","#32cd32")}
  $("#online").text((data.one[index].activeNum/data.one[index].allNum*100).toFixed(2)+'%');

  $("#realTime").text(data.two[index].realTime);
  $("#allcal").text(data.two[index].allcal);
  if(data.two[index].realTime<100){$("#realTime").css("color","#ff4e4e")}
  else if(data.two[index].realTime>200){$("#realTime").css("color","#32cd32")}
  $("#goodvol").text((data.two[index].realTime/data.two[index].allcal*100).toFixed(2)+'%');

  $("#badall").text(data.three[index].badall);
  $("#badvol").text(data.three[index].badvol);
  if(data.three[index].badvol<50){$("#badvol,.numberpei").css("color","#ff4e4e")}
  else if(data.three[index].badvol>50){$("#badvol,.numberpei").css("color","#32cd32")}
}

var MyMarhq;

function tableScroll(tableid, hei, speed, len) {
    clearTimeout(MyMarhq);
    $('#' + tableid).parent().find('.tableid_').remove()
    $('#' + tableid).parent().prepend(
        '<table class="tableid_"><thead>' + $('#' + tableid + ' thead').html() + '</thead></table>'
    ).css({
        'position': 'relative',
        'overflow': 'hidden',
        'height': hei + 'px'
    })
    $(".tableid_").find('th').each(function(i) {
        $(this).css('width', $('#' + tableid).find('th:eq(' + i + ')').width());
    });
    $(".tableid_").css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'z-index': 9
    })
    $('#' + tableid).css({
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'z-index': 1
    })

    // if ($('#' + tableid).find('tbody tr').length > len) {
    $('#' + tableid).find('tbody').html($('#' + tableid).find('tbody').html() + $('#' + tableid).find('tbody').html());
    $(".tableid_").css('top', 0);
    $('#' + tableid).css('top', 0);
    var tblTop = 0;
    var outerHeight = $('#' + tableid).find('tbody').find("tr").outerHeight();

    function Marqueehq() {
        if (tblTop <= -outerHeight * $('#' + tableid).find('tbody').find("tr").length) {
            tblTop = 0;
        } else {
            tblTop -= 1;
        }
        $('#' + tableid).css('margin-top', '-'+(len*36) + 'px');
        clearTimeout(MyMarhq);
        MyMarhq = setTimeout(function() {
            Marqueehq()
        }, speed);
    }

    MyMarhq = setTimeout(Marqueehq, speed);
    $('#' + tableid).find('tbody').hover(function() {
        clearTimeout(MyMarhq);
    }, function() {
        clearTimeout(MyMarhq);
        // if ($('#' + tableid).find('tbody tr').length > len) {
        //     MyMarhq = setTimeout(Marqueehq, speed);
        // }
    })
    // }

}



