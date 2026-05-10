// Branching Story Project
// Run with: node script.js
//
// Your job has two parts:
//   1. Write your story in the storyNodes object below
//   2. Implement the four functions marked with TODO
//
// The console input/output is handled for you at the bottom of the file.
// You do not need to touch anything in the "do not modify" section.
//
// Read PLAN.md before starting.

// -------------------------------------------------------
// YOUR STORY DATA
//
// Fill out the storyNodes with the appropriate data.
// Keep the same structure - only the text and ids change.
//
// Scene shape:
//   id        - a unique string key, kebab-case (e.g. "dark-hallway")
//   text      - the paragraph the player reads when they arrive here
//   choices   - array of choice objects ({ text, nextId })
//   isEnding  - false for regular scenes, true for ending scenes
//
// Ending scenes also need:
//   endingTitle - a short title shown when this ending is reached
//   choices: [] - an empty array (required, not optional)
//
// Rules:
//   - Every nextId must exactly match a real scene key in this object
//   - Use kebab-case for all ids
//   - You need at least 8 scenes total and at least 2 distinct endings
// -------------------------------------------------------

const storyNodes = {
  start: {
    id: "start",
    text: "Palos de la Frontera, Spain. August 2nd, 1492. Tomorrow, three ships sail west into the unknown. You are Rodrigo de Triana, a sailor aboard the Santa María. Tonight, Columbus summons you to his cabin. He is pale, his hands trembling — a fever has taken hold. 'I will not show weakness before the men,' he says. 'But the decision of whether we sail at dawn rests with you.'",
    choices: [
      { text: "Urge him to delay — a sick captain cannot lead this voyage", nextId: "delay-voyage" },
      { text: "Suggest Martín Pinzón take command in his place", nextId: "pinzon-commands" },
      { text: "Convince him to sail regardless — history will not wait", nextId: "sail-with-columbus" },
    ],
    isEnding: false,
  },

  "delay-voyage": {
    id: "delay-voyage",
    text: "Columbus agrees to rest. But on the second morning, a royal courier arrives at the docks with a sealed letter from King Ferdinand. The message is blunt: the fleet sails by dawn tomorrow or all royal funding is permanently withdrawn. Columbus is still weak, his fever unbroken.",
    choices: [
      { text: "Force the departure — the mission cannot die here", nextId: "sail-with-columbus" },
      { text: "Request an emergency audience with the Crown to negotiate more time", nextId: "royal-audience" },
    ],
    isEnding: false,
  },

  "pinzon-commands": {
    id: "pinzon-commands",
    text: "Martín Alonso Pinzón takes the helm of the Pinta and leads the three ships west. He is a capable mariner, but the men respect Columbus — not him. After thirty days at sea with no land in sight, whispers turn to shouts. A faction of sailors threatens to seize the Niña and return to Spain. Pinzón looks to you.",
    choices: [
      { text: "Stand with Pinzón — hold the western course", nextId: "follow-birds" },
      { text: "Side with the crew and demand they turn back", nextId: "turn-back-atlantic" },
    ],
    isEnding: false,
  },

  "sail-with-columbus": {
    id: "sail-with-columbus",
    text: "The fleet departs at dawn. Columbus stands at the helm of the Santa María, jaw set, eyes fixed west. On the twelfth day, he collapses. The ship's surgeon pulls you aside: without rest, he may not survive the crossing. The fleet is yours to command.",
    choices: [
      { text: "Turn back to the Canary Islands — his life comes before the mission", nextId: "turn-back-atlantic" },
      { text: "Continue west — we are too far in to stop now", nextId: "continue-west" },
    ],
    isEnding: false,
  },

  "royal-audience": {
    id: "royal-audience",
    text: "A royal advisor receives you in a cold antechamber. You argue the case — the importance of the western route, the potential for trade, the glory of Spain. He listens, unmoved, then offers a compromise: one ship, a skeleton crew, no royal insignia. 'If you find something, come back and we will talk about flags.'",
    choices: [
      { text: "Accept the terms — one ship is better than no ship", nextId: "small-expedition" },
      { text: "Refuse — the full expedition or nothing at all", nextId: "funding-lost" },
    ],
    isEnding: false,
  },

  "continue-west": {
    id: "continue-west",
    text: "Weeks pass. Columbus drifts in and out of consciousness in his cabin. The crew is close to breaking. Then, on the thirty-third day, you notice something: birds. A dozen of them, flying southwest in formation. Birds do not fly out to sea — they fly toward land.",
    choices: [
      { text: "Alter course and follow the birds southwest", nextId: "follow-birds" },
      { text: "Hold the original course — do not deviate from the plan", nextId: "funding-lost" },
    ],
    isEnding: false,
  },

  "follow-birds": {
    id: "follow-birds",
    text: "You follow the birds. On the tenth hour of October 12th, 1492, you climb to the crow's nest for your watch. The moonlight catches something on the horizon — a dark shape, low and long. Your hands tighten on the rigging. You know what it is before your mind can form the words.",
    choices: [{ text: "Sound the alarm — land has been sighted", nextId: "ending-discovery" }],
    isEnding: false,
  },

  "turn-back-atlantic": {
    id: "turn-back-atlantic",
    text: "The fleet turns east. The return crossing takes three weeks. When the ships enter Palos harbor, there are no crowds. Columbus, recovered but hollow-eyed, goes straight to his quarters without speaking. At court, the Crown receives the news quietly and withdraws its support for any further western expeditions.",
    choices: [
      { text: "Report what you believe — someone in Europe will still listen", nextId: "funding-lost" },
      { text: "Say nothing — the western route is finished", nextId: "ending-no-discovery" },
    ],
    isEnding: false,
  },

  "small-expedition": {
    id: "small-expedition",
    text: "A single caravel departs quietly in the spring of 1493, carrying no royal commission and barely enough provisions for sixty days. After five weeks at sea, you reach a chain of low, green islands. The water is impossibly clear. Fires burn on the shore. You have no authority, no soldiers, no flag to plant.",
    choices: [
      { text: "Go ashore anyway — the discovery belongs to whoever makes it", nextId: "ending-discovery" },
      { text: "Turn back — without a mandate, this means nothing", nextId: "ending-no-discovery" },
    ],
    isEnding: false,
  },

  "funding-lost": {
    id: "funding-lost",
    text: "With no sponsor and no ships, the western route becomes a theory that fewer and fewer people bother to argue. Columbus dies in Valladolid in 1506, known only as a navigator who never found what he was looking for. In 1497, John Cabot sails west under the English flag. He reaches a rocky northern coastline and returns to London with a story that changes everything — for England.",
    choices: [{ text: "Watch as England claims what Spain never reached", nextId: "ending-england-discovers" }],
    isEnding: false,
  },

  "ending-discovery": {
    id: "ending-discovery",
    text: "Spain plants its flag in the New World. In the years that follow, conquistadors sail west in numbers. Two vast continents — their cities, their gold, their people — are folded into the Spanish Empire. The Aztec and Inca civilizations fall within decades. Languages, religions, and bloodlines are erased and rewritten. The world is never the same. Whether that is triumph or tragedy depends entirely on who is telling the story.",
    choices: [],
    isEnding: true,
    endingTitle: "The New World — Discovered",
  },

  "ending-no-discovery": {
    id: "ending-no-discovery",
    text: "Europe looks east. The Aztec Empire reaches its peak under Moctezuma II. The Inca road network stretches further than any in the world. The Mississippi river cultures build and trade and govern without interference. For a generation, perhaps two, the Americas exist entirely on their own terms. No smallpox crosses the Atlantic. No silver drains south American mountains to line European treasuries. The world continues — different, and in some ways, whole.",
    choices: [],
    isEnding: true,
    endingTitle: "A World Left Untouched",
  },

  "ending-england-discovers": {
    id: "ending-england-discovers",
    text: "John Cabot's voyage reshapes the map. English ships follow. The New World is carved up not by Spanish swords but by English charters. The colonies that eventually form speak English, not Spanish. The revolutions they produce are different. The borders on every modern map are redrawn. Spain, having hesitated at the decisive moment, watches the century that could have been hers belong entirely to someone else.",
    choices: [],
    isEnding: true,
    endingTitle: "England's Century",
  },
};

