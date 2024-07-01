 export function createFile(filePath) {
	plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
		fs.root.getFile('newfile.txt', { create: true }, function(entry) {
			console.log('New file created: ' + entry.fullPath);
			// 在这里可以处理新文件创建后的逻辑
		}, function(e) {
			console.log('Failed to create file: ' + e.message);
		});
	}, function(e) {
		console.log('Request filesystem failed: ' + e.message);
	});
}

export function get_ku(successCallback,errorCallback){
	plus.sqlite.selectSql({
		name: 'data',
		sql: 'select ids,name from ku',
		success: function(data){
			successCallback(data);
		},
		fail: function(e){
			errorCallback(e);
		}
	});
}

export function add_new_box_to_list(data_obj){
	let ulElement = document.querySelector('#box_list');
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
		divElement.setAttribute('id',data_obj[item].ids);
		divElement.classList.add('mui-media-body');
		divElement.textContent =data_obj[item].name;
		 
		// 将 img 和 div 添加到 a 元素中
		aElement.appendChild(imgElement);
		aElement.appendChild(divElement);
		
		// 将 a 元素添加到 li 元素中
		liElement.appendChild(aElement);
		
		// 将 li 元素添加到 ul 元素中
		ulElement.appendChild(liElement);
		console.log(data_obj[item].ids,data_obj[item].name);
	}
}