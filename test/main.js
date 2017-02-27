var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , sinon = require('sinon')
  , uniquefilename = require('../index')
  , str = require('../str');


describe('Test utility functions', function() {
  it('string to number conversion', function (done) {
    assert.equal(str.stringToNumber('0', '01'), 1);
    assert.equal(str.stringToNumber('1', '01'), 2);
    assert.equal(str.stringToNumber('00', '01'), 3);
    assert.equal(str.stringToNumber('01', '01'), 4);
    assert.equal(str.stringToNumber('10', '01'), 5);
    assert.equal(str.stringToNumber('11', '01'), 6);
    assert.equal(str.stringToNumber('000', '01'), 7);
    assert.equal(str.stringToNumber('001', '01'), 8);
    assert.equal(str.stringToNumber('010', '01'), 9);

    assert.equal(str.stringToNumber('a', 'abc'), 1);
    assert.equal(str.stringToNumber('b', 'abc'), 2);
    assert.equal(str.stringToNumber('c', 'abc'), 3);
    assert.equal(str.stringToNumber('aa', 'abc'), 4);
    assert.equal(str.stringToNumber('ac', 'abc'), 6);
    assert.equal(str.stringToNumber('ba', 'abc'), 7);
    assert.equal(str.stringToNumber('ca', 'abc'), 10);
    assert.equal(str.stringToNumber('cc', 'abc'), 12);
    assert.equal(str.stringToNumber('aaa', 'abc'), 13);
    assert.equal(str.stringToNumber('bab', 'abc'), 23);
    assert.equal(str.stringToNumber('bbc', 'abc'), 27);
    assert.equal(str.stringToNumber('cab', 'abc'), 32);
    assert.equal(str.stringToNumber('cca', 'abc'), 37);
    assert.equal(str.stringToNumber('ccc', 'abc'), 39);
    assert.equal(str.stringToNumber('aaaa', 'abc'), 40);
    assert.equal(str.stringToNumber('abab', 'abc'), 50);


    done();
  });



  it('number to string conversion', function (done) {
    assert.equal(str.numberToString(-1, '01'), null);


    assert.equal(str.numberToString(1, '01'), '0');
    assert.equal(str.numberToString(2, '01'), '1');
    assert.equal(str.numberToString(3, '01'), '00');
    assert.equal(str.numberToString(4, '01'), '01');
    assert.equal(str.numberToString(5, '01'), '10');
    assert.equal(str.numberToString(6, '01'), '11');
    assert.equal(str.numberToString(7, '01'), '000');
    assert.equal(str.numberToString(8, '01'), '001');
    assert.equal(str.numberToString(9, '01'), '010');


     
    assert.equal(str.numberToString(1, 'abc'), 'a');
    assert.equal(str.numberToString(2, 'abc'), 'b');
    assert.equal(str.numberToString(3, 'abc'), 'c');
    assert.equal(str.numberToString(4, 'abc'), 'aa');
    assert.equal(str.numberToString(6, 'abc'), 'ac');
    assert.equal(str.numberToString(7, 'abc'), 'ba');
    assert.equal(str.numberToString(10, 'abc'), 'ca');
    assert.equal(str.numberToString(12, 'abc'), 'cc');
    assert.equal(str.numberToString(13, 'abc'), 'aaa');
    assert.equal(str.numberToString(23, 'abc'), 'bab');
    assert.equal(str.numberToString(27, 'abc'), 'bbc');
    assert.equal(str.numberToString(32, 'abc'), 'cab');
    assert.equal(str.numberToString(37, 'abc'), 'cca');
    assert.equal(str.numberToString(39, 'abc'), 'ccc');
    assert.equal(str.numberToString(40, 'abc'), 'aaaa');
    assert.equal(str.numberToString(50, 'abc'), 'abab');

    
    done();
  });




  it('reverse function', function(done) {
    assert.equal(str.stringToNumber(str.numberToString(77, 'abc'), 'abc'), 77);
    assert.equal(str.stringToNumber(str.numberToString(103, 'abc'), 'abc'), 103);
    assert.equal(str.stringToNumber(str.numberToString(177, 'abc'), 'abc'), 177);
    assert.equal(str.stringToNumber(str.numberToString(5, 'abcdefghijklmn'), 'abcdefghijklmn'), 5);
    assert.equal(str.stringToNumber(str.numberToString(33, 'abcdefghijklmn'), 'abcdefghijklmn'), 33);
    assert.equal(str.stringToNumber(str.numberToString(95, 'abcdefghijklmn'), 'abcdefghijklmn'), 95);
    assert.equal(str.stringToNumber(str.numberToString(100, 'abcdefghijklmn'), 'abcdefghijklmn'), 100);
    assert.equal(str.stringToNumber(str.numberToString(112, 'abcdefghijklmn'), 'abcdefghijklmn'), 112);
    assert.equal(str.stringToNumber(str.numberToString(123, 'abcdefghijklmn'), 'abcdefghijklmn'), 123);
    assert.equal(str.stringToNumber(str.numberToString(166, 'abcdefghijklmn'), 'abcdefghijklmn'), 166);
    assert.equal(str.stringToNumber(str.numberToString(167, 'abcdefghijklmn'), 'abcdefghijklmn'), 167);
    assert.equal(str.stringToNumber(str.numberToString(177, '!24'), '!24'), 177);
    assert.equal(str.stringToNumber(str.numberToString(201, '!^&?'), '!^&?'), 201);
    assert.equal(str.stringToNumber(str.numberToString(202, '!^&?'), '!^&?'), 202);
    assert.equal(str.stringToNumber(str.numberToString(203, '!^&?'), '!^&?'), 203);
    assert.equal(str.stringToNumber(str.numberToString(244, '!^&?'), '!^&?'), 244);
    
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

        uniquefilename.get('/path/to/dir/file.jpg', {separator: '!', paddingSize: 6, mode: 'alpha'}, 
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


  it('bad mode should revert back to numeric', function (done) {
    fs.exists.withArgs('/path/to/dir/file-95.jpg').yields(false);

    uniquefilename.get('/path/to/dir/file.jpg', {mode: 'bad-argument'}, 
      function(filename) {

      assert.equal(filename, '/path/to/dir/file-95.jpg'); 
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

  it('should return the first non-existing file path - with separator and attachment', function (done) {
    fs.exists.withArgs('/path/to/dir/file-1.jpg').yields(false);

    uniquefilename.get('/path/to/dir/file.jpg', {alwaysAppend: true},
      function(filename) {

      assert.equal(filename, '/path/to/dir/file-1.jpg');
      done();
    });
  });
});



describe('Promises', function() {
  beforeEach(function () {
    sinon.stub(fs, 'exists').yields(true);
  });

  afterEach(function () {
    fs.exists.restore();
  });

  it('should work with promises', function (done) {
    fs.exists.withArgs('/path/to/dir/file.jpg').yields(false);

    uniquefilename.get('/path/to/dir/file.jpg').then(function (filename) {
      assert.equal(filename, '/path/to/dir/file.jpg'); 
      done();
    });
  });
});