// -------------------------------------------------------
// GAME STATE
// These variables are used by your functions below.
// Do not rename them - the game loop at the bottom depends on them.
// -------------------------------------------------------

let currentSceneId = "start";
const visitedScenes = [];

// -------------------------------------------------------
// YOUR FUNCTIONS
// Implement each function using the TODO comments as a guide.
// None of these functions should ask for input or deal with readline.
// They only read data, update state, and log to the console.
// -------------------------------------------------------

// getCurrentScene(sceneId)
// Returns the scene object for the given id.
function getCurrentScene(sceneId) {
  // TODO: Return the scene from storyNodes using sceneId as the key

  return storyNodes[sceneId];
}

// displayScene(sceneId)
// Logs the scene text and numbered choices to the console.
// For endings, logs the endingTitle instead of choices.
// Do not call any input functions here - the game loop handles that.
function displayScene(sceneId) {
  // TODO: Get the scene using getCurrentScene(sceneId)
  const scene = getCurrentScene(sceneId);

  // TODO: Print a divider so turns are easy to read

  console.log("\n" + "-".repeat(50));
  console.log("Scenes visited: " + visitedScenes.length);
  console.log("-".repeat(50));

  // TODO: Print the scene text using console.log

  console.log("\n" + scene.text + "\n");

  // TODO: Check scene.isEnding
  //   If true:  print "-- " + scene.endingTitle + " --"
  //   If false: loop through scene.choices and print each one numbered from 1
  //             Example output:
  //               1. Enter the door
  //               2. Walk away

  if (scene.isEnding) {
    console.log("-- " + scene.endingTitle + " --");
  } else {
    scene.choices.forEach(function (choice, index) {
      console.log(index + 1 + ". " + choice.text);
    });
  }
}

