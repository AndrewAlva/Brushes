

var Sketch_0 = {
	// Variables exclusivas de este sketch 
	brushWidth: 100,
	brushRotation: -45,


	setup: function() {
		// Cálculos y operaciones especiales para iniciar el pincel
		console.log('Sketch_0.setup() executed');
	},


	draw: function() {		
		this.brush(this.yDisplace);
	},
	bufferDraw: function() {
		this.bufferBrush(this.yDisplace);
	},


	brush: function(displacement) {
		this.style();
		this.figure(displacement);
	},
	bufferBrush: function(displacement) {
		this.bufferStyle();
		this.bufferFigure(displacement);
	},


	style: function() {
		// Las propiedades físicas o de apariencia que tiene un pincel análogo:
		// Relleno, borde, color, etc.
		// Estas propiedades también pueden ser manipuladas por medio de variables para aumentar la complejidad del pincel

		noFill();
		stroke(255, 100);
		strokeWeight(1);
	},
	bufferStyle: function() {
		// Se repite la configuracion del estilo pero para el segundo canvas

		Sub_Canvas.noFill();
		Sub_Canvas.stroke(255, 30);
		Sub_Canvas.strokeWeight(1);
	},



	figure: function(displacement) {
		// Formas y movimientos que queremos que el pincel realice,
		// esto incluye animaciones por medio de parametros customizables,
		// y también podrian detonarse sistemas de partículas aquí
		
		push();
			translate(mouseX, mouseY);
			rotate(this.brushRotation);
			ellipse(0, 0, this.brushWidth, 4);
		pop();
	},
	bufferFigure: function(displacement) {
		// Se repite la configuracion de la figura pero para el segundo canvas
		
		Sub_Canvas.push();
			Sub_Canvas.translate(mouseX, mouseY);
			Sub_Canvas.rotate(this.brushRotation);
			Sub_Canvas.ellipse(0, 0, this.brushWidth, 4);
		Sub_Canvas.pop();
	},


	resize: function() {
		console.log('Sketch_0 resized');

		this.yDisplace = halfHeight;
	}
}


// Agrega este sketch a la lista de sketches para poder cambiar en el sitio
Sketches.push(Sketch_0);




