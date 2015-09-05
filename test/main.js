var assert 	= require('assert');
var fs 		= require('fs');
var path 	= require('path');
var sinon 	= require('sinon');

var uniquefilename = require('../index');



describe('Test utility functions', function() {
	it('string to number conversion', function (done) {
		assert.equal(uniquefilename.stringToNumber('0', '01'), 1);
		assert.equal(uniquefilename.stringToNumber('1', '01'), 2);
		assert.equal(uniquefilename.stringToNumber('00', '01'), 3);
		assert.equal(uniquefilename.stringToNumber('01', '01'), 4);
		assert.equal(uniquefilename.stringToNumber('10', '01'), 5);
		assert.equal(uniquefilename.stringToNumber('11', '01'), 6);
		assert.equal(uniquefilename.stringToNumber('000', '01'), 7);
		assert.equal(uniquefilename.stringToNumber('001', '01'), 8);
		assert.equal(uniquefilename.stringToNumber('010', '01'), 9);

		assert.equal(uniquefilename.stringToNumber('a', 'abc'), 1);
		assert.equal(uniquefilename.stringToNumber('b', 'abc'), 2);
		assert.equal(uniquefilename.stringToNumber('c', 'abc'), 3);
		assert.equal(uniquefilename.stringToNumber('aa', 'abc'), 4);
		assert.equal(uniquefilename.stringToNumber('ac', 'abc'), 6);
		assert.equal(uniquefilename.stringToNumber('ba', 'abc'), 7);
		assert.equal(uniquefilename.stringToNumber('ca', 'abc'), 10);
		assert.equal(uniquefilename.stringToNumber('cc', 'abc'), 12);
		assert.equal(uniquefilename.stringToNumber('aaa', 'abc'), 13);
		assert.equal(uniquefilename.stringToNumber('bab', 'abc'), 23);
		assert.equal(uniquefilename.stringToNumber('bbc', 'abc'), 27);
		assert.equal(uniquefilename.stringToNumber('cab', 'abc'), 32);
		assert.equal(uniquefilename.stringToNumber('cca', 'abc'), 37);
		assert.equal(uniquefilename.stringToNumber('ccc', 'abc'), 39);
		assert.equal(uniquefilename.stringToNumber('aaaa', 'abc'), 40);
		assert.equal(uniquefilename.stringToNumber('abab', 'abc'), 50);


		done();
	});



	it('number to string conversion', function (done) {
		assert.equal(uniquefilename.numberToString(1, '01'), '0');
		assert.equal(uniquefilename.numberToString(2, '01'), '1');
		assert.equal(uniquefilename.numberToString(3, '01'), '00');
		assert.equal(uniquefilename.numberToString(4, '01'), '01');
		assert.equal(uniquefilename.numberToString(5, '01'), '10');
		assert.equal(uniquefilename.numberToString(6, '01'), '11');
		assert.equal(uniquefilename.numberToString(7, '01'), '000');
		assert.equal(uniquefilename.numberToString(8, '01'), '001');
		assert.equal(uniquefilename.numberToString(9, '01'), '010');


		 
		assert.equal(uniquefilename.numberToString(1, 'abc'), 'a');
		assert.equal(uniquefilename.numberToString(2, 'abc'), 'b');
		assert.equal(uniquefilename.numberToString(3, 'abc'), 'c');
		assert.equal(uniquefilename.numberToString(4, 'abc'), 'aa');
		assert.equal(uniquefilename.numberToString(6, 'abc'), 'ac');
		assert.equal(uniquefilename.numberToString(7, 'abc'), 'ba');
		assert.equal(uniquefilename.numberToString(10, 'abc'), 'ca');
		assert.equal(uniquefilename.numberToString(12, 'abc'), 'cc');
		assert.equal(uniquefilename.numberToString(13, 'abc'), 'aaa');
		assert.equal(uniquefilename.numberToString(23, 'abc'), 'bab');
		assert.equal(uniquefilename.numberToString(27, 'abc'), 'bbc');
		assert.equal(uniquefilename.numberToString(32, 'abc'), 'cab');
		assert.equal(uniquefilename.numberToString(37, 'abc'), 'cca');
		assert.equal(uniquefilename.numberToString(39, 'abc'), 'ccc');
		assert.equal(uniquefilename.numberToString(40, 'abc'), 'aaaa');
		assert.equal(uniquefilename.numberToString(50, 'abc'), 'abab');

		
		done();
	});




	it('reverse function', function(done) {
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(77, 'abc'), 'abc'), 77);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(103, 'abc'), 'abc'), 103);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(177, 'abc'), 'abc'), 177);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(5, 'abcdefghijklmn'), 'abcdefghijklmn'), 5);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(33, 'abcdefghijklmn'), 'abcdefghijklmn'), 33);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(95, 'abcdefghijklmn'), 'abcdefghijklmn'), 95);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(100, 'abcdefghijklmn'), 'abcdefghijklmn'), 100);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(112, 'abcdefghijklmn'), 'abcdefghijklmn'), 112);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(123, 'abcdefghijklmn'), 'abcdefghijklmn'), 123);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(166, 'abcdefghijklmn'), 'abcdefghijklmn'), 166);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(167, 'abcdefghijklmn'), 'abcdefghijklmn'), 167);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(177, '!24'), '!24'), 177);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(201, '!^&?'), '!^&?'), 201);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(202, '!^&?'), '!^&?'), 202);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(203, '!^&?'), '!^&?'), 203);
		assert.equal(uniquefilename.stringToNumber(uniquefilename.numberToString(244, '!^&?'), '!^&?'), 244);
		
		done();
	});
});


