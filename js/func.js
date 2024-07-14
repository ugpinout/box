

export function connect_sql(callback){
	plus.sqlite.openDatabase({
		name:"data",
		path:'_doc/data.db',
		success:function(res){
			callback(true);
		},
		fail:function(e){
			if(plus.sqlite.isOpenDatabase({name:"data",path:'_doc/data.db'})){
				callback(true);
			}else{
				callback(false);
			}   
		}
	});
} 

export function select_ku(sql,successCallback,errorCallback){
	plus.sqlite.selectSql({
		name: 'data',
		sql: sql,
		success: function(data){
			successCallback(data);
		},
		fail: function(e){
			errorCallback(e);
		}
	});
}

export function get_ku(successCallback,errorCallback){
	plus.sqlite.selectSql({
		name: 'data',
		sql: 'select * from ku',
		success: function(data){
			successCallback(data);
		},
		fail: function(e){
			errorCallback(e);
		}
	});
}

export function execute_ku(sqls,successCallback,errorCallback){ // 0 为添加库，//1为删除库，//2为重改名库
	plus.sqlite.executeSql({
		name:'data',
		sql:sqls,
		success:function(res){
			successCallback(res);
		},fail:function(e){
			errorCallback(e);
		}
	});
}

export function add_new_box_to_list(data_obj){
	let ulElement = document.querySelector('#box_list');
	ulElement.innerHTML = '';
	for (let item in data_obj) {
		// 创建 li 元素
		let liElement = document.createElement('li');
		liElement.classList.add('mui-table-view-cell', 'mui-media', 'mui-col-xs-4', 'mui-col-sm-3');
		// 创建 a 元素
		let aElement = document.createElement('a');
		aElement.href = '#';
		// 创建 img 元素
		let imgElement = document.createElement('img');
		imgElement.src = "../../images/box-close.png";
		imgElement.style.width = '5vh';
		imgElement.style.height = '5vh';
		imgElement.alt = '';
		// 创建 div 元素
		let divElement = document.createElement('div');
		divElement.setAttribute('id',data_obj[item].id);
		divElement.classList.add('mui-media-body');
		divElement.textContent =data_obj[item].name;
		 
		// 将 img 和 div 添加到 a 元素中
		aElement.appendChild(imgElement);
		aElement.appendChild(divElement);
		
		// 将 a 元素添加到 li 元素中
		liElement.appendChild(aElement);
		
		// 将 li 元素添加到 ul 元素中
		ulElement.appendChild(liElement);

	}
	li_add_Event();
}

//给所有li标签添加点击事件
function li_add_Event(){
	let timer = null;
	let startTime = '';
	let endTime = '';
	var ulElement = document.getElementById('box_list'); // 获取 ul 元素
	var liElements = ulElement.querySelectorAll('li.mui-table-view-cell'); // 选择所有类名为 mui-table-view-cell 的 li 元素
	// mui.toast('这里1');
	// 循环给每个 li 元素添加触摸事件
	liElements.forEach(function(li) {
		li.addEventListener('touchstart', function () {
			startTime = +new Date()
			timer = setTimeout(function () { 
			var lis=li.querySelector('div');
			// mui.toast(lis.getAttribute('id'));
			mui('.mui-popover').popover('toggle',document.getElementById(lis.getAttribute('id')));
			// mui.toast('长按');
			}, 400);
		});
			
		li.addEventListener('touchend', function () {
			endTime = +new Date()
			clearTimeout(timer)
			if (endTime - startTime < 400) {
				mui.toast('不是 长按');
			}
		}) ;
	});
}


