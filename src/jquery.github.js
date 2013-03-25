function GithubRepository(repo) {
  this.url = repo.url.replace('api.','').replace('repos/','');
  this.name = repo.name;
  this.watchers = repo.watchers;
  this.forks = repo.forks;
  this.description = repo.description;
  this.date = new Date(repo.pushed_at);
}

GithubRepository.prototype.pushed_at = function(){
  return this._dateToString(this.date);
};

GithubRepository.prototype.to_html = function(){
  var widget = '<div class="github-box">\
        <div class="github-box-header">\
            <h3><a href="' + this.url + '">' + this.name + '</a></h3>\
            <div class="github-stats">\
                <a class="repo-watchers" href="' + this.url + '/watchers">' + this.watchers + '</a>\
                <a class="repo-forks" href="' + this.url + '/forks">' + this.forks + '</a>\
            </div>\
        </div>\
        <div class="github-box-content">\
            <p>' + this.description + ' &mdash; <a href="' + this.url + '#readme">Read More</a></p>\
        </div>\
        <div class="github-box-download">\
            <p class="repo-update">Latest commit to <strong>master</strong> on ' + this.pushed_at() + '</p>\
            <a class="repo-download" href="' + this.url + '/zipball/master">Download as zip</a>\
        </div>\
    </div>';
    
  return widget;
};

GithubRepository.prototype._dateToString = function(date){
  var string_date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  return string_date;
};


// The actual plugin constructor
function Github( element, options ) {
  this.defaults = {
      propertyName: "value"
  };

  this.element = element;
  this.$container = $(element);
  this.repo = this.$container.attr("data-repo");
  this._defaults = this.defaults;

  this.options = $.extend( {}, this.defaults, options);
  this.init();
}

Github.prototype.getCacheKey = function(){
  return 'gh-repos:' + this.repo;
};

Github.prototype.getCache = function(){
  var cached = null;
  if (sessionStorage) {
    cached = sessionStorage.getItem(this.getCacheKey());
  }
  return cached;
};

Github.prototype.setCache = function(data){
  if (sessionStorage){
    var cacheKey = this.getCacheKey();
    sessionStorage.setItem(cacheKey, data);
  }
};

Github.prototype.init = function () {

  var self = this;
  var cacheKey = this.getCacheKey();
  var cached = this.getCache(cacheKey);

  if (cached !== null) {
    self.applyTemplate(JSON.parse(cached));
  }
  else {

    $.ajax({
      url: 'https://api.github.com/repos/' + this.repo,
      dataType: 'jsonp',
      success: function(results){
        if (results.meta.status >= 400 && results.data.message){
            console.warn(results.data.message);
            return;
        }
        else {
          self.setCache(cacheKey, JSON.stringify(results.data))
          self.applyTemplate(results.data);
        }
      }
    });

  }

};


Github.prototype.applyTemplate = function (repo) {
  var gitHubRepository = new GithubRepository(repo);
  this.appendTemplate(gitHubRepository.to_html());

};

Github.prototype.appendTemplate = function (widget) {
  this.$container.append(widget);
};

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).


    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn['github'] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_github')) {
                $.data(this, 'plugin_github', new Github( this, options ));
            }
        });
    };

}(jQuery, window));