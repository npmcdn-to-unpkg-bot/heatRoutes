        var points = data; // data loaded from usdata.js

        var leafletMap = L.map('map').setView([39.83, -98.58], 5);

        L.tileLayer("https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibWFwdXRvcGlhIiwiYSI6IjZ6REI2MWsifQ.Apr0jB7q-uSUXWNvJlXGTg")
            .addTo(leafletMap);

        L.canvasLayer()
            .delegate(this) // -- if we do not inherit from L.CanvasLayer we can setup a delegate to receive events from L.CanvasLayer
            .addTo(leafletMap);
      
        function onDrawLayer(info) {
          
            var ctx = info.canvas.getContext('2d');
            ctx.clearRect(0, 0, info.canvas.width, info.canvas.height);
            ctx.fillStyle = "rgba(255,116,0, 0.2)";
            ctx.strokeStyle="#FF0000";
          ctx.lineWidth = 3;

            for (var i = 0; i < data.length; i++) {
                var d = data[i].path;
                ctx.beginPath();
                dot = info.layer._map.latLngToContainerPoint([d[0][0], d[0][1]]);
                ctx.moveTo(dot.x, dot.y, 3, 0, Math.PI * 2);
                for (var j=1; j< d.length; j++){
                  dot = info.layer._map.latLngToContainerPoint([d[j][0], d[j][1]]);
                  ctx.lineTo(dot.x, dot.y, 3, 0, Math.PI * 2);
                }
                ctx.stroke();
            }
            ctx.closePath();
          
          
          function pixelOnMouseOver(ctx,callback){
  var canvas = ctx.canvas;
  var w = canvas.width, h=canvas.height;
  var data = ctx.getImageData(0,0,w,h).data;
  canvas.addEventListener('mousemove',function(e){
    var idx = (e.offsetY*w + e.offsetX)*4;
    var parts = Array.prototype.slice.call(data,idx,idx+4);
    callback.apply(ctx,parts);
  },false);
}

		var wasOver;
		pixelOnMouseOver(ctx,function(r,g,b,a){
			var isOver = a > 10; // arbitrary threshold
			if (isOver != wasOver){
				//can.style.backgroundColor = isOver ? '#ff6' : '';
				wasOver = isOver;
			}
			out.innerHTML = "r:"+r+", g:"+g+", b:"+b+", a:"+a;
		});
          
        };


