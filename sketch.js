

let classifier,
    options = { probabilityThreshold: 0.7 },
    label = "",
    confidence = 0.0;

let sounds= [];
let particles=[];
let fft;
let img;

function preload() {
  // load in classifier - provide options
  classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/nd-z7BVDw/model.json", options);
   sounds[0] = loadSound("Skrillex.mp3");
  sounds[1] = loadSound("Nyan.mp3");
  sounds[2] = loadSound("Haddaway.mp3");
  img=loadImage("BlurredPhoto.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 fft = new p5.FFT();
  imageMode(CENTER);

  // start classification, tell ml5.js to call gotResult when we have an idea what this is
  classifier.classify(gotResult);
  
}

function draw() {
 background(0);
  stroke(255);
  noFill();
  
  angleMode(DEGREES);
  translate(width/2,height/2);
    image(img,0,0,width,height);
  
  fft.analyze();
  let amp=fft.getEnergy(20,200);
  let wave = fft.waveform();
  
   beginShape()
  for(var i=0;i<=180;i++)
    {
      let index =floor(map(i,0,180,0,wave.length-1));
      let r=map(wave[index],-1,1,150,350)
      let x = r*sin(i);
      let y= r*cos(i);
      vertex(x,y);
    }
  endShape();
  beginShape()
  for(var i=0;i<=180;i++)
    {
      let index =floor(map(i,0,180,0,wave.length-1));
      let r=map(wave[index],-1,1,150,350)
      let x = r*-sin(i);
      let y= r*-cos(i);
      vertex(x,y);
    }
  endShape();
  
  let p= new particle();
  particles.push(p);
  
  for(i=0;i<particles.length;i++)
    {
      particles[i].update();
      particles[i].show();
    }
  
}
// A function to run when we get any errors and the results
function gotResult(error, results) {
  if (error) {
    // check for error
    return console.log(error);
  }
  
  console.log(results);

  // save these values
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2); // Round the confidence to 0.01
  //noLoop();
  for(i=0;i<=sounds.length;i++)
    {
      
    if(label == "DubStep")
  {
    sounds[0].play();
    sounds[i].stop();
    
  }
  else if (label == "Class 4"){
    sounds[1].play();
    sounds[i].stop();
  }
     if (label == "What is love"){
      sounds[2].play();
      sounds[i].stop();
  }
}
}
  
class particle{
  constructor()
  {
    this.pos= p5.Vector.random2D().mult(250);
    this.vel = createVector(0,0);
    this.acc = this.pos.copy().mult(random(0.001,0.001));
    this.w = random(3,5);
    
}
  
  
  update(cond){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
 
  }
  show()
  {
   noStroke();
    
   
    fill(0);
    ellipse(this.pos.x,this.pos.y,this.w);
  }
}
 
  