// makeChoice(sceneId, choiceNumber)
// Handles a player selecting one of the numbered choices.
// Returns the nextId of the chosen scene.
function makeChoice(sceneId, choiceNumber) {
  // TODO: Get the scene using getCurrentScene(sceneId)
  const scene = getCurrentScene(sceneId);

  // TODO: Get the selected choice using scene.choices[choiceNumber - 1]
  //   (choiceNumber is 1-based but arrays are 0-based)

  const selectedChoice = scene.choices[choiceNumber - 1];

  // TODO: Push sceneId into visitedScenes to track where the player has been

  visitedScenes.push(sceneId);

  // TODO: Return selectedChoice.nextId

  return selectedChoice.nextId;
}

// restartGame()
// Resets all state back to the beginning.
// Do not call displayScene here - the game loop handles that after restart.
function restartGame() {
  // TODO: Set currentSceneId back to "start"

  currentSceneId = "start";

  // TODO: Clear visitedScenes by setting visitedScenes.length = 0

  visitedScenes.length = 0;
}

// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// This section handles all console input and output.
// It calls your functions above to run the game.
// -------------------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runGame() {
  displayScene(currentSceneId);

  const scene = getCurrentScene(currentSceneId);

  if (scene.isEnding) {
    askAfterEnding();
  } else {
    const quitNumber = scene.choices.length + 1;
    console.log(quitNumber + ". Quit");
    askForInput();
  }
}

function askForInput() {
  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);
    const scene = getCurrentScene(currentSceneId);
    const quitNumber = scene.choices.length + 1;

    if (isNaN(choiceNumber) || choiceNumber < 1 || choiceNumber > quitNumber) {
      console.log("Please enter a number between 1 and " + quitNumber + ".");
      askForInput();
      return;
    }

    if (choiceNumber === quitNumber) {
      console.log("\nGoodbye.");
      rl.close();
      process.exit(0);
    }

    currentSceneId = makeChoice(currentSceneId, choiceNumber);
    runGame();
  });
}

function askAfterEnding() {
  console.log("\n1. Play Again");
  console.log("2. Quit");

  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);

    if (choiceNumber === 1) {
      restartGame();
      runGame();
      return;
    }

    if (choiceNumber === 2) {
      console.log("\nThanks for playing.");
      rl.close();
      process.exit(0);
    }

    console.log("Please enter 1 or 2.");
    askAfterEnding();
  });
}

runGame();
