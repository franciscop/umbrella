// Testing the main file
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
