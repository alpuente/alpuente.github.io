window.onload = function () {
	var canvas = document.getElementById("myCanvas");
	paintCanvas(canvas);
}

function paintCanvas(canvas) {
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#ADD8E6";
	ctx.fillRect(0,0,200,100);

	ctx.moveTo(0,0);
	ctx.lineTo(200,100);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI);
	ctx.stroke();

	ctx.font = "30px Arial";
	ctx.strokeText("Hey world!", 10, 50);
}
