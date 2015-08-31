var loadtest = require('loadtest');
var chai = require('chai');

var expect = chai.expect;

suite('Stress tests', function() {
	test('Homepage should handle 1000 requests in a second', function(done) {
		var options = {
			url: 'http://localhost:3000',
			concurrency: 2000,
			maxRequests: 2000
		};
		loadtest.loadTest(options, function(err, result) {
			expect(!err);
			expect(result.totalTimeSeconds < 1);
			done();
		});
	});
});