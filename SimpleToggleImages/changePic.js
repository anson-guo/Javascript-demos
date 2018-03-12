/**
 * @authors Guo Jingan (gja1026@163.com)
 * @date    2018-03-01
 */

window.onload = function() {
    // 存放图片路径的数组
    var picArr = ["img/dog01.jpg", "img/dog02.jpg", "img/dog03.jpg", "img/dog04.jpg",
        "img/dog05.jpg", "img/dog06.jpg"
    ];
    var index = 0;      // 当前显示的序号
    var autoPlayFlag = false;   // 当前自动播放的flag

    // 获取图片
    var img = document.getElementsByTagName("img")[0];
    // 获取图片的序号的元素
    var picIndex = document.getElementsByTagName("span")[0];
    // 获取自动播放按钮
    var autoPlay = document.getElementById("autoPlay");
  
    // 设置图片的总张数
    var picAll = document.getElementsByTagName("span")[1];
    picAll.innerHTML = picArr.length;

    // 为“上一张”按钮添加单击事件
    var previousImg = document.getElementById("previousBtn");
    previousImg.onclick = function() {
        if (autoPlayFlag) {
            alert("当前正在自动播放，请先暂停后再手动翻页浏览！");
            return;
        }
        index--;
        if (index < 0) {
            index = picArr.length - 1;;
        }
        img.src = picArr[index];
        picIndex.innerHTML = index + 1;
    };

    // 为“下一张”按钮添加单击事件
    var nextImg = document.getElementById("nextBtn");
    nextImg.onclick = function() {
        if (autoPlayFlag) {
            alert("当前正在自动播放，请先暂停后再手动翻页浏览！");
            return;
        }
        index++;
        if (index >= picArr.length) {
            index = 0;
        }
        img.src = picArr[index];
        picIndex.innerHTML = index + 1;
    };

    // 开启自动播放
    var timer = 0;
    var autoPlay = document.getElementById("autoPlay");
    autoPlay.onclick = function() {
        if (!autoPlayFlag) {
            // 如果没有自动播放，则单击后开始自动播放
            autoPlayFlag = true;
            autoPlay.innerHTML = "暂停";
        } else {
            // 如果已经开启了自动播放，则单击后停止自动播放
            autoPlayFlag = false;
            autoPlay.innerHTML = "继续";
        }

        clearInterval(timer);

        if (autoPlayFlag) {
            timer = setInterval(function() {
                index++;
                if (index >= picArr.length) {
                    index = 0;
                }
                img.src = picArr[index];
                picIndex.innerHTML = index + 1;
            }, 1300);
        }
    };
};