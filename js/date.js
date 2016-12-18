var calUtil = {
    //当前日历显示的年份
    showYear: 2015,
    //当前日历显示的月份
    showMonth: 1,
    //当前日历显示的天数
    showDays: 1,

    showCalendar: function (list, point, duplicated, rewardString) {
        calUtil.init(point, duplicated, rewardString);

        $(".cancel").click(function () {
            $(".container").remove();
        });

        $(".container").on("touchmove",function(event){
            event.preventDefault();
        });

        calUtil.setupDate(list);
    },

    //初始化日历
    init: function (point,duplicated, rewardString) {
        calUtil.setMonthAndDay();
        
        //绑定日历
        var str = calUtil.drawCal(calUtil.showYear, calUtil.showMonth);
        $("body").append(str);
        //绑定日历表头
        if (duplicated) {
            $(".calendar_month_span").append("<p class='sign_font'><span>今天签过啦！已领</span><span class='number'>"+point+"</span><span>马豆</span></p>");

        } else {
            $(".calendar_month_span").append("<p class='sign_font'><span>签到成功，今日已领</span><span class='number'>"+point+"</span><span>马豆</span></p>");
        }

        if (rewardString) {
            $(".calendar_month_span").append("<p class='continue_font'>"+rewardString+"</p>");
        }
    },
    
    setupDate: function (list) {
        var dateObj = {};
        var signList = [];
        $.each(list, function (index, item) {
            var dateNew = new Date(item);
            var dateSign = String(dateNew.getDate());
            var dateSignMonth = String(dateNew.getMonth() + 1);

            dateObj = {"signDay": dateSign, "month": dateSignMonth};
            signList.push(dateObj);
        });
        console.log(signList);

        //获取所有的日期节点
        var dateAll = $("td");
        var currentDate = new Date();
        var dateMonth = currentDate.getMonth();
        var lastMonth = $(".last").attr("month", dateMonth);
        var nextMonth = $(".next").attr("month", dateMonth + 2);
        var currentMonth = $(".current").attr("month", dateMonth + 1);

        //获取列表的上月日期；
        function ifLastMonth(signList, iMonth) {
            var lastMonth = [];
            $.each(signList, function (index, item) {
                if (item.month == iMonth) {
                    lastMonth.push(item.signDay);
                }
            })
            return lastMonth;
        }

        //获取列表的当月日期；
        function ifCurrentMonth(signList, iMonth) {
            var currentMonth = [];
            $.each(signList, function (index, item) {
                if (item.month == iMonth + 1) {
                    currentMonth.push(item.signDay);
                }
            })
            return currentMonth;
        }

        var ifLast = ifLastMonth(signList, dateMonth);
        var ifCurrent = ifCurrentMonth(signList, dateMonth);

       	//判断签到所在的月份填充签到 日期；
		if(ifCurrent.length==0){
			onlyLastSigned(lastMonth,ifLast);
		}
		if(ifLast.length==0){
			onlyCurrentSigned(currentMonth,ifCurrent);
		}
		if((ifCurrent.length!=0)&&(ifLast.length!=0)){
			mixLastSigned(lastMonth,ifLast);
			mixCurrentSigned(currentMonth,ifCurrent);
		}
		
		//只有上个月签到的日期；
		function onlyLastSigned(lastMonth,ifLast){
		   for(var i=0;i<lastMonth.length;i++){
		   		$.each(ifLast,function(index,item){
		    		if((item == $(lastMonth[i]).html())&&(index!=0)&&(index!=(ifLast.length-1))) {
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("continue");
		    		}
		    		if((item == $(lastMonth[i]).html())&&(index==0)&&(ifLast.length==1)) {
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("on");
		    		}
		    		if((item == $(lastMonth[i]).html())&&(index==0)&&(ifLast.length>1)) {
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("continue-left");
		    		}
		    		if((item == $(lastMonth[i]).html())&&(index==(ifLast.length-1))&&(ifLast.length>1)) {
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("continue-right");
		    		}
		   	});
		   }
		}
		//只有当月签到的日期；
		function onlyCurrentSigned(currentMonth,ifCurrent){
		   for(var i=0;i<currentMonth.length;i++){
		   		$.each(ifCurrent,function(index,item){
		    		if((item == $(currentMonth[i]).html())&&(index!=0)&&(index!=(ifCurrent.length-1))) {
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("continue");
		    		}
		    		if((item == $(currentMonth[i]).html())&&(index==0)&&(ifCurrent.length==1)) {
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("on");
		    		}
		    		if((item == $(currentMonth[i]).html())&&(index==0)&&(ifCurrent.length>1)){
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("continue-left");
		    		}
		    		if((item == $(currentMonth[i]).html())&&(index==(ifCurrent.length-1))&&(ifCurrent.length>1)) {
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("continue-right");
		    		}
		   	});
		   }
		}
		//都有签到时上个月的日期；
		function mixLastSigned(lastMonth,ifLast){
			for(var i=0;i<lastMonth.length;i++){
		   		$.each(ifLast,function(index,item){
		    		if((item == $(lastMonth[i]).html())&&(index!=0)&&(ifLast.length>1)){
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("continue");
		    		}
		    		if((item == $(lastMonth[i]).html())&&(index==0)) {
		    			$(lastMonth[i]).removeClass("last");
		     			$(lastMonth[i]).addClass("continue-left");
		    		}
		   		});
		   }
		}
		//都有签到时当月的日期；
		function mixCurrentSigned(currentMonth,ifCurrent){
			for(var i=0;i<currentMonth.length;i++){
		   		$.each(ifCurrent,function(index,item){
		    		if((item == $(currentMonth[i]).html())&&(index!=(ifCurrent.length-1))&&(ifCurrent.length>1)){
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("continue");
		    		}
		    		if((item == $(currentMonth[i]).html())&&(index==(ifCurrent.length-1))){
		    			$(currentMonth[i]).removeClass("current");
		     			$(currentMonth[i]).addClass("continue-right");
		    		}
		   		});
		   }
		}						
    },

    //获取当前选择的年月
    setMonthAndDay: function () {
        var current = new Date();
        calUtil.showYear = current.getFullYear();
        calUtil.showMonth = current.getMonth() + 1;
    },
    //获取当前年月的最后一天的日期
    getDaysInmonth: function (iMonth, iYear) {
        var dPrevDate = new Date(iYear, iMonth, 0);
        return dPrevDate.getDate();
    },

    //生成日期列表
    bulidCal: function (iYear, iMonth) {
        var aMonth = new Array();
        aMonth[0] = new Array(7);
        aMonth[1] = new Array(7);
        aMonth[2] = new Array(7);
        aMonth[3] = new Array(7);
        aMonth[4] = new Array(7);
        aMonth[5] = new Array(7);
        aMonth[6] = new Array(7);
        var dCalDate = new Date(iYear, iMonth - 1, 1);
        var dCalNext = new Date(iYear, iMonth, 1);
        var dCalLast = new Date(iYear, iMonth - 1, 0);
        var iDayOfNext = dCalNext.getDay();
        var iDayOfLast = dCalLast.getDay();
        var iDayOfFirst = dCalDate.getDay();
        var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
        var iDaysLastInMonth = calUtil.getDaysInmonth(iMonth - 1, iYear);
        var iVarDate = 1;
        var iVarNext = 1;
        var d, w, m;
        aMonth[0][0] = "日";
        aMonth[0][1] = "一";
        aMonth[0][2] = "二";
        aMonth[0][3] = "三";
        aMonth[0][4] = "四";
        aMonth[0][5] = "五";
        aMonth[0][6] = "六";

        //上一个月日期补全；
        if (iDayOfFirst !== 0) {
            for (m = iDayOfLast; m >= 0; m--) {
                aMonth[1][m] = iDaysLastInMonth;
                iDaysLastInMonth--;
            }
        }
        //当月日期填充；
        for (d = iDayOfFirst; d < 7; d++) {
            aMonth[1][d] = iVarDate;
            iVarDate++;
        }
        for (w = 2; w < 7; w++) {
            for (d = 0; d < 7; d++) {
                if (iVarDate <= iDaysInMonth) {
                    aMonth[w][d] = iVarDate;
                    iVarDate++;
                }
                
                //下一个月日期补全；
                if((iVarDate==iDaysInMonth)&&(iDayOfNext!==0)){
                	for(m=iDayOfNext;m<7;m++){
                		aMonth[w][m] = iVarNext;
                		iVarNext++;
                	}
                }
            }
        }
        return aMonth;
    },
    //判断标记的天数；
//ifHasSigned : function(signList,day){
// var signed = false;
// $.each(signList,function(index,item){
//  if(item.signDay == day) {
//   signed = true;
//   return false;
//  }
// });
// return signed ;
//},
    //判断上个月天数；
    ifLastMonth: function (myMonth, w) {
        var last = false;
        if ((myMonth >= 23) && (w == 1)) {
            last = true;
        }
        return last;
    },
    //判断下个月天数；
    ifNextMonth: function (myMonth, w) {
        var next = false;
        if ((myMonth < 7) && (w > 4)) {
            next = true;
        }
        return next;
    },
    //生成日期节点
    drawCal: function (iYear, iMonth) {
        var myMonth = calUtil.bulidCal(iYear, iMonth);
        var htmls = new Array();

        htmls.push("<div class='container'><div id='calendar'>");
        htmls.push("<div class='sign_main' id='sign_layer'>");
        htmls.push("<div class='sign_succ_calendar_title'>");
        htmls.push("<div class='calendar_month_next'></div>");
        htmls.push("<div class='calendar_month_prev'></div>");
        htmls.push("<div class='calendar_month_span'></div>");
        htmls.push("<div class='cancel'></div>");
        htmls.push("</div>");
        htmls.push("<div class='sign' id='sign_cal'>");
        htmls.push("<table>");
        htmls.push("<tr class='fl-top'>");
        htmls.push("<th>" + myMonth[0][0] + "</th>");
        htmls.push("<th>" + myMonth[0][1] + "</th>");
        htmls.push("<th>" + myMonth[0][2] + "</th>");
        htmls.push("<th>" + myMonth[0][3] + "</th>");
        htmls.push("<th>" + myMonth[0][4] + "</th>");
        htmls.push("<th>" + myMonth[0][5] + "</th>");
        htmls.push("<th>" + myMonth[0][6] + "</th>");
        htmls.push("</tr>");
        var d, w;

        //开始生成日期节点
        for (w = 1; w < 7; w++) {
            htmls.push("<tr>");
            for (d = 0; d < 7; d++) {
                var ifLast = calUtil.ifLastMonth(myMonth[w][d], w);
                var ifNext = calUtil.ifNextMonth(myMonth[w][d], w);

                //判断日期月份种类；
                if (ifLast) {
                    htmls.push("<td class='last'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                }
                if (ifNext) {
                    htmls.push("<td class='next'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                }
                if ((!ifLast) && (!ifNext)) {
                    htmls.push("<td class='current'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
                }

            }
            htmls.push("</tr>");
        }
        htmls.push("</table>");
        htmls.push("</div>");
        htmls.push("</div>");
        htmls.push("</div></div>");
        return htmls.join('');
    }
};
