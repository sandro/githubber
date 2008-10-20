// javascript:(function(){%20var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://turriate.com/media/githelper/helper.js';%20document.body.appendChild(s);%20window.setTimeout('init()',%20500);%20})();
//(function(){
//  s=document.createElement('script');
//  s.type='text/javascript';
//  s.src='http://turriate.com/media/githelper/helper.js';
//  document.body.appendChild(s);
//})();

function get_or_create_readme(){
  var readme = jq("#readme");
  if (! readme.length) {
    readme = "<div id='readme'></div>";
    jq("#browser").after(readme);
  }
  return readme;
}

function tohtml_callback(data){
  var readme = get_or_create_readme();
}

function do_something(){
  jq.getJSON("http://tohtml.heroku.com/convert?callback=?", {text: '#hi there'}, tohtml_callback);
}

function toggle_hashrocket(){
  jq('a[href="/hashrocket"]').parent().toggle();
  return false;
}

function helper_init(){
  // add a githelper element and return false if it exists (user pressed bookmarklet twice)
  jq('.watching h1').after("<a href='#' onclick='toggle_hashrocket()'>Toggle Hashrocket</a><br /><br />");
  do_something();
}

window.setTimeout(helper_init, 50);
var jq = jq.noConflict();
