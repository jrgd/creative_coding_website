
$(document).ready(function(){

  var canvas2 = document.getElementById('canvas2');
  var ctx2 = canvas2.getContext('2d');
  var xii =0;
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var video = document.getElementById('video');
  

  video.addEventListener( "loadedmetadata", function (e) {
    var cw = video.videoWidth;
    var ch = video.videoHeight;

      console.log(cw, ch);


      canvas.width = cw;
      canvas.height = ch;

      canvas2.width = cw*10;
      canvas2.height = ch;

      ctx.clearRect( 0, 0, canvas.width, canvas.height);
      ctx2.clearRect( 0, 0, canvas.width*10, canvas.height);
      
      $(function() { 
        video.addEventListener('play', function() {
          var $this = this; //cache
          (function loop() {
            if (!$this.paused && !$this.ended) {
              // ctx.drawImage($this, 0, 0, cw, ch);
              setTimeout(loop, 1000 / 60); // drawing at 30fps
              setTimeout(slitscan, 1000/ 60);
              // setTimeout(horizontalhalf_pixelpuller, 1000/ 60);
            }
          })(); 
        }, 0);
      });

      function slitscan() {
        xii = xii + 10;
        if (xii > canvas.width*10) {
          // copy the image
          $( cloneCanvas(canvas2) ).prependTo('#canvas_storage');
          //save the image

          xii = 0;
        }
        console.log(xii, ch)
        ctx2.drawImage(video, 0,0, 10, ch, xii, 0, 10, ch);
      }

      function horizontalhalf_pixelpuller() {
        var source_image = video;
        ctx2.drawImage(video, 0, 0, cw/3, ch, 0, 0, cw/3, ch);
        ctx2.drawImage(video, cw/3, 0, 1, ch, cw/3, 0, cw, ch);
        // ctx2.drawImage(video, cw/3, 0, 0, ch,  cw/3, 0, cw/3*2, ch);
      }
  }, false );

});


function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}
