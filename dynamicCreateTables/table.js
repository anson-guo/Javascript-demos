window.onload = function () {
    // 获取行和列
    var row = document.getElementById("row");
    var column = document.getElementById("column");

    // 为两个input添加失去焦点响应事件
    addEventAndCheck(row);
    addEventAndCheck(column);

    var button = document.getElementById("submit");

    // 为“生成表格”添加单击响应事件
    button.onclick = function () {
        // 获取input框中的值
        var num_Row = row.value;
        var num_Column = column.value;

        if(num_Row.length != 0 && num_Column.length != 0){
            // 生成表格
            var newTable = createTable(num_Row, num_Column);
            // 将表格添加到指定的节点下
            document.body.appendChild(newTable);
        } else {
            alert("数据不能为空");
        }
    };

    // 删除表格
    var delTableBtn = document.getElementById("delete");
    
    delTableBtn.onclick = function(){
        var delTable = document.getElementsByTagName("table")[0];
        if(delTable != undefined){
            // 删除
            document.body.removeChild(delTable);
            row.value = null;
            column.value = null;
        }else{
            alert("你还没有创建表格");
        }
    };
};


// 添加失去焦点事件并检查输入，合格则返回数字
function addEventAndCheck(obj) {
    obj.onblur = function () {
        var num = obj.value;
        if (num.length != 0) {
            if (!checkNum(num)) {
                obj.value = "";
            } else {
                obj.number = num;
            }
        }
    };
}

// 检查数字
function checkNum(num) {
    if (!num || isNaN(num)) {
        alert("请输入一个数字");
    } else if (num <= 0) {
        alert("请输入一个大于0的数字");
    } else if (String(num).indexOf(".") > -1) {
        alert("请输入一个整数");
    } else if(num > 100){
        alert("请不要输入超过1000的数字！");
    }  else {
        return true;
    }
}

// 生成表格
function createTable(row, column) {
    var table = document.createElement("table");
    // 添加行
    for (var i = 0; i < row; i++) {
        var trNode = table.insertRow();
        // 添加列
        for (var j = 0; j < column; j++) {
            var tdNode = trNode.insertCell();
            tdNode.innerHTML = (i + 1) + "行" + (j + 1) + "列";
        }
    }
    return table;
}

 