// Testing the main file
describe("Function ajax(done, before)", function() {

  // Generate the url (allow for testing locally)
  function url(frag){
    frag = frag || '';
    var url = window.location.href;
    if (!/^http/.test(window.location.href)) {
      url = 'http://localhost:3000';
    }

    if (/tests(\/)?$/.test(url)) {
      url = url.replace(/tests(\/)?/, '');
    }
    return url.replace(/\/$/, '') + '/' + frag;
  }

  function ifActive(cb){
    return function(done){
      ajax(url('active'), {}, function(error, data){
        if (!error && data === 'active') {
          cb(done);
        } else {
          u('.noserver').html("Note: there is no server running, so AJAX methods are not being tested");
          console.log("- Server not active");
          done();
        }
      });
    }
  };

  it("should be a function", function() {
    isFn(ajax);
  });

  it("can make a simple get", ifActive(function(done) {
    ajax(url('plain'), {}, function(error, data, xhr){
      expect(error).to.equal(null);
      expect(data).to.equal('GET');
      expect(xhr instanceof XMLHttpRequest).to.equal(true, 'XMLHttpRequest');
      done();
    }, function(xhr){
      expect(xhr instanceof XMLHttpRequest).to.equal(true, 'XMLHttpRequest');
    });
  }));

  it("can make a simple get", ifActive(function(done) {
    ajax(url('plain'), {}, function(error, data, xhr){
      expect(data).to.equal('GET');
      expect(xhr instanceof XMLHttpRequest).to.equal(true, 'XMLHttpRequest');
      done();
    });
  }));

  it("can send GET but data is lost", ifActive(function(done) {
    var body = { send: '123' };
    var options = { method: 'GET', body: body };
    ajax(url('json'), options, function(error, data){
      expect(data.method).to.equal('GET');
      expect(data.body).to.deep.equal({});
      done();
    });
  }));

  it("can send POST with data", ifActive(function(done) {
    var body = { send: '123' };
    var options = { method: 'POST', body: body };
    ajax(url('json'), options, function(error, data){
      expect(data.method).to.equal('POST');
      expect(data.body).to.deep.equal(body);
      done();
    });
  }));

  it("can send PUT with data", ifActive(function(done) {
    var body = { send: '123' };
    var options = { method: 'PUT', body: body };
    ajax(url('json'), options, function(error, data){
      expect(data.method).to.equal('PUT');
      expect(data.body).to.deep.equal(body);
      done();
    });
  }));

  it("can send DELETE", ifActive(function(done) {
    var options = { method: 'DELETE' };
    ajax(url('json'), options, function(error, data){
      expect(data.method).to.equal('DELETE');
      if (!window.mochaPhantomJS) {
        expect(data.body).to.deep.equal({}, "Body should be ignored");
      }
      done();
    });
  }));
});

describe("fn ajax()", function() {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function() {
    this.xhr.restore();
  })

  it("should be a function", function() {
    expect(typeof ajax).to.equal('function');
  });

  it("should parameterize objects", function() {
    var body = {hello: 'world'};
    ajax('#', {body: body, method: 'POST'});
    expect(this.requests[0].requestBody).to.equal('hello=world');
  });

  it("should not parameterize FormData", function() {
    var body = new FormData();
    ajax('#', {body: body, method: 'POST'});
    expect(typeof this.requests[0].requestBody).to.equal('object');
  });
});
