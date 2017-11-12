/**
 * Created by Administrator on 2017/11/12.
 */

/****
 *
 *文本鼠标移入消失，移出显示
 *
 ***/
var ososo = document.getElementsByClassName('soso');

function txtChange(obj,str){   // 封装一个文本处理函数
    obj.onfocus =  function(){
        if(this.value==str){
            this.value ='';
        }
    }
    obj.onblur =  function(){
        if(this.value==''){
            this.value =str;
        }
    }
}
txtChange(ososo,'Search Website');
/****
 *
 *鼠标点击出现，移出消失
 *
 ***/
var opic=document.getElementsByClassName("pic")[0];
var oSpan=opic.getElementsByTagName("span");
var lButton=document.getElementById("cutL");
var rButton=document.getElementById("cutR");

oSpan[0].onmouseover=function(){
    lButton.style.display="block";
};
oSpan[0].onmouseout=function(){
    lButton.style.display="none";
};
oSpan[1].onmouseover=function(){
    rButton.style.display="block";
};
oSpan[1].onmouseout=function(){
    rButton.style.display="none";
};
/****
 *
 *图片的淡入淡出
 *
 ***/
function fadeIn(el){
    var iCur = getStyle(el,'opacity');
    if(iCur == 1){return false};
    var value = 0;
    clearInterval(el.timer);
    el.timer=setInterval(function(){
        var iSpeed = 5;
        if(value==100){
            clearInterval(el.timer)
        }else{
            value +=iSpeed;
            el.style.opacity = value/100;
            el.style.filter="alpha(opacity="+value+")";
        }
    },30)
}
function fadeOut(el){
    var iCur = getStyle(el,'opacity');
    if(iCur == 0){return false};
    var value = 100;
    clearInterval(el.timer);
    el.timer=setInterval(function(){
        var iSpeed = -5;
        if(value==0){
            clearInterval(el.timer)
        }else{
            value +=iSpeed;
            el.style.opacity = value/100;
            el.style.filter="alpha(opacity="+value+")";
        }
    },30)
}
var oUl = document.getElementById("pics");
var oLi = oUl.getElementsByTagName("li");
var iNow = 0;
var timId=null;
/****
 *
 *图片的自动播放
 *
 ***/
function autoPlay(){
    if(iNow==oLi.length-1){
        iNow = 0;
    }else{
        iNow++;
    }
    for(var i=0;i<oLi.length;i++){
        fadeOut(oLi[i])
    }
    fadeIn(oLi[iNow]);
}
timId =  setInterval(autoPlay,2000);
opic.onmouseover = function(){
    clearInterval(timId);
};
opic.onmouseout = function(){
    timId =  setInterval(autoPlay,2000);
};
/****
 *
 *左右键的控制
 *
 ***/
lButton.onclick = function(){
    clearInterval(timId);
    if(iNow==0){
        iNow = 2;
    }else{
        iNow--;
    }
    for(var i=0;i<oLi.length;i++){
        fadeOut(oLi[i])
    }

    fadeIn(oLi[iNow]);
};
rButton.onclick = function(){
    clearInterval(timId);
    if(iNow==oLi.length-1){
        iNow = 0;
    }else{
        iNow++;
    }
    for(var i=0;i<oLi.length;i++){
        fadeOut(oLi[i])
    }

    fadeIn(oLi[iNow]);
};
/*last图片轮播*/
function moveList(obj,old,iTarget){
    clearInterval(obj.timer)
    obj.timer=setInterval(function(){
        var iSpeed = (iTarget-old)/10;
        // 整除
        iSpeed = iSpeed>0 ? Math.ceil(iSpeed):Math.floor(iSpeed);
        if(iTarget==old){
            clearInterval(obj.timer)
        }else{
            old +=iSpeed;
            obj.style.left = old + 'px';
        }
    },30)
}
(function(){
    var oRunList = document.getElementsByClassName("featured")[0];
    var oUl = oRunList.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oRollBtnL = document.getElementById('toleft');
    var oRollBtnR = document.getElementById('toright');
    var ind = 0;
    oUl.innerHTML +=oUl.innerHTML;
    // 一定要重新计算 oUl的宽度
    oUl.style.width = aLi.length*aLi[0].offsetWidth + 'px';
    oRollBtnR.onclick = function(){
        if(ind>=aLi.length/2){
            ind = 0;
            oUl.style.left = 0;
        }
        moveList(oUl,-ind*aLi[0].offsetWidth,-(ind+1)*aLi[0].offsetWidth);
        ind++;
    };
    oRollBtnL.onclick = function(){
        if(ind==0){
            ind = aLi.length/2;
            oUl.style.left = -oUl.offsetWidth/2 + 'px';
        }
        moveList(oUl,-ind*aLi[0].offsetWidth,-(ind-1)*aLi[0].offsetWidth);
        ind--;
    }
})();

