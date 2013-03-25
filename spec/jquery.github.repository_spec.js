
describe("jquery.github.repository", function() {
  
  var repo, obj;
  beforeEach(function() {
    repo = { 
      url :         "https://api.github.com/repos/zenorocha/hub.me",
      name :        "ABC",
      watchers :    5,
      forks :       2,
      description : "repository abc",
      pushed_at :   "2013-03-14T17:29:54Z"
    };
    
    obj = new GithubRepository(repo);
    
  });

  
  describe("initialize GithubRepository", function(){
    it("should be repository url", function(){ 
      expect(obj.url).toEqual("https://github.com/zenorocha/hub.me");
    });
    
    it("should be repository name", function(){
      expect(obj.name).toEqual("ABC");
    });
    
    it("should be watchers", function(){
      expect(obj.watchers).toEqual(5);
    });
    
    it("should be forks", function(){
      expect(obj.forks).toEqual(2);
    });
    
    it("should be description", function(){
      expect(obj.description).toEqual("repository abc");
    });
    
    it("should be formated date", function(){
      expect(obj.pushed_at()).toEqual("14/3/2013");
    });
    
  });
  
  describe("html githubrepository", function(){
    var html_result = '<div class="github-box">        <div class="github-box-header">            <h3><a href="https://github.com/zenorocha/hub.me">ABC</a></h3>            <div class="github-stats">                <a class="repo-watchers" href="https://github.com/zenorocha/hub.me/watchers">5</a>                <a class="repo-forks" href="https://github.com/zenorocha/hub.me/forks">2</a>            </div>        </div>        <div class="github-box-content">            <p>repository abc &mdash; <a href="https://github.com/zenorocha/hub.me#readme">Read More</a></p>        </div>        <div class="github-box-download">            <p class="repo-update">Latest commit to <strong>master</strong> on 14/3/2013</p>            <a class="repo-download" href="https://github.com/zenorocha/hub.me/zipball/master">Download as zip</a>        </div>    </div>';
    it("should be return html", function(){
      expect(obj.to_html()).toEqual(html_result);
    });
  });
  
});