/*****************************
 * 新增快捷和正常投注
 *****************************/
/*by 2b 快速投注思路：
 *   1.在选中每个项目的时候将金额填写进入该项目的隐藏input当中。
 *   2.在进行快捷投注和一般投注的切换的时候将所有input的type和值全部清空
 *   3.在提交表单之前：如果是快速投注，则将所有已被选中的input的值置为#ALLMONEY的值,
 *   4.在确定提交表单之前，将所有的input清空？
 * */
/*
 * @describe 将所有已被选中的input充值，并清空val
 * @param input_selecter 输入框选择器
 * @param selected  输入框是否被选中的选择器名称*/
function clean_inputs(input_selecter, selected) {
    $(input_selecter + selected).each(function () {
        $(this).removeClass(selected).val('');
    });
}
function fill_inputs(input_selecter, money_src_selecter) {
    $(input_selecter).each(function () {
        $(this).val($(money_src_selecter).val());
    })
}

var how_to_fill_input = new Array();
how_to_fill_input['h1'] = 'k1_h1';
how_to_fill_input['h2'] = 'k1_h2';
how_to_fill_input['h3'] = 'k1_h5';
how_to_fill_input['h4'] = 'k1_h6';
how_to_fill_input['h5'] = 'k1_h3';
/*how_to_fill_input['h6'] = 'k1_h4';*/
how_to_fill_input['h7'] = 'k1_h7';
/*how_to_fill_input['h8'] = 'k1_h8';*/
/*以上为总和一套*/
for (var i = 1; i <= 8; i++) {
    how_to_fill_input['ah2' + i] = 't1_h2' + i;//第一球大~和数双
}

/*龙虎 h4 h8*/
how_to_fill_input['ah36'] = 't1_h36';
how_to_fill_input['ah37'] = 't1_h37';

for (var i = 1; i <= 8; i++) {
    how_to_fill_input['bh2' + i] = 't2_h2' + i;//第二球大~合数双
}

/*龙虎 h4 h8*/
how_to_fill_input['bh36'] = 't2_h36';
how_to_fill_input['bh37'] = 't2_h37';


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['ch2' + i] = 't3_h2' + i;//第三球大~合数双
}

/*龙虎 h4 h8*/
how_to_fill_input['ch36'] = 't3_h36';
how_to_fill_input['ch37'] = 't3_h37';


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['dh2' + i] = 't4_h2' + i;//第四球大~合数双
}

/*龙虎 h4 h8*/
how_to_fill_input['dh36'] = 't4_h36';
how_to_fill_input['dh37'] = 't4_h37';


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['eh2' + i] = 't5_h2' + i;//第五球大~合数双
}


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['fh2' + i] = 't6_h2' + i;//第六球大~合数双
}


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['gh2' + i] = 't7_h2' + i;//第七球大~合数双
}


for (var i = 1; i <= 8; i++) {
    how_to_fill_input['hh2' + i] = 't8_h2' + i;//第八球大~合数双
}


