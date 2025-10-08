
let emptyTilePosRow = 3;
let emptyTilePosCol = 3;

function loadPuzzle() {
  const images = document.querySelectorAll(".puzzle-container img");

  for (let i = 0; i < images.length; i++) {
    
    // rounds up to nearest int
    const row = Math.floor(i / 3) + 1;
    // returns difference between int
    const col = (i % 3) + 1;

    // sets "data-row and data-col to 'i' for each loop in (in the html)"
    images[i].dataset.row = row;
    images[i].dataset.col = col;
    images[i].id = `img-${row}-${col}`;

    // the last image needs to be removed to be able to move the puzzle (will come back when solved)
    if (i === images.length - 1) {
      images[i].src = "";
      images[i].alt = "empty";
      images[i].classList.add("empty");
      continue;
    }
    // specifies which folder (easy to switch if adding more themes)
    images[i].src = `./attributes/images/Resevoir Dogs/${i+1}.jpg`;
    images[i].alt = `Resevoir Dogs ${i+1}`;
  }

  // add click listener to each img
  images.forEach(function(img) {
    img.addEventListener("click", function() {
      moveImage(this);
    });
  });
  shufflePuzzle()
}

function moveImage(tile) {
    const tilePos = getPosition(tile);

    // checks if empty tile is 1 slot away and then runs the true statement if so
    if (!isAdjacent(tile)) {
        return;
    }
    // switches properties with clicked tile and empty one if 1 slot away
    const emptyTile = document.querySelector(".empty");

    emptyTile.src = tile.src;
    emptyTile.alt = tile.alt;
    emptyTile.name = tile.name

    tile.src = "";
    tile.alt = "empty";
    tile.name ="";

    emptyTile.classList.remove("empty");
    tile.classList.add("empty");

    emptyTilePosRow = tilePos.row;
    emptyTilePosCol = tilePos.col;

    // after each move check if victory
    checkVictory();
}


function getPosition(tile) {
    // takes id "img-1-1" and puts each value in the parts (0-2). '10' defines the numbers to decimal
    const parts = tile.id.split("-");
    const row = parseInt(parts[1], 10);
    const col = parseInt(parts[2], 10);
    return { row, col };
}


function isAdjacent(tile) {
    const pos = getPosition(tile);
    return (
        // checks if the value between row and col is 1 (prevents it to be a negative value)
        (pos.row === emptyTilePosRow && Math.abs(pos.col - emptyTilePosCol) === 1) ||
        (pos.col === emptyTilePosCol && Math.abs(pos.row - emptyTilePosRow) === 1)
    );
}

function checkVictory() {
    const tiles = document.querySelectorAll(".puzzle-container img");

    // each img has a name 1-9 that represents correct position.
    for (let i = 0; i < tiles.length-1; i++) {
        if (tiles[i].name !== (i + 1).toString()) {
            return false;
        }
    }
    // when puzzle is solved set the empty tile into the correct one
    const emptyTile = document.querySelector(".empty");
    emptyTile.src = `./attributes/images/Resevoir Dogs/9.jpg`;
    emptyTile.alt = "Resevoir Dogs 9";
    emptyTile.id = "img-3-3";
    emptyTile.name = "9";
    emptyTile.classList.remove("empty");

    // Adds class active to victory-container so it gets displayed
    document.querySelector(".victory-container").classList.add("active");
    return true;
}

function shufflePuzzle() {

    // get all <img> and converts NodeList into a normal array
    const tiles = Array.from(document.querySelectorAll(".puzzle-container img"));
    
    // finds the empty array (pos 3-3)
    // returns empty tile to emptyTile
    const emptyTile = tiles.find(tile => tile.classList.contains("empty"));
    // returns all except the empty tile to movableTiles array
    const movableTiles = tiles.filter(tile => !tile.classList.contains("empty"));

    // randomly selects a tile that that current switches place to
    for (let i = movableTiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swaps current tile with a random one to make sure each get a available tile
        [movableTiles[i].src, movableTiles[j].src] = [movableTiles[j].src, movableTiles[i].src];
        [movableTiles[i].alt, movableTiles[j].alt] = [movableTiles[j].alt, movableTiles[i].alt];
        [movableTiles[i].name, movableTiles[j].name] = [movableTiles[j].name, movableTiles[i].name];
    }

    // reset empty tile
    emptyTile.src = "";
    emptyTile.alt = "empty";
    emptyTile.name = "";
    emptyTilePosRow = 3;
    emptyTilePosCol = 3;
}

function resetPuzzle() {
  const images = document.querySelectorAll(".puzzle-container img");

  for (let i = 0; i < images.length; i++) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    images[i].dataset.row = row;
    images[i].dataset.col = col;
    images[i].id = `img-${row}-${col}`;

    const clone = images[i].cloneNode(true);
    images[i].parentNode.replaceChild(clone, images[i]);

    if (i === images.length - 1) {
      clone.src = "";
      clone.alt = "empty";
      clone.name = "";
      clone.classList.add("empty");

      emptyTilePosRow = 3;
      emptyTilePosCol = 3;
      continue;
    }

    clone.src = `./attributes/images/Resevoir Dogs/${i+1}.jpg`;
    clone.alt = `Resevoir Dogs ${i+1}`;
    clone.name = (i + 1).toString();
    clone.classList.remove("empty");
  }
}

function restartPuzzle() {
  resetPuzzle();
  loadPuzzle();
  console.log("Puzzle restarted.");
}

function closeVictoryWindow() {
  const victoryWindow = document.querySelector(".victory-container");
  victoryWindow.classList.remove("active");
}

// puts event listeners once to the buttons in the victory window
document.querySelector(".victory-container__close")
  .addEventListener("click", closeVictoryWindow);

document.querySelector(".victory-container__restart")
  .addEventListener("click", () => {
    closeVictoryWindow();
    restartPuzzle();
  });