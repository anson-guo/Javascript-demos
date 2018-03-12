/* 
 *	@authors Guo Jingan (gja1026@163.com)
 *  @date    2018-01-25
 *  @intro   整理的一些常见函数，方便以后直接调用
 */

// Exemple for the description of a function：
/* --------------
 * function		: xxx
 * description	: xxxxxx,xxxx,xx
 * argument		: 
 *	 1. xxx 		: detailed descripion.
 *	 2. xxx			: detailed descripion.
 *   4. xxx			: detailed descripion.
 *	 5. xxx 		: detailed descripion.
 * return		: xxx
 * creationDate	: xxxx-xx-xx
 * editDate		: xxxx-xx-xx
 * 		description: detailed descripion.
 * --------------
 */


/* --------------
 * function		: move
 * description	: 简单的动画效果，控制元素移动
 * argument		: 
 *	 1. obj 		: 要移动的目标元素
 *	 2. attr		: 要发生改变的属性，例如height, top, width, left等属性
 *	 3. target 		: 目标位置
 *   4. speed		: 目标元素移动的速度
 *	 5. callback	: 回调函数，在移动动画执行完毕后调用执行
 * return		: none
 * creationDate	: 2018-01-25
 * --------------
 */
function move(obj, arrt, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);
	//获取当前位置
	var current = parseInt(getStyle(obj, arrt));
	//判断移动的方向
	//若current<target，则右移，速度为正
	//若current>target，则左移，速度为负
	if (current > target) {
		speed = -speed;
	}
	//移动的定时器
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器标识
	obj.timer = setInterval(function() {
		//获取box原来的left值
		var oldValue = parseInt(getStyle(obj, arrt));
		//设置新值
		var newValue = oldValue + speed;
		//当向右移动，并且新值大于target，则置为target
		//当向左移动，并且新值小于target，则置为target
		if (speed > 0 && newValue > target || speed < 0 && newValue < target) {
			newValue = target;
		}
		obj.style[arrt] = newValue + "px";
		//当跑到target位置时，停止动画
		if (newValue == target) {
			clearInterval(obj.timer);
			//判断是否传入了回调函数，如果有则执行
			callback && callback();
		}
	}, 30);
}


/* --------------
 * function		: getStyle
 * description	: 获取元素的样式
 * argument		: 
 *	 1. obj 		: 目标元素
 *	 2. name		: 要获取的样式名
 * return		: 样式值
 * creationDate	: 2018-01-25
 * --------------
 */
function getStyle(obj, name) {
	if (window.getComputedStyle) {
		//正常浏览器的方式，具有该方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式
		return obj.currentStyle[name];
	}
}


/* --------------
 * function		: drag
 * description	: 鼠标拖拽元素
 * argument		: 
 *	 1. obj 		: 目标元素
 * return		: none
 * creationDate	: 2018-03-09
 * --------------
 */
function drag(obj) {
	// 为obj添加鼠标事件
	obj.onmousedown = function(ev) {
		// 兼容ie8
		ev = ev || window.event;
		// 设置obj捕获所有的鼠标按下事件
		//      - 只有IE支持，但是在Firefox中调用不会出错
		//      - Chrome中调用会报错
		obj.setCapture && obj.setCapture();

		// obj的偏移量
		obj.offsetX = ev.clientX - obj.offsetLeft;
		obj.offsetY = ev.clientY - obj.offsetTop;

		document.onmousemove = function(ev) {
			if (!ev) {
				ev = window.event;
			}

			obj.clientX = ev.clientX - obj.offsetX;
			obj.clientY = ev.clientY - obj.offsetY;

			obj.style.left = obj.clientX + "px";
			obj.style.top = obj.clientY + "px";
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			obj.releaseCapture && obj.releaseCapture();
		};

		// 取消浏览器默认执行的事件
		return false;
	};
}

/* --------------
 * function		: addClass
 * description	: 为元素添加属性
 * argument		: 
 *	 1. obj 		: 目标元素
 *	 2. cn 			: 添加的属性名
 * return		: none
 * creationDate	: 2018-03-11
 * --------------
 */
function addClass(obj, cn) {
	if (!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
}


/* --------------
 * function		: hasClass
 * description	: 判断某个对象中是否有相应的属性
 * argument		: 
 *	 1. obj 		: 目标元素
 *	 2. cn 			: 属性名
 * return		: none
 * creationDate	: 2018-03-11
 * --------------
 */
function hasClass(obj, cn) {
	//创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
}


/* --------------
 * function		: removeClass
 * description	: 删除指定的class属性
 * argument		: 
 *	 1. obj 		: 目标元素
 *	 2. cn 			: 属性名
 * return		: none
 * creationDate	: 2018-03-11
 * --------------
 */
function removeClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
}


/* --------------
 * function		: toggleClass
 * description	:  切换一个类，如果元素存在该类则删除，若没有则添加
 * argument		: 
 *	 1. obj 		: 目标元素
 *	 2. cn 			: 属性名
 * return		: none
 * creationDate	: 2018-03-11
 * --------------
 */
function toggleClass(obj, cn) {
	if (hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn);
	}
}