var global_color_start = 'rgb(252, 216, 114)';
var global_color_end = 'rgb(243, 83, 105';
var global_current_color = 'white';
var resize_text = 400;

$(document ).ready(function() {

  draw(global_color_start, global_color_end);

  $('#circleicon').css("visibility", "visible");
  $("#textbox_id").on("change keyup paste", function(){
    update_text();
  })

  $("#textbox_id").on("change keyup paste", function() {
    $('#charsLeft').val(100 - $(this).val().length);
  });

  $(".circle").on("click", function(){
    set_circle('circle', 'rgb(252, 216, 114)', 'rgb(243, 83, 105)')
  })

  $(".circle2").on("click", function(){
    set_circle('circle2', 'rgb(252, 54, 253)', 'rgb(93, 63, 218)')
  })

  $(".circle3").on("click", function(){
    set_circle('circle3', 'rgb(102, 244, 133)', 'rgb(23, 172, 255)')
  })

  $(".circle4").on("click", function(){
    set_circle('circle4', 'rgb(25, 198, 255)', 'rgb(90, 83, 255)')
  })

});

function set_circle(circle_name, color_start, color_end){

  $(".buttons-group").children('div').each(function(i, elm) {
    if ($(this).attr('class') == circle_name){
      $(this).children().css("visibility", "visible");
    }else{
      $(this).children().css("visibility", "hidden");
    }
  });

  global_color_start = color_start;
  global_color_end = color_end;
  draw(global_color_start, global_color_end);
  resize_text(resize_text);

}

function black(){
  global_current_color = 'black';
  draw(global_color_start, global_color_end);
}

function white(){
  global_current_color = 'white';
  draw(global_color_start, global_color_end);
}

function resize_text(max_w){

  var canvas = document.getElementById('thecanvas');
  var context = can.getContext('2d');
  context.font = '16pt Rubik';
  var maxWidth = max_w;
  var lineHeight = 25;
  var x = (canvas.width - maxWidth) / 2;
  var y = canvas.height / 2;
  var text = document.getElementById('textbox_id').value;

  wrapText(context, text, x, y, maxWidth, lineHeight);

}

function draw(color_start, color_end){

  var canvas = document.getElementById("thecanvas");
  var ctx = canvas.getContext("2d");
  ctx.rect(0, 0, canvas.width, canvas.height);

  var grd = ctx.createLinearGradient(200, 0, canvas.width, canvas.height);
  grd.addColorStop(0, color_start);   
  grd.addColorStop(1, color_end);
  ctx.fillStyle = grd;
  ctx.fill(); 
  ctx.fillStyle = global_current_color;
  ctx.font = 'bold 20pt Rubik';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  var maxWidth = 500;
  var lineHeight = 25;
  var x = canvas.width / 2;
  var y = canvas.height / 2.5;
  var text = document.getElementById('textbox_id').value;

  wrapText(ctx, text, x, y, maxWidth, lineHeight);

}

function to_image(){

  document.getElementById("theimage").src = document.getElementById("thecanvas").toDataURL("image/png");

  $('#theimage2').css("visibility", "hidden");
  $('#theimage2').css("width", "0");
  $('#theimage2').css("height", "0");

}

function reset(){
  
  document.getElementById("theimage").src = "";
  
  $('#theimage2').css("visibility", "visible");
  $('#theimage2').css("width", "578");
  $('#theimage2').css("height", "200");

  var can = document.getElementById('thecanvas');
  var ctx = can.getContext('2d');

  var context = canvas.getContext('2d');
  context.font = 'bold 20pt Rubik';
  var maxWidth = 400;
  var lineHeight = 25;
  var x = (canvas.width - maxWidth) / 2;
  var y = canvas.height / 2;
  var text = ""

  wrapText(context, text, x, y, maxWidth, lineHeight);

}

function download(){

  var canvas = document.getElementById("thecanvas");
  var copiedObject = cloneCanvas(canvas);
  
  copiedObject.width = 1080;
  copiedObject.height = 566;

  var ctx = copiedObject.getContext("2d");
  ctx.rect(0, 0, copiedObject.width, copiedObject.height);

  var grd = ctx.createLinearGradient(200, 0, copiedObject.width, copiedObject.height);
  grd.addColorStop(0, global_color_start);   
  grd.addColorStop(1, global_color_end);
  ctx.fillStyle = grd;
  ctx.fill(); 
  ctx.fillStyle = global_current_color;
  ctx.font = 'bold 40pt Rubik';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  var maxWidth = 934.2;
  var lineHeight = 50;
  var x = copiedObject.width / 2;
  var y = copiedObject.height / 2.5;
  var text = document.getElementById('textbox_id').value;

  wrapText(ctx, text, x, y, maxWidth, lineHeight);

  copiedObject.toBlob(function(blob) {
    
    saveAs(blob, "colorful-post.png");
  
  });

}          

function cloneCanvas(oldCanvas) {

  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d');

  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height;

  context.drawImage(oldCanvas, 0, 0);

  return newCanvas;

}

function update_text(){

  var canvas = document.getElementById("thecanvas");
  var can = document.getElementById('thecanvas');
  var ctx = can.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);   
  draw(global_color_start, global_color_end);

}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }else {
      line = testLine;
    }
  }
  
  context.fillText(line, x, y);
}