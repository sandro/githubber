// javascript:(function(){%20var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://turriate.com/media/githelper/helper.js';%20document.body.appendChild(s);%20window.setTimeout('init()',%20500);%20})();
//(function(){
//  s=document.createElement('script');
//  s.type='text/javascript';
//  s.src='http://turriate.com/media/githelper/helper.js';
//  document.body.appendChild(s);
//})();

function chunk_text(text){
  var chunks = [];
  for(var i = 0; i < text.length; i+=1000){
    chunks.push(text.substring(i, i+1000));
  }
  return chunks;
}

function get_or_create_readme(){
  var readme = jq("#readme");
  if (! readme.length) {
    readme = jq("<div id='readme'><div class='wikistyle'></div></div>");
    jq("#browser").after(readme);
  }
  return readme;
}

function tohtml_callback(data){
  //console.log("callback");
  //console.log(data);
  if (data.complete){
    var readme = get_or_create_readme();
    readme.find('.wikistyle').empty().html(data.html);
  }
}
function push_text(text){
  var chunked = chunk_text(text);
  jq.each(chunked, function(i, text){
    var data = {'text': text, 'repo': window.location.pathname}
    if (chunked.length == 1) {
      jq.extend(data, {'progress': 'all'});
    }
    else if (i == 0){
      jq.extend(data, {'progress': 'begin'});
    }
    else if ((i+1) == chunked.length){
      jq.extend(data, {'progress': 'end'});
    }
    else {
      jq.extend(data, {'progress': 'middle'});
    }
    jq.getJSON("http://localhost:4000/readmes/convert?callback=?", data, tohtml_callback);
  });
}

function readme_form(){
  var f = "<form id='readme_form'><textarea rows='10' cols='90'/><br /><input type='submit' value='Preview' /></form>";
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
