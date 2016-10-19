	function get_height() {
   			var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            tildas = d.getElementById("tildas");
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        return y;
    }
 
    function drawTildas(){
        var tildas = document.getElementById('tildas');
        var i, y = get_height(); tilda_string = "";
        for (i = 1; i < y; i = i * 1.2) {
            tilda_string += "~<br>";
        } 
        tilda_string += ":q!"
        tildas.innerHTML = tilda_string;
    } 

window.onload = drawTildas; 
