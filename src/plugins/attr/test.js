// Testing the main file
describe(".attr(name, value)", function () {
  afterEach(function () {
    base.first().removeAttribute("title");
    expect(!base.attr("title")).to.equal(true);
  });

  it("should be a function", function () {
    expect(typeof base.attr).to.equal("function");
  });

  it("can add an attribute with two params", function () {
    base.attr("title", "Hello");
    expect(base.attr("title")).to.equal("Hello");
  });

  it("can remove an attribute with two params", function () {
    base.attr("title", "Hello").attr("title", "");
    expect(base.attr("title")).to.equal("");
  });

  it("can add an attribute with an object", function () {
    base.attr({ title: "Hello" });
    expect(base.attr("title")).to.equal("Hello");
  });

  it("can read the first element attribute", function () {
    base.first().setAttribute("title", "Hello");
    expect(base.attr("title")).to.equal("Hello");
  });

  it("can be called with no nodes", function () {
    expect(u("dfsdf").attr("title")).to.equal("");
  });

  it("can be called to iterate", function () {
    base.find("ul li").attr("title", (node, i) => i + ". " + node.textContent);
    var firstTitle = base.find("ul li:first-child").attr("title");
    expect(firstTitle).to.equal("1. Hello world");
    var secondTitle = base.find("ul li:nth-child(2)").attr("title");
    expect(secondTitle).to.equal("2. Hello world");
    var lastTitle = base.find("ul li:last-child").attr("title");
    expect(lastTitle).to.equal("3. Hello world");
    base.find("ul li").attr("title", "");
  });
});
