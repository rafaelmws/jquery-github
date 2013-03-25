var sessionStorage = {
  cached: {},
  getItem: function(key){
    return sessionStorage.cached[key];
  },
  setItem: function(key, value){
    sessionStorage.cached[key] = value;
  },
  clear: function(){ sessionStorage.cached = {}; }
};

describe("jQuery.GitHub", function() {
  var github = null;
  var htmlElement = null;

  
  beforeEach(function() {
    sessionStorage.clear();
    htmlElement = document.createElement('div');
    $(htmlElement).attr('data-repo', "zenorocha/jquery-github");
    github = new Github(htmlElement, {});
  });


  it("should be null when it is not in cache", function() {
    expect(github.getCache()).toBeNull();
  });
  
  it("should be return cache key", function(){
    expect(github.getCacheKey()).toEqual("gh-repos:zenorocha/jquery-github");
  });
  
  it("should be return element", function(){
    sessionStorage.setItem(github.getCacheKey(), "elemento-teste");
    expect(github.getCache()).toEqual("elemento-teste");
  });
  
  it("should be set element in cache", function(){
    github.setCache("elemento-teste");
    expect(sessionStorage.getItem(github.getCacheKey())).toEqual("elemento-teste");
  });
  
});