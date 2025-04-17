"strict";
import { display, generate } from "facesjs";

import * as Tone from 'tone';
//import {Synth} from 'tone';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


function makeFace(actorName) { const face0 = generate(); return face0; }
function faceFrame(face,Mouth) { 
    //console.log('ff', face);
    display("my-div-id1", face, {mouth: { id: `mouth${Mouth}`}} ); 
}  
//async function old_animLoop() { const dur = 250; let Mouth = 0; while (true) {  faceFrame(Mouth+2); await delay(dur); Mouth = (Mouth + 1) % 7; } } // 1 is bad, 2-8 is good. 7 options.
function drawHead(face,open) { faceFrame(face, open ? 7 : 5); } // 4 normal, 5 er god lukket mund.
//////////////////////////////////////

const actors = {}
function getActor(actorName) {
    //console.log('getActor', actorName);
    if (!(actorName in actors)) { actors[actorName] = makeFace(actorName); }
    return actors[actorName];
}

// Speech + Animation
const synth = window.speechSynthesis;

const voices = speechSynthesis.getVoices();
console.log('foundVoices:', voices);

//function speak0() { const text = "Hello there! I'm a randomly generated cartoon head."; speakLine(text); }
async function speak(whichPart) { 
    playMusic2();
    await delay(8000);
    console.log('after await');
    //return; 
    const dlg = (whichPart ? dialog : dialog0 );
    for (let line of dlg) { speakLine(line); } 
}

function playMusic1() { 
    console.log('playMusic');
    var synth2 = null;
    if (!synth2) { synth2 = new Tone.Synth().toDestination(); }
    //if (!synth2) { synth2 = new Synth().toDestination(); }
    synth2.triggerAttackRelease('C4', '8n'); 
}

// async function playMusic2() {

async function playMelodyWithAwait(part, durationInSeconds) {
    // I am not too happy about this, it appears it waits N seconds?
    return new Promise(async (resolve) => {
      await Tone.start();       // Wait for AudioContext to start  
      Tone.Transport.scheduleOnce(() => { resolve(); }, `+${durationInSeconds}`); // melody is done // Schedule a function to run after the melody ends  
      Tone.Transport.start();      // Start playing the melody
      part.start(0);
    });
}

//async function playMusic2()
let playMusic2 = async () =>  {
    console.log('playMusic2');
    await Tone.start(); // unlock AudioContext
    //Tone.Transport.bpm.value = 120;
    Tone.Transport.bpm.value = 220;
    Tone.Transport.start();
    //
    const synth31 = new Tone.Synth({oscillator: { type: 'square' } }).toDestination();  

    const synth32 = new Tone.AMSynth({
        harmonicity: 1.5,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 1
        }
      }).toDestination();

      const synth3 = new Tone.DuoSynth({
        harmonicity: 1.8,
        voice0: {
          oscillator: { type: "sine" },
          envelope: {
            attack: 0.1,
            release: 0.5
          }
        },
        voice1: {
          oscillator: { type: "triangle" },
          envelope: {
            attack: 0.2,
            release: 1
          }
        }
      }).toDestination();      

    const synth37 = new Tone.FMSynth({
        modulationIndex: 10,
        harmonicity: 2,
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.05,
          decay: 0.2,
          sustain: 0.3,
          release: 1
        },
        modulation: { type: "triangle" },
        modulationEnvelope: {
          attack: 0.2,
          decay: 0.2,
          sustain: 0.2,
          release: 0.5
        }
      }).toDestination();      

    const reverb = new Tone.Reverb({ decay: 2, wet: 0.4 }).toDestination();
    synth3.connect(reverb);

    const chorus = new Tone.Chorus(4, 2.5, 0.3).start();
    synth3.connect(chorus);
    chorus.toDestination();

    // A cheerful 20-note melody (C major scale with some rhythm)
    const melody = [        ["0:0", "C4"],        ["0:1", "E4"],        ["0:2", "G4"],        ["0:3", "C5"],        ["1:0", "E5"],        ["1:1", "D5"],        ["1:2", "C5"],        ["1:3", "G4"],        ["2:0", "F4"],        ["2:1", "A4"],        ["2:2", "C5"],        ["2:3", "B4"],        ["3:0", "A4"],        ["3:1", "G4"],        ["3:2", "E4"],        ["3:3", "C4"],        ["4:0", "D4"],        ["4:1", "F4"],        ["4:2", "G4"],        ["4:3", "C5"]      ];  
    const part0 = new Tone.Part(
         (time, note) => { synth3.triggerAttackRelease(note, "8n", time); }, 
         melody
    );
    console.log('part0 says:', part0);
    part0.start(0);  
    part0.loop = false;  
}

function setNameplate(who, who_details) {
    const e1 = document.getElementById("nameplate");
    e1.innerHTML = who;

    const e2 = document.getElementById("details");
    e2.innerHTML = who_details;
}

function setCaption(words) { const e = document.getElementById("caption"); e.innerHTML = words; }

function whoParts(who_block) {
    const parts = who_block.split(' (');
    const who = parts[0];
    const details0 = (parts.length < 2 ? '' : ' (' + parts[1]);
    const details1 = who_block; // easier approach, almost same result
    return [who,details0]; // (if we use details0, we can use italics.)
}
function speakLine(line) {
    const parts = line.split(': ');
    const who_block = parts[0];
    const [who, who_details] = whoParts(who_block);
    const words = parts[1];
    const face = getActor(who);
    const utter = new SpeechSynthesisUtterance(words); 
    utter.voice = voices[0]; //1]; // fixme, should follow actor.
    utter.pitch = Math.random()*2;
    setupSyncAnim(face, who, who_details, words, utter);
    synth.speak(utter); // we cannot await speak, we would have to build a promise around its event-listeners.
}
window.speak = speak; // (so UI can see our module-stuff.)
drawHead(getActor('presenter'),false); //old_animLoop();


function setupSyncAnim(face, who, who_details, words, utter) { // synchronized anim to speech!
    let flipDur_ms = 150;
    let animInterval;
    let mouthOpen = false;

    utter.onstart = () => {

        console.log(who, 'says:', words, who_details);
        setNameplate(who, who_details);
        setCaption(words);
    
        animInterval = setInterval( () => {
            mouthOpen = !mouthOpen;
            drawHead(face, mouthOpen);
        }, flipDur_ms);
    };
    
    utter.onend = () => {
        clearInterval(animInterval);
        mouthOpen = false;
        drawHead(face, mouthOpen);
    };    
}

