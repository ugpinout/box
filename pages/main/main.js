/*
自定义的错误代码
10001：解析 _doc 目录失败,可能没有给权限
10002：原始数据库文件不存在，有二次修改的可能
10003：复制数据库失败，可能没有给权限
10004：打开数据库失败，可能没给全选或者数据库误删。重新打开或重新安装软件
10005：数据库select无法查询到库表，可能数据建库损坏
10006：创建新的表失败，名字冲突或者数据库有问题
10007：获取新表的id失败，可能数据库受损
*/    
//导入一些库  
import {get_ku,add_new_box_to_list,execute_ku,connect_sql,select_ku} from "../../js/func.js";
//页面加载完以后出发的事件
window.onload=function(){
	document.addEventListener( "plusready", onPlusReady, false );
	system_init(); 
}

//验证本地文件完整性
function is_local_data(){
	var wwwPath = '_www/src/';  // www 目录路径
	var docPath = '_doc/';  // _doc 目录路径
	var filePath = docPath + 'data.db'; // 目标文件路径
	plus.io.resolveLocalFileSystemURL(filePath, function(entry){
		console.log('数据库存在'); 
		connect_sql(function(res){
			if(res){
				get_ku(function(suc){ 
					add_new_box_to_list(suc);     
				},function(err){ 
					mui.toast('未知错误[10005]');
					mui.toast(err.message);  
				});
			}else{
				mui.toast('未知错误[10004]');
			}  
		});
	},
	function(e) {
		mui.toast("数据库不存在，正在初始化");
		plus.io.resolveLocalFileSystemURL(wwwPath + 'data.db', function(entry) {
			var dbFile = entry;
			plus.io.resolveLocalFileSystemURL(docPath, function(docEntry) {
				var docDirectory = docEntry;
				var docDirectory = docEntry;
				copyDbFileToDoc(dbFile, docDirectory);
				connect_sql(function(res){
					if(res){
						get_ku(function(suc){ 
							add_new_box_to_list(suc);     
						},function(err){    
							mui.toast('未知错误[10005]');
							mui.toast(err.message);   
						});
					}else{
						mui.toast('未知错误[10004]');
					}  
				});
				
			}, function(e) {
				mui.toast('未知错误[10001]');
				console.error('解析 _doc 目录失败：' + e.message);
			});
		}, function(e) {
			mui.toast('未知错误[10002]');
			console.error('解析 data.db 文件失败：' + e.message);
		}); 
		function copyDbFileToDoc(dbFile, docDirectory) {
			dbFile.copyTo(docDirectory, 'data.db', function() {
				console.log('数据库文件复制成功');
			}, function(e) {
				mui.toast('未知错误[10003]');
				console.error('数据库文件复制失败：' + e.message);
			});
		}
	});
	
}


//h5+功能初始化完以后触发的函数
function onPlusReady(){
	is_local_data(); 
	
	//给 添加盒子 按钮绑定点击事件
	document.getElementById('add_new').addEventListener('touchstart',
		function(){ 
			mui.prompt('','不要写的太多','请输入箱子名',['确定','取消'],
			function(res){
				if (res.index == 1){
					mui.toast('创建新盒子取消');
				}else{ 
					var id= new Date().getTime();
					execute_ku("INSERT INTO ku (name,id) VALUES ('"+res.value+"',"+id+");", 
					function(res){  
						select_ku("CREATE TABLE \"" +id+ "\" AS SELECT * FROM demo WHERE 1=0;",
						function(res){
							console.log(res);
							mui.toast("创建成功");
							get_ku(function(suc){ 
								add_new_box_to_list(suc);       
							},function(err){ 
								mui.toast('未知错误[10005]');
								mui.toast(err.message);  
							});  
						},
						function(e){
							console.log(JSON.stringify(e));
							mui.toast('未知错误[10007]'); 
						});
					},function(e){
						console.log(JSON.stringify(e));
						mui.toast('未知错误[10006]');  
					});
				}	 
			},'div');
		});
	//给 左上角按钮 按钮绑定点击事件 
	document.getElementById('showSidebarButton').addEventListener('touchstart',function(){
		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	},{ passive: false });
	
}
//测试函数
function cliks(){
	alert("Hello");   
	mui.toast('登陆成功');
}

//初始化一些参数  
function system_init(){
	mui('.mui-scroll-wrapper').scroll();
	
}
  
