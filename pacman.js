
var score = 0;
var lives = 2;
var powerPellets = 4;

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashfull',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    welcomeToPacman()
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function welcomeToPacman() {
  console.log('Welcome to Pacman\n');
  console.log('Pacman is hungry and wants to eat as many dots as he can,\nbut be careful of ghosts!\nYou can eat ghosts for extra points if you have power pellets.\n')
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\nSelect Option:\n');
  console.log('(d) Eat Dot');
  for (var i = 0; i < ghosts.length; i++) {
    console.log("(" + ghosts[i]['menu_option'] + ") Eat " + ghosts[i]['name'] + "(" + displayGhostEdible(ghosts[i]) + ")");
  };
  if (powerPellets > 0) {
    console.log('(p) Eat Power Pellet')
  };
  console.log('(q) Quit');
}

function displayGhostEdible(ghost) {
  if (ghost['edible'] === true) {
    return "edible";
  } else {
    return "inedible"
  };
}

function displayPrompt() {
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost['edible'] === false) {
    console.log("\nPac-man eats " + ghost['name'] + " and dies a " + ghost['colour'] + " death!");
    loseLife();
  } else if (ghost['edible'] === true) {
    score += 200;
    console.log("\nPac-man eats " + ghost['name'] + " and starts feeling " + ghost['character'] + "!");
    ghost['edible'] = false;
  }
}

function loseLife() {
  if (lives > 0) {
    lives -= 1;
  } else if (lives === 0) {
    console.log("\nGame Over");
    process.exit();
  };
}

function eatPowerPellet() {
  if (powerPellets > 0) {
    console.log("\nYou ate a Power Pellet!\nHurry up and eat as many ghosts as you can!");
    score += 50;
    for (var i = 0; i < ghosts.length; i++) {
      ghosts[i]['edible'] = true
    };
    powerPellets -= 1;
  } else {
    console.log("\nYou are out of Power Pellets!")
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case 'p':
      eatPowerPellet();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 800);
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
