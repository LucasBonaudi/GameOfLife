let config = {
	sqrRes: 10,
	xRes: 1000,
	yRes: 500
};

let grid = {
	nCol: null,
	nRow: null,
	content: null,

	countAliveNeighbors: function (col, row) {
		//TODO: improve this
		let result = 0;
		
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				

				if(i !== 0 || j !== 0) {
					let c = i + col;
					let r = j + row;
					
					if(c < 0) c = this.nCol - 1;
					if(c > (this.nCol - 1)) c = 0;	

					if(r < 0) r = this.nRow - 1;
					if(r > (this.nRow - 1)) r = 0;

					result += this.content[c][r];
				}
			}
		}

		return result;
	}
};


function makeGridArray(cols, rows) {
	return [...Array(cols)].map(e => Array(rows))
}

function setup() {
	let canvas = createCanvas(config.xRes, config.yRes);
	canvas.parent('canvasContainer');

	grid.nCol = width / config.sqrRes;
	grid.nRow = height / config.sqrRes;
	grid.content = makeGridArray(grid.nCol, grid.nRow);

	for (let i = 0; i < grid.nCol; i++) {
		for (let j = 0; j < grid.nRow; j++) {
			grid.content[i][j] = floor(random(2));
		}
	}
}

function draw() {
	background(0);

	//drawing of the squares
	for (let i = 0; i < grid.nCol; i++) {
		for (let j = 0; j < grid.nRow; j++) {
			let x = i * config.sqrRes;
			let y = j * config.sqrRes;
			
			fill(grid.content[i][j] === 1 ? 255 : 0);
			stroke(128, 128, 128);
			rect(x, y, config.sqrRes, config.sqrRes)		
		}
	}

	let newGrid = makeGridArray(grid.nCol, grid.nRow);

	for (let i = 0; i < grid.nCol; i++) {
		for (let j = 0; j < grid.nRow; j++) {
			let nNeighbors = grid.countAliveNeighbors(i, j);

			let cellState = grid.content[i][j];

			if(cellState === 0 && nNeighbors === 3) {
				newGrid[i][j] = 1;
			} else if (cellState === 1 && (nNeighbors < 2 || nNeighbors > 3)) {
				newGrid[i][j] = 0;
			} else {
				newGrid[i][j] = cellState;
			}
		}
	}	

	grid.content = newGrid;
}