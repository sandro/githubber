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
    readme = jq("<div id='readme'><div class='plain'></div></div>");
    jq("#browser").after(readme);
  }
  return readme;
}

function tohtml_callback(data){
  var readme = get_or_create_readme();
  readme.find('.plain').empty().html(data.html);
}

function push_text(text){
  jq.getJSON("http://tohtml.heroku.com/convert?callback=?", {'text': text}, tohtml_callback);
}

function readme_form(){
  var f = "<form id='readme_form'><textarea rows='20' cols='90'/><br /><input type='submit' value='Preview' /></form>";
  var form = jq(f);
  form.submit(function(){
    push_text(jq(this).find('textarea').attr('value'));    
    return false;
  });
  return form;
}

function init_readme_editor(){
  var path = jq.trim(jq("#path")[0].lastChild.data);
  if (path == "/" && jq('#readme_form').length == 0) {
    var form = readme_form();
    var readme = get_or_create_readme();
    readme.after(form);
  }
  else {
    return false;
  }
}

function toggle_hashrocket(){
  jq('a[href="/hashrocket"]').parent().toggle();
  return false;
}

function helper_init(){
  // add a githelper element and return false if it exists (user pressed bookmarklet twice)
  jq('.watching h1').after("<a href='#' onclick='toggle_hashrocket()'>Toggle Hashrocket</a><br /><br />");
  init_readme_editor();
}

window.setTimeout(helper_init, 150);
var jq = jQuery.noConflict();
