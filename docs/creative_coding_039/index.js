$(document).ready(function(){
  
  $(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvas_lr = document.getElementById('canvas_lowres');
    var ctx_lr = canvas_lr.getContext('2d');
    canvas_lr.width = 100;
    canvas_lr.height = 40;
    var video = document.getElementById('video');

    // console.log($(video).width())

    video.addEventListener('play', function() {
      var $this = this; //cache
      (function loop() {
        if (!$this.paused && !$this.ended) {
          ctx.drawImage($this, 0, 0);
          ctx_lr.filter = "brightness(2) contrast(400%) grayscale(200%)";
          ctx_lr.drawImage($this, 0, 0, $this.videoWidth, $this.videoHeight, 0, 0, canvas_lr.width, canvas_lr.height); //, ctx_lr.width, ctx_lr.height);
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      })();
    }, 0);
  });

});