function kuijie() {
    $('#td_input_money').show();
    $('#td_input_money1').show();
    if ($('#kuijie').attr('class') != 'intype_hover') {
        $('#kuijie').attr('class', 'intype_hover');
        $('#yiban').attr('class', 'intype_normal');
        $('#touzhu_type').attr('value', 'fast');//区分快捷投注和一般投注，用在submitform函数里面
        var i = 0;
        /*by wjl 快速投注思路，第二部代码*/
        clean_inputs('input.inp1', 'selected');

        $('.loads').each(function () {
            //var w = $(this).prev().width();
            //w+=$(this).width()/2;
            //$(this).prev().attr('align','center');
            //$(this).prev().css('width', 132 );
            //$(this).prev().prev().css('width', $(this).prev().prev().width()+$(this).width()/2 );
            $(this).hide();
            //$(this).css('display','none');
        })

        //处理表格
        $('table.wqs').each(function () {
            if ($(this).find("colgroup").size() > 0) {
                var td_num = $(this).find("tr").eq(2).find("td:visible").length;

                $(this).find("colgroup").html("");
                //计算宽度
                var td_width = 99 / td_num;
                var colgroup_str = '';
                for (var i = 0; i < td_num; i++) {
                    colgroup_str += '<col style="width:' + td_width + '%">';
                }
                $(this).find("colgroup").html(colgroup_str);
            }
        })

        $('.wqs').find('.t_list_caption').find('td').each(function () {
            if ($(this).attr('colspan') >= 3) {
                var n = $(this).attr('colspan') - $(this).attr('colspan') / 3
                $(this).attr('colspan', n);
            }
        })
        /*添加效果*/
        $('.caption_1,.o').bind({'mouseenter': function () {
            if ($(this).attr('title') != '选中') { //未选中
                if ($(this).attr('class') == 'o' && $(this).prev().attr('class') == 'caption_1') {
                    $(this).css({'background-color': '#ffd094', 'cursor': 'pointer'});
                    $(this).prev().css({'background-color': '#ffd094', 'cursor': 'pointer'});
                }
                if ($(this).attr('class') == 'caption_1' && $(this).next().attr('class') == 'o') {
                    $(this).next().css({'background-color': '#ffd094', 'cursor': 'pointer'});
                    $(this).css({'background-color': '#ffd094', 'cursor': 'pointer'});
                }
            }

        }, 'mouseleave': function () {
            if ($(this).attr('title') != '选中') { //未选中
                if ($(this).attr('class') == 'o' && $(this).prev().attr('class') == 'caption_1') {
                    $(this).css({'background-color': '#fff', 'cursor': 'pointer'});
                    $(this).prev().css({'background-color': '#FDF8F2', 'cursor': 'pointer'});
                }
                if ($(this).attr('class') == 'caption_1' && $(this).next().attr('class') == 'o') {
                    $(this).next().css({'background-color': '#fff', 'cursor': 'pointer'});
                    $(this).css({'background-color': '#FDF8F2', 'cursor': 'pointer'});
                }
            }
        }, 'click': function () {
            if ($(this).attr('class') == 'o' && $(this).prev().attr('class') == 'caption_1') {
                if ($(this).attr('title') == '选中') { //已选中 取消选中
                    $(this).css({'background-color': '#fff', 'cursor': 'pointer'});
                    $(this).prev().css({'background-color': '#FDF8F2', 'cursor': 'pointer'});
                    $(this).attr('title', '');
                    $(this).prev().attr('title', '');
                    $(this).parent().attr('selected', 'false');//设置父节点也就是tr为选中状态
                    $(this).next().find('input.inp1').removeClass('selected').val('');//将input的被选中状态关闭并清除其内容

                } else {												//选中
                    $(this).css({'background-color': '#ffc214', 'cursor': 'pointer'});
                    $(this).prev().css({'background-color': '#ffc214', 'cursor': 'pointer'});
                    $(this).attr('title', '选中');
                    $(this).prev().attr('title', '选中');
                    $(this).parent().attr('selected', 'true');
                    $(this).next().find('input.inp1').addClass('selected').val('');
                }
            }
            if ($(this).attr('class') == 'caption_1' && $(this).next().attr('class') == 'o') {
                if ($(this).attr('title') == '选中') { //已选中 取消选中
                    $(this).next().css({'background-color': '#fff', 'cursor': 'pointer'});
                    $(this).css({'background-color': '#FDF8F2', 'cursor': 'pointer'});
                    $(this).attr('title', '');
                    $(this).next().attr('title', '');
                    $(this).parent().attr('selected', 'false');//设置父节点也就是tr为选中状态
                    $(this).next().next().find('input.inp1').removeClass('selected').val('');//将input的被选中状态关闭并清除其内容

                } else {												//选中
                    $(this).next().css({'background-color': '#ffc214', 'cursor': 'pointer'});
                    $(this).css({'background-color': '#ffc214', 'cursor': 'pointer'});
                    $(this).attr('title', '选中');
                    $(this).next().attr('title', '选中');
                    $(this).parent().attr('selected', 'true');//设置父节点也就是tr为选中状态
                    $(this).next().next().find('input.inp1').addClass('selected').val('');
                }
            }

        }})
    }

}
function yiban() {
    if ($('#yiban').attr('class') != 'intype_hover') {
        $('#yiban').attr('class', 'intype_hover');
        $('#kuijie').attr('class', 'intype_normal');
        $('#touzhu_type').attr('value', 'ordinary');//区分快捷投注和一般投注，用在submitform函数里面

        /*by wjl 快速投注思路，第二部代码*/
        clean_inputs('input.inp1', 'selected');


        $('.o').each(function () {
            //$(this).width( 45 );
            $(this).next().show();
        })

        //处理表格
        $('table.wqs').each(function () {
            if ($(this).find("colgroup").size() > 0) {
                var td_num = $(this).find("tr").eq(2).find("td:visible").length;

                $(this).find("colgroup").html("");
                //计算宽度
                var td_width = 99 / td_num;
                var colgroup_str = '';
                for (var i = 0; i < td_num; i++) {
                    colgroup_str += '<col style="width:' + td_width + '%">';
                }
                $(this).find("colgroup").html(colgroup_str);
            }
        })

        $('.wqs').find('.t_list_caption').find('td').each(function () {
            if ($(this).attr('colspan') >= 2) {
                var n = $(this).attr('colspan') + $(this).attr('colspan') / 2
                $(this).attr('colspan', n);
            }
        })

    }
    //去除点击事件
    $('.caption_1,.o').unbind('mouseenter').unbind('mouseleave').unbind('click');
    $('.caption_1').css({'background-color': '#FDF8F2', 'cursor': ''});
    $('.o').css({'background-color': '#fff', 'cursor': ''});

    $('#td_input_money').hide();
    $('#td_input_money1').hide();
}

