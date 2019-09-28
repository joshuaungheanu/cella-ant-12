// A white triangle facing North
function draw_triangle_N(context, posX, posY) {
	context.save();
	context.beginPath();
	context.moveTo(posX-5, posY+5);
	context.lineTo(posX, posY-5);
	context.lineTo(posX+5, posY+5);
	context.closePath();
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = 'black';
	context.stroke();

	context.restore();

}

// A white triangle facing South
function draw_triangle_S(context, posX, posY) {
	context.save();

	context.beginPath();
	context.moveTo(posX+5, posY-5);
	context.lineTo(posX, posY+5);
	context.lineTo(posX-5, posY-5);
	context.closePath();
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = 'black';
	context.stroke();

	context.restore();
}

// A white triangle facing East
function draw_triangle_E(context, posX, posY) {
	context.save();

	context.beginPath();
	context.moveTo(posX-5, posY-5);
	context.lineTo(posX+5, posY);
	context.lineTo(posX-5, posY+5);
	context.closePath();
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = 'black';
	context.stroke();

	context.restore();
}


// A white triangle facing West
function draw_triangle_W(context, posX, posY) {
	context.save();

	context.beginPath();
	context.moveTo(posX+5, posY+5);
	context.lineTo(posX-5, posY);
	context.lineTo(posX+5, posY-5);
	context.closePath();
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = 'black';
	context.stroke();

	context.restore();
}

// Create the grid
function drawGrid(context, xG, yG, colorG) {
	context.save();
	let width = context.canvas.width;
	let height = context.canvas.height;
	for (var i = 0; i < width; i += width/xG) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, height);
		context.strokeStyle = colorG;
		context.lineWidth = 0.5;
		context.stroke();
	}
	for (var j = 0; j < height; j += height/yG) {
		context.beginPath();
		context.moveTo(0, j);
		context.lineTo(width, j);
		context.strokeStyle = colorG;
		context.lineWidth = 0.5;
		context.stroke();
	}
	context.restore();
}

// Create a square to fit inside the grid
function drawSquare(context, posX, posY, color) {
	context.save();

	context.fillStyle = color;
	context.fillRect(posX-8, posY-8, 16, 16);

	context.restore();
}

// Using the Cellular Automaton Algorthm to move the ant

function move(context, state, dir, posX, posY, colors, moves) {
	context.save();

	// Break
	if (moves == 0) {
		return;
	}

	moves--;

	// grabs the color of the square the mover is currently on
	var space = context.getImageData(posX-8, posY-8, 1, 1);
	r = space.data[0];
	g = space.data[1];
	b = space.data[2];

	// compares the value and then determins the state
	if (r == 0 && g == 0 && b == 0) {
		state = 0;
	}
	else if (r == 255 && g == 0 && b == 0) {
		state = 1;
	}
	else if (r == 255 && g == 255 && b == 0) {
		state = 2;
	}
	else if (r == 0 && g == 0 && b == 255) {
		state = 3;
	}

	// Draws the colored square on the board and so on.
	/*	Passing the parameters
			1. Canvas
			2. Passing the current state
			3. Direction of the ant
			4. X Position
			5. Y Position
			6. Array of Colors
			7. Amount of moves
	*/
	drawSquare(context, posX, posY, colors[++state]);
	state--;

	// Depending on the state, switch case will determine the direction we move.
	switch(true) {
		case (state == 0 || state == 1):
			// ant turn left
			if (dir > 0) {
				dir--;
			}
			else {
				dir = 3;
			}
			break;
		case (state == 2 || state == 3):
			// ant turn right
			if (dir < 3) {
				dir++;
			}
			else {
				dir = 0;
			}
			break;
	}

	// Move the ant to its next direction
	switch(dir) {
		case 0:
			// North
			posY-=18;
			draw_triangle_N(context, posX, posY);
			break;
		case 1:
			// South
			posX+=18;
			draw_triangle_E(context, posX, posY);
			break;
		case 2:
			// East
			posY+=18;
			draw_triangle_S(context, posX, posY);
			break;
		case 3:
			// West
			posX-=18;
			draw_triangle_W(context, posX, posY);
	}

	context.restore();

	// Execute every 1/1000 of a second.
	setTimeout(move, 1, context, state, dir, posX, posY, colors, moves);

	return;
}
