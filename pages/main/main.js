/*
10001：解析 _doc 目录失败,可能没有给权限
10002：原始数据库文件不存在，有二次修改的可能
10003：复制数据库失败，可能没有给权限
10004：打开数据库失败，可能没给全选或者数据库误删。重新打开或重新安装软件
10005：数据库select无法查询到库表，可能数据建库损坏
*/

import {createFile,get_ku,add_new_box_to_list} from "../../js/func.js";
window.onload=function(){
	system_init();
	document.addEventListener( "plusready", onPlusReady, false );
	}

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
function connect_sql(callback){
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

function onPlusReady(){
is_local_data();
	document.getElementById('add_new').addEventListener('touchstart',function(){
		
	});
	
	document.getElementById('showSidebarButton').addEventListener('touchstart',function(){
		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	},{ passive: false });
}

function cliks(){
	alert("Hello");
	mui.toast('登陆成功');
}

function system_init(){
	mui('.mui-scroll-wrapper').scroll();
}
  