function MyReset() {
    $('.caption_1').css({'background-color': '#FDF8F2', 'cursor': ''});
    $('.o').css({'background-color': '#fff', 'cursor': ''});
    $('.caption_1').attr('title', '');
    $('.o').attr('title', '');
    $('.inp1').val('');
    $('#AllMoney').val('');
    $('#AllMoney1').val('');
}

function AllMoney() {
    var sel = false;
    var money = $('#AllMoney').val() != '' ? $('#AllMoney').val() : $('#AllMoney1').val();
    $('.loads').each(function () {
        if ($(this).prev().attr('title') == '选中') { //已选中
            $(this).find('input').val(money);
            sel = true;
        }
    })
    return sel;
}

function iSubmit() {
    if ($('#kuijie').attr('class') == 'intype_hover') {
        var sel = AllMoney();
        if (sel == false) {
            my_alert('您未选择号码！');
            return false;
        }
    }
    return true;
}

/**************************************/

var _url = "../ajax/oddsJson_cn.php";
var _endtime, _opentime, _refreshtime, _openNumber, _lock = false;
var setResults = new Array();

$(function () {
    $("#dp").attr("action", "./inc/DataProcessing.php?t=" + encodeURI($("#tys").html()));

    loadInfo(false);
    loadTime();
    setOpnumberTirem();
    if (getCookie("soundbut") == "on" || getCookie("soundbut") == null || getCookie("soundbut") == "") {
        SetCookie("soundbut", "on");
        $("#soundbut").attr("value", "on");
        $("#soundbut").attr("src", "images/soundon.png");
    } else {
        $("#soundbut").attr("value", "off");
        $("#soundbut").attr("src", "images/soundoff.png");
    }

    $('#kuijie').bind('click', function () {
        kuijie();
    })
    $('#yiban').bind('click', function () {
        yiban();
    })
    kuijie();
    if (typeof  common_action_set != undefined) {
        common_action_set(function () {
            submitforms();
        });
    }
});

/**
 * 開出號碼須加載
 */
function loadInfo(bool) {
    var win = $("#sy");
    var number = $("#number"); //開獎期數
    $.post(_url, {tid: 1}, function (data) {
        if (!data) {
            alert('loadInfo return data= NULL');
            return;
        }
        console.log(data);
        _Number(data.number, data.ballArr); //開獎號碼
        smlen(data);//雙面長龍
        win.html(data.winMoney); //今天輸贏
    }, "json");
    if (bool == true) {
        if ($("#soundbut").attr("value") == "on") {
            $("#look").html("<embed width=\"0\" height=\"0\" src=\"js/c.swf\" type=\"application/x-shockwave-flash\" hidden=\"true\" />");
        }
        kaijiang_sound();
    }
}
function _Number(number, ballArr) {
    var Clss = null;
    var idArr = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h"];
    $("#number").html(number);
    for (var i = 0; i < ballArr.length; i++) {
        Clss = "No_gd" + ballArr[i];
        $(idArr[i]).removeClass().addClass(Clss);
    }
}
function smlen(data) { //兩面長龍
    //for debug
    if (typeof(Simplized) == undefined) {
        alert('Simplized undefined');
    }
    if (data.num_arr != "") {
        var row_1Html = new Array();
        for (var key in data.num_arr) {
            row_1Html.push("<tr height=\"20\"><td class=\"caption_1\">" + Simplized(key) + "</td><td class=\"red\">" + data.num_arr[key] + "期</td></tr>");
        }
        var cHtml = '<tr class="t_list_caption"><th colspan="2">两面长龙排行</th></tr>';
        $("#cl").html(cHtml + row_1Html.join(""));
    }
    setResults[0] = data.row_1; //總和大小
    setResults[1] = data.row_2; //總和單雙
    setResults[2] = data.row_3; //總和尾數大小
    //setResults[3] = data.row_4; //龍虎
    var row_2Html = new Array();
    for (var k in data.row_1) {
        row_2Html.push(data.row_1[k]);
    }
    $("#z_cl").html(row_2Html.join(''));
    $(".z_cl:even").addClass("hhg");
}

