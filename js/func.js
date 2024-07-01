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