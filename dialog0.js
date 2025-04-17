const dialog0 = [
    "Liam: I can't believe we made it.",
    "Maya: Neither can I. It feels like a dream.",
    "Liam: Do you think they'll recognize us?",
    "Maya: After all this time? I hope not.",
    "Liam: What if they do?",
    "Maya: Then we smile... and pretend it was always part of the plan.",
    "Liam: You're still the best at that.",
    "Maya: And you're still terrible at hiding anything.",
    "Liam: Touché. Ready to go in?",
    "Maya: Only if you're walking beside me."
];





// Display in a div you already have a reference to
//const element = document.getElementById("my-div-id");
//display(element, face);

// https://zengm.com/facesjs/

/*
Overrides

Both display and generate accept an optional argument, specifying values to override either the randomly generated face (for generate) or the supplied face (for display). For instance:

// Generate a random face that always has blue skin
const face = generate({ body: { color: "blue" } });

// Display a face, but impose that it has blue skin
display("my-div-id", face, { body: { color: "blue" } });
*/


/*
Options

The generate function takes a second optional argument, which takes in extra parameters for player creation, in the form of an object.

Generate a female/male face (default is male):

const face = generate(undefined, { gender: "female" });

Assign a race attribute that can be white, black, asian, or brown (default is random):

const face = generate(undefined, { race: "white" });

Or both together:

const face = generate(undefined, { gender: "female", race: "asian" });

There is also an option to create a relative of an existing face object. This works by randomizing only some features of the existing face, so the new face is fairly similar to the existing one, like an immediate family member.

const face1 = generate();
const face2 = generate(undefined, { gender: "female", relative: face1 });
 */

/*
//function clearElm(id) { document.getElementById(id).innerHTML = ''; }


//import { display, generate } from "./node_modules/facesjs/build/esmodules/index.js";
//import { display, generate } from "https://app.unpkg.com/facesjs@4.3.3/files/build/esmodules/index.js"
//import { generate } from "https://unpkg.com/facesjs@4.3.3/build/esmodules/generate.js"
//import { display } from "https://unpkg.com/facesjs@4.3.3/build/esmodules/display.js"
//import { display, generate } from "https://unpkg.com/facesjs@4.3.3/build/esmodules/index.js"
// Uncaught SyntaxError: import declarations may only appear at top level of a module
//node_modules\facesjs\build\esmodules\
*/