function loadTime() {
    _openNumber = $("#o");
    $.post(_url, {tid: 2}, function (data) {
        if (!data)
            return;
        _openNumber.html(data.Phases);
        endtimes(data.endTime);
        opentimes(data.openTime);
        refreshTimes(data.refreshTime);
        loadodds(data.oddsList, data.endTime, data.Phases);
        loadinput(data.endTime);
    }, "json");
}

/**
 * 封盤時間
 */
function endtimes(endtime) {
    var endTime = $("#endTime"); //封盤時間
    _endtime = endtime;
    if (_endtime > 1)
        endTime.html(settime(_endtime));
    var interval = setInterval(function () {


        if (_endtime < 10 && _endtime > 0) {
            if ($("#soundbut").attr("value") == "on") {
                $("#look").html("<embed width=\"0\" height=\"0\" src=\"js/d.swf\" type=\"application/x-shockwave-flash\" hidden=\"true\" />");
            }
        }


        if (_endtime <= 1) { //封盤時間結束
            clearInterval(interval);
            endTime.html("00:00");
            loadodds(null, endtime, null);		//關閉賠率
            loadinput(-1); 				//關閉輸入框
            return false;
        }
        _endtime--;
        endTime.html(settime(_endtime));
    }, 1000);
}

/**
 * 開獎時間
 */
function opentimes(opentime) {
    var openTime = $("#endTimes"); //開獎時間
    _opentime = opentime;
    if (_opentime > 1)
        openTime.html(settime(_opentime));
    var interval = setInterval(function () {
        if (_opentime <= 1) { //開獎時間結束
            clearInterval(interval);
            _lock = true;
            _refreshtime = 5;
            openTime.html("00:00");
            //开奖时间结束也就是要开下一期的时候：要刷新左侧的注单
            window.parent.leftFrame.$('#new_orders').html('');
            window.parent.leftFrame.$('#used_money').html('0');
            return false;
        }
        _opentime--;
        openTime.html(settime(_opentime));
    }, 1000);
}

/**
 * 90秒刷新
 */
function refreshTimes(refreshtime) {
    _refreshtime = refreshtime;
    var refreshTime = $("#endTimea"); //刷新時間
    refreshTime.html(_refreshtime);
    var interval = setInterval(function () {
        if (_refreshtime <= 1) { //刷新時間結束
            clearInterval(interval);
            $.post(_url, {tid: 2}, function (data) {
                if (!data) {
                    return
                }
                if (_lock == true) {
                    endtimes(data.endTime);
                    opentimes(data.openTime);
                    loadinput(data.endTime);
                    _openNumber.html(data.Phases);
                    setOpnumberTirem();//加載開獎號碼
                    _lock = false;
                }
                _endtime = data.endTime;
                _opentime = data.openTime;
                _refreshtime = data.refreshTime;
                loadodds(data.oddsList, _endtime, data.Phases);
                refreshTimes(_refreshtime);
            }, "json");
            return false;
        }
        _refreshtime--;
        refreshTime.html(_refreshtime);
    }, 1000);
}

/**
 * 加載賠率
 */
function loadodds(oddslist, endtime, number) {
    var a = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var odds, link, urls;
    if (oddslist == null || oddslist == "" || endtime < 1) {
        $(".o").html("");
        return false;
    }
    for (var n = 0; n < oddslist.length; n++) {
        for (var i in oddslist[n]) {
            odds = oddslist[n][i];
            urls = "fn.php?v=" + number + "&n=" + i + "&t=t" + (n + 1);
            link = "<span class=\"bgh\">" + odds + "</span>";
            $("#" + a[n] + i).html(link);
            $("#" + i).html(link);
        }
    }
}

/**
 * 加載輸入框
 */
