'use strict';

import cluster from 'cluster';
import os from 'os';
import ganfanheizhongjie from './ganfanheizhongjie';

let startWorker = () => {
	let worker = cluster.fork();
	console.log('CLUSTER: Worker %d started', worker.id);
};

if (cluster.isMaster) {
	// 在主线程上开辟工作线程
	os.cpus().forEach(() => {
		startWorker();
	});

	cluster.on('disconnect', worker => {
		console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id);
	});

	cluster.on('exit', (worker, code, signal) => {
		console.log('CLUSTER: Worker %d died with exit code %d (%s)',
			worker.id, code, signal);
		startWorker();
	});
} else {
	// 在工作线程上执行主程序
	ganfanheizhongjie();
}