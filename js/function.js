function $(selector,ranger=document){
	var type=typeof selector;
	// console.log(type);
	if(type=='string'){

		//获取
		var select=selector.trim();
		if(select.charAt(0)=='.'){
			return ranger.getElementsByClassName(select.substr(1));

		}
		else if(select.charAt(0)=='#'){
			return ranger.getElementById(select.substr(1));
		}
		//判断标签
		//正则对象/    /^开头$结尾  开头必须是字母开头
		//第一位a-zA-Z第二位a-zA-Z共九位
		else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
			return ranger.getElementsByTagName(select);
		}
		//创建元素  传入是<标签>
		else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
			return ranger.createElement(select.slice(1,-1));
		}

	}
	else if(type=='function'){
		//添加事件
		/*window.onload=function(){
			selector();//回调函数
		}*/

		addEvent(window,'load',selector);
	}
}


function html(obj,content){
	if(content){
		//设置
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}



//封装  一个指定元素的子元素节点
function getChilds(obj){
	let childs=obj.childNodes;
	let arr=[];
	childs.forEach(function(value){
		if(value.nodeType==1){
			arr.push(value);
		}
	})
	return arr;
}



//获取下一个兄弟（元素节点）

// getNext

/*步骤
1.下一个兄弟节点a
2.不是——a的再下一个兄弟节点b

....

3.知道找到
4.若没有：if判断

*/

function getNext(obj){
	let a=obj.nextSibling;
	if(a===null){
		return false;
	}
	while(a.nodeType!=1){
		a=a.nextSibling;
		if(a===null){
			return false;
		}
	}
	return a;
}


/*
子元素插入到父中
ele.appendTo(parent)
appendChild
insertBefore
 */


Node.prototype.appendTo=function(parent){
	parent.appendChild(this);
	//this是谁调用指向谁
}



/*
addEvent
addEvent(box,'click',fn)对象、事件类型、函数

 */

function addEvent(obj,type,fn){
	obj.addEventListener(type,fn,false);
}


//添加滚轮事件

/*mousWheel(box,function(向上事件){},function(向下事件){})*/
function mouseWheel(obj,upFn,downFn){
	obj.addEventListener('mousewheel',fn,false);
		function fn(e){
			e.preaentDefault();
			if(e.wheelDelta==120){
				//向上
                upFn.apply(obj);
			}
            if(e.wheelDelta==-120){
                //向下
                downFn.apply(obj);
            }
		}


}