function loadinput(endtime) {
    /*var loads = $(".loads");
     var count=0, lock1=lock2=lock3=lock4=1, lock5=5, s, n="封盤";
     loads.each(function(){
     count++;
     if (count>=9 && count <= 40){
     s = "t"+lock1+"_h2"+lock2;
     lock1++;
     if (lock1 == 5) {lock1 =1;lock2++;}
     } else if (count >=41 && count <= 72){
     s = "t"+lock5+"_h2"+lock3;
     lock5++;
     if (lock5 == 9) {lock5 =5;lock3++;}
     } else {
     s = "k1_h"+lock4;
     lock4++;
     }

     if (endtime >1)
     {	n = "<input name=\""+s+"\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"this.className='inp1m'\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"9\"/>"
     }
     $(this).html(n);
     });*/

    var input_html_str;

    if (endtime <= 1) {//若是即将封盘，则不加载
        return;
    }

    for (var tmp in how_to_fill_input) {
        input_html_str = "<input name=\"" + how_to_fill_input[tmp] + "\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"this.className='inp1m'\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"9\"/>";
        $('#' + tmp).next().html(input_html_str);
    }
}

function settime(time) {
    var MinutesRound = Math.floor(time / 60);
    var SecondsRound = Math.round(time - (60 * MinutesRound));
    var Minutes = MinutesRound.toString().length <= 1 ? "0" + MinutesRound : MinutesRound;
    var Seconds = SecondsRound.toString().length <= 1 ? "0" + SecondsRound : SecondsRound;
    var strtime = Minutes + ":" + Seconds;
    return strtime;
}

function digitOnly($this) {
    var n = $($this);
    var r = /^\+?[1-9][0-9]*$/;
    if (!r.test(n.val())) {
        n.val("");
    }
}

function setOpnumberTirem() {
    var opnumber = $("#number").html();
    var nownumer = $("#o").html();
    if (opnumber != "") {
        var _nownumber = parseInt(nownumer);
        var sum = _nownumber - parseInt(opnumber);
        if (sum == 2) {
            var interval = setInterval(function () {
                $.post(_url, {tid: 3}, function (data) {
                    if (!data) {
                        return;
                    }
                    if (_nownumber - parseInt(data) == 1) {
                        clearInterval(interval);
                        loadInfo(true);
                        return false;
                    }
                }, "text");
            }, 3000);
        }
    } else {
        setTimeout(setOpnumberTirem, 1000);
    }
}


function submitforms() {
    if (iSubmit() == false)return false;
    $.post("../ajax/Default.ajax.php", { typeid: "sessionId"}, function () {
    });
    var mixmoney = parseInt($("#mix").val()); //最低下注金額
    var input = $("input.inp1");
    var c = true, s, n;
    var count = 0;
    var countmoney = 0;
    var upmoney = 0;
    var names = new Array();
    var sArray = "";
    var ball_array = new Array();
    var odd_array = new Array();
    var money_array = new Array();
    //快速投注所需要的
    //if ($('#touzhu_type').attr('value') != 'fast') {
    input.each(function () {
        var value = $(this).val();
        if (value != "") {
            value = parseInt(value);
            if (value < mixmoney) c = false;
            count++;
            countmoney += value;
            s = nameformat($(this).attr("name").split("_"));//TODO:这里是咋整的，input死哪里去了？？？？
            s[2] = $("#" + s[2] + "").text();
            if (s[0] == "總和、龍虎") {
                n = s[1] + " @ " + s[2] + " x ￥" + value;
                ball_array.push(s[1]);
            } else {
                n = s[0] + "[" + s[1] + "] @ " + s[2] + " x ￥" + value;
                ball_array.push(s[0] + ' ' + s[1]);
            }
            odd_array.push(s[2]);
            money_array.push(value);
            names.push(n + "\n");
            console.log(s);
            sArray += s + "," + value + "|";
        }
    });
    /* } else {
     $(".t_td_text[selected='true']").each(function () {
     var typename;
     count++;
     countmoney += $('#AllMoney').val();
     //typename=$(this).attr('name');
     //names.push(typename);
     //todo:项目名称
     s = nameformat($(this).find('input').attr("name").split("_"));
     s[2] = $("#" + s[2] + " a").html();
     if (s[0] == "總和、龍虎")
     n = s[1] + " @ " + s[2] + " x ￥" + $('#AllMoney').val();
     else
     n = s[0] + "[" + s[1] + "] @ " + s[2] + " x ￥" + $('#AllMoney').val();
     names.push(n + "\n");
     sArray += s + "," + $('#AllMoney').val() + "|";
     });*/
    if (count == 0) {
        my_alert("您输入类型不正确或没有输入实际金额");
        return false;
    }
    if (c == false) {
        my_alert("最低下注金额：" + mixmoney + "￥");
        return false;
    }
    /*	var confrims = "共 ￥"+countmoney+" / "+count+"筆，確定下註嗎？\n\n下註明細如下：\n\n";
     confrims +=names.join('');
     if (confirm(confrims)){
     input.val("");*/
    MyReset();
    var number = $("#o").html();
    var s_type = '<input type="hidden" name="sm_arr" value="' + sArray + '"><input type="hidden" name="s_number" value="' + number + '">';
    $(".actiionn").html(s_type);
    /*		return setTimeout(function(){return true}, 3000);
     }*/
    submit_confirm(ball_array, odd_array, money_array);
    return false;
}

