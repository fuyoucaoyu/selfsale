/**
 * @file
 */
module.exports = {
    template: __inline('./editer.html'),
    props: ['info'],
    data: function () {
        return {
            img: 'defaultvalue',
            count: 0
        };
    },
    computed: {
        imgCanvas: {
            get: function () {
                return document.getElementById("myCanvas");
            }
        },
        ctx: {
            get: function () {
                // this.imgCanvas.getContext('2d');
                var c = document.getElementById("myCanvas");
                return c.getContext("2d");
            }
        }
    },
    methods: {
        useMedia: function () {
            var self = this;
            var video = document.getElementById('monitor');
            var canvas = document.getElementById('photo');
            function gotStream(stream) {
                self.info.msg = 'get stream';
                video.src = URL.createObjectURL(stream);
                video.onerror = function () {
                    stream.stop();
                };
                stream.onended = noStream;
                video.onloadedmetadata = function () {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                };
            }
            function noStream() {
                // document.getElementById('errorMessage').textContent = 'No camera available.';
                setTimeout(function() {
                    self.info.msg = 'No camera available.';
                }, 3000);
            }
            function snapshot() {
                canvas.getContext('2d').drawImage(video, 0, 0);
            }
            navigator.getUserMedia = (navigator.getUserMedia ||
                                       navigator.webkitGetUserMedia ||
                                       navigator.mozGetUserMedia ||
                                       navigator.msGetUserMedia);
            
            if (navigator.getUserMedia) {
                this.info.msg = 'start open media';
                navigator.getUserMedia({video:true}, gotStream, noStream);
                // navigator.getUserMedia({ audio: true, video: true }, gotStream, noStream);
            } else {
                this.info.msg = 'no policy';
            }

        },
        drawImage: function () {
            var self = this;
            var c=document.getElementById("myCanvas");
            var ctx=c.getContext("2d");

            var image = new Image();
            image.onload = function (evt) {
                ctx.drawImage(image, 0, 0);
                setTimeout(function () {
                    self.drawFont();
                }, 1000);
            }
            image.src = '../../static/images/test.png';
        },
        drawFont: function () {
            var self = this;
            var c=document.getElementById("myCanvas");
            var ctx=c.getContext("2d");
            ctx.globalCompositeOperation="destination-out";
            ctx.font="50px Anton";
            // ctx.strokeText("Hello World",50,50);
            ctx.fillText("Hello World",100,50);

            setTimeout(function () {
                self.updateCanvasStatus(Math.PI * 0.5, 2, 2);
            }, 2000);
        },
        updateCanvasStatus: function (angle, scaleX, scaleY) {
            var c=document.getElementById("myCanvas");
            var ctx=c.getContext("2d");
            // ctx.clearRect(0, 0, c.width, c.height);
            ctx.translate(c.width * 0.5, c.height * 0.5);
            ctx.rotate(angle);
            ctx.scale(scaleX, scaleY);
        },
        loadImage: function () {
            var self = this;
            var image = new Image();
            image.onload = function (evt) {
                self.img = image;
            }
            image.src = '../../static/images/test.png';
        },
        intervalHandler: function () {
            if (!this.img) {
                return;
            }

            this.ctx.clearRect(0, 0, this.imgCanvas.width, this.imgCanvas.height);
            this.ctx.save();
            this.ctx.translate(this.imgCanvas.width * 0.5, this.imgCanvas.height * 0.5);
            this.ctx.rotate(10 * Math.PI * this.count / 180);
            this.count += 1;
            this.ctx.globalCompositeOperation="source-over";
            this.ctx.drawImage(this.img, -this.imgCanvas.width * 0.5, -this.imgCanvas.height * 0.5);
            this.ctx.globalCompositeOperation = "destination-out";
            this.ctx.font = "50px Anton";
            this.ctx.fillText("Hello World", 100 -this.imgCanvas.width * 0.5, 50 -this.imgCanvas.height * 0.5);
            // this.ctx.translate(-this.imgCanvas.width * 0.5, -this.imgCanvas.height * 0.5);
            this.ctx.restore();

            document.getElementById('myImage').src = this.imgCanvas.toDataURL();
        }
    },
    ready: function (argument) {
        console.log('editer ready');
        // this.useMedia();
        // this.drawImage();
        this.loadImage();
        // this.ctx.scale(2, 2);
        setInterval(this.intervalHandler, 1000);
    }
};
