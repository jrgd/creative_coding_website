$(document).ready(function(){
  
  $(function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvas_lr = document.getElementById('canvas_lowres');
    var ctx_lr = canvas_lr.getContext('2d');
    canvas_lr.width = 400;
    canvas_lr.height = 300;
    var video = document.getElementById('video');
    video.muted = true;
    video.play();
    // console.log($(video).width())

    video.addEventListener('play', function() {
      var $this = this; //cache
      (function loop() {
        if (!$this.paused && !$this.ended) {
          ctx.drawImage($this, 0, 0);
          ctx_lr.filter = "brightness(2) contrast(400%) grayscale(200%)";
          ctx_lr.drawImage($this, 0, 0, $this.videoWidth/3*1, $this.videoHeight, 0, 0, canvas_lr.width/3*1, canvas_lr.height); //, ctx_lr.width, ctx_lr.height);
          ctx_lr.drawImage($this, ($this.videoWidth/3*1)-1, 0, 1, $this.videoHeight, canvas_lr.width/3*1, 0, canvas_lr.width/3*2, canvas_lr.height);
          setTimeout(loop, 1000/30 ); // drawing at 30fps 1000/30 // drawing at 10fps 100
        }
      })();
    }, 0);
  });

});