// Variables generales de la herramienta
var Sketches = [];
var currentSketch = 0;
var Sub_Canvas; /* Buffer o segundo canvas, aquí es donde se pintará realmente el dibujo */

// Variables para el tamaño del canvas
var canvasContainer = document.getElementById('canvas-container');
var canvasSize = {
	x: canvasContainer.getBoundingClientRect().width, 
	y: canvasContainer.getBoundingClientRect().height
};
var halfWidth = canvasSize.x / 2;
var halfHeight = canvasSize.y / 2;

// Variables globales para usar en los sketches
var cFrame = 0;
const PI2 = Math.PI * 2;
var cof = 0.1;


// Pre-carga de archivos como archivos de audio, fuentes, imágenes, etc.
function preload() {}


// Igualar tamaño virtual del buffer del canvas con el tamaño del elemento <canvas> en HTML
function setCanvasSize() {
	canvasSize.x = canvasContainer.getBoundingClientRect().width;
	canvasSize.y = canvasContainer.getBoundingClientRect().height;
}



// Configuración inicial del canvas de p5.js
function setup() {
	setCanvasSize();
	var canvas = createCanvas(canvasSize.x, canvasSize.y);
	canvas.parent('canvas-container');
	colorMode(HSB, 255);

	// Inicializa el buffer
	Sub_Canvas = createGraphics(canvasSize.x, canvasSize.y);
	Sub_Canvas.colorMode(HSB, 255);
	Sub_Canvas.background(0);

	// Realiza la configuración inicial de todos los sketches y sus pinceles
	for (var i = 0; i < Sketches.length; i++) {
		Sketches[i].setup();
	}
}



// Función nativa de p5.js ejecutada a cada window.resize
function windowResized() {
	setCanvasSize();
	halfWidth = canvasSize.x / 2;
	halfHeight = canvasSize.y / 2;
	resizeCanvas(canvasSize.x, canvasSize.y);
	background(0);

	// Realiza los calculos necesarios para reajustar cada sketch cuando es afectado por el cambio de tamaño de pantalla
	for (var i = 0; i < Sketches.length; i++) {
		if (Sketches[i].resize) Sketches[i].resize();
	}

	// TODO: Resize el segundo canvas (buffer canvas)
	// Fix temporal: Salva el viejo buffer en uno nuevo, pero si el canvas nuevo es mas pequeño, se perderán los pixeles sobrantes del lado derecho e inferior. 
	var _resizedBuffer = createGraphics(canvasSize.x, canvasSize.y);
	_resizedBuffer.colorMode(HSB, 255);
	_resizedBuffer.background(0);
	_resizedBuffer.image(Sub_Canvas, 	0,0,	Sub_Canvas.width, Sub_Canvas.height);
	Sub_Canvas = _resizedBuffer;
	
}


// Función nativa de p5.js para dibujar, ejecutada 60 veces por segundo (o menos dependiendo del rendimiento de la computadora)
function draw() {
	/* CLEANER */
	background(0);
	// background(0, 50);

	// Primera capa encima del fondo, va el segundo canvas que está guardando los trazos del usuario
	image(Sub_Canvas, 0, 0, canvasSize.x, canvasSize.y);

	Sketches[currentSketch].draw();

	cFrame++;

	// Función nativa de p5.js para detectar click sostenido
	if (mouseIsPressed) {
		Sketches[currentSketch].bufferDraw();
	}
}


// Función nativa de p5.js para detectar teclas presionadas
function keyPressed() {
	// Cambia entre sketches presionando la tecla 'espacio'
	if (keyCode == 32) {
		// Avanza hacia el siguiente sketch y se reinicia cuando alcanza el límite
		currentSketch ++;
		if (currentSketch >= Sketches.length) {
			currentSketch = 0;
		}

		console.log('currentSketch: ' + currentSketch);
	}


	// Limpia el canvas con los trazos del usuario
	// presionando la tecla 'escape'
	else if (keyCode == 27) {
		Sub_Canvas.clear();
		Sub_Canvas.background(0);
	}


	// Descarga una imagen de lo que esta pintado en ese momento en el segundo canvas
	// presionando la tecla 's'
	else if (keyCode == 83) {
		var _imgTitle = 'impossible-brush-' + cFrame;
		saveCanvas(Sub_Canvas, _imgTitle, 'png');
		console.log('Imagen salvada');
	}
}