function nameformat(array) {
    var arr = new Array(), h;
    switch (array[0]) {
        case "t1" :
            h = "a";
            arr[0] = "第一球";
            break;
        case "t2" :
            h = "b";
            arr[0] = "第二球";
            break;
        case "t3" :
            h = "c";
            arr[0] = "第三球";
            break;
        case "t4" :
            h = "d";
            arr[0] = "第四球";
            break;
        case "t5" :
            h = "e";
            arr[0] = "第五球";
            break;
        case "t6" :
            h = "f";
            arr[0] = "第六球";
            break;
        case "t7" :
            h = "g";
            arr[0] = "第七球";
            break;
        case "t8" :
            h = "h";
            arr[0] = "第八球";
            break;
        case "k1" :
            arr[0] = "總和、龍虎";
            break;
    }
    switch (array[1]) {
        case "h1":
            arr[1] = '總和大';
            arr[2] = "h1";
            break;
        case "h2":
            arr[1] = '總和單';
            arr[2] = "h2";
            break;
        case "h3":
            arr[1] = '總和尾大';
            arr[2] = "h5";
            break;
        case "h4":
            arr[1] = '龍';
            arr[2] = "h6";
            break;
        case "h5":
            arr[1] = '總和小';
            arr[2] = "h3";
            break;
        case "h6":
            arr[1] = '總和雙';
            arr[2] = "h4";
            break;
        case "h7":
            arr[1] = '總和尾小';
            arr[2] = "h7";
            break;
        case "h8":
            arr[1] = '虎';
            arr[2] = "h8";
            break;
        case "h21":
            arr[1] = '大';
            arr[2] = h + array[1];
            break;
        case "h22":
            arr[1] = '小';
            arr[2] = h + array[1];
            break;
        case "h23":
            arr[1] = '單';
            arr[2] = h + array[1];
            break;
        case "h24":
            arr[1] = '雙';
            arr[2] = h + array[1];
            break;
        case "h25":
            arr[1] = '尾大';
            arr[2] = h + array[1];
            break;
        case "h26":
            arr[1] = '尾小';
            arr[2] = h + array[1];
            break;
        case "h27":
            arr[1] = '合數單';
            arr[2] = h + array[1];
            break;
        case "h28":
            arr[1] = '合數雙';
            arr[2] = h + array[1];
            break;
        case "h36":
            arr[1] = '龙';
            arr[2] = h + array[1];
            break;
        case "h37":
            arr[1] = '虎';
            arr[2] = h + array[1];
            break;
    }
    return arr;
}

//
function getResult($this) {
    $(".nv_a").addClass("nv").removeClass("nv_a");
    $($this).removeClass("nv").addClass("nv_a");
    $(".nv_ab").removeClass("nv_ab");
    $($this).parent().addClass("nv_ab");
    var rowHtml = new Array();
    var data = stringByInt($($this).html());
    for (var k in data) {
        rowHtml.push(data[k]);
    }
    $("#z_cl").html(rowHtml.join(''));
    $(".z_cl:even").addClass("hhg");
}

function stringByInt(str) {
    switch (str) {
        case "总和大小" :
            return setResults[0];
        case "总和单双" :
            return setResults[1];
        case "总和尾数大小" :
            return setResults[2];
        case "龙虎" :
            return setResults[3];
    }
}


/*wjl change*/

/*快速投注设置金钱到所有的input上面*/
function fast_money_set(input_selecter_str, money_selecter_str) {
    var $input = $(input_selecter_str);
    var $money_selecter = $(money_selecter_str);
    $input.each(function () {
        $(this).val($money_selecter.val());
    });
}