describe('Get non existing file path', function() {
	beforeEach(function () {
		sinon.stub(fs, 'exists').yields(true);
	});

	afterEach(function () {
		fs.exists.restore();
	});

	it('should return the first non-existing file path', function (done) {
		fs.exists.withArgs('/path/to/dir/file.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {}, function(filename) {
			assert.equal(filename, '/path/to/dir/file.jpg');

			fs.exists.withArgs('/path/to/dir/file.jpg').yields(true);
			fs.exists.withArgs('/path/to/dir/file-20.jpg').yields(false);

			uniquefilename.get('/path/to/dir/file.jpg', {}, function(filename) {
				assert.equal(filename, '/path/to/dir/file-20.jpg');
				done();
			});
		});
	});


	it('should return the first non-existing file path - with separator and padding options', function (done) {
		fs.exists.withArgs('/path/to/dir/file.0003.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {separator: '.', paddingCharacter: '0', paddingSize: 4}, function(filename) {
			assert.equal(filename, '/path/to/dir/file.0003.jpg');    

			fs.exists.withArgs('/path/to/dir/file~ZZ11.jpg').yields(false);

			uniquefilename.get('/path/to/dir/file.jpg', {separator: '~', paddingCharacter: 'Z', paddingSize: 4}, 
				function(filename) {

				assert.equal(filename, '/path/to/dir/file~ZZ11.jpg'); 
				done();
			});
		});
	});



	it('should return the first non-existing file path - with alpha mode', function (done) {
		fs.exists.withArgs('/path/to/dir/file.000h.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {separator: '.', paddingCharacter: '0', paddingSize: 4, mode: 'alpha'}, 
			function(filename) {

			assert.equal(filename, '/path/to/dir/file.000h.jpg');    
			fs.exists.withArgs('/path/to/dir/file~aabc.jpg').yields(false);

			uniquefilename.get('/path/to/dir/file.jpg', {separator: '~', paddingCharacter: 'a', paddingSize: 4, mode: 'alpha'}, 
				function(filename) {

				assert.equal(filename, '/path/to/dir/file~aabc.jpg'); 
				fs.exists.withArgs('/path/to/dir/file!000abc.jpg').yields(false);

				uniquefilename.get('/path/to/dir/file.jpg', {separator: '!', paddingCharacter: '0', paddingSize: 6, mode: 'alpha'}, 
					function(filename) {

					assert.equal(filename, '/path/to/dir/file!000abc.jpg'); 
					done();
				});
			});
		});
	});



	it('should return the first non-existing file path - with ALPHA mode', function (done) {
		fs.exists.withArgs('/path/to/dir/file-CD.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {mode: 'ALPHA'}, 
			function(filename) {

			assert.equal(filename, '/path/to/dir/file-CD.jpg'); 
			done();
		});
	});



	it('should return the first non-existing file path - with alphanumeric mode', function (done) {
		fs.exists.withArgs('/path/to/dir/file-6a.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {mode: 'alphanumeric'}, 
			function(filename) {

			assert.equal(filename, '/path/to/dir/file-6a.jpg'); 
			done();
		});
	});


	it('should return the first non-existing file path - with ALPHANUMERIC mode', function (done) {
		fs.exists.withArgs('/path/to/dir/file-6A.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {mode: 'ALPHANUMERIC'}, 
			function(filename) {

			assert.equal(filename, '/path/to/dir/file-6A.jpg'); 
			done();
		});
	});



	it('should return the first non-existing file path - with charset mode', function (done) {
		fs.exists.withArgs('/path/to/dir/fileqyq.jpg').yields(false);

		uniquefilename.get('/path/to/dir/file.jpg', {mode: 'charset', charset: 'qwerty', separator: 'q'}, 
			function(filename) {

			assert.equal(filename, '/path/to/dir/fileqyq.jpg'); 
			done();
		});
	});
});

