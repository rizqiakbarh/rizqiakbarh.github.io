/*
==========================================================
RIZQI AKBAR HERNAWAN PORTFOLIO
PARTICLES ENGINE V2
PART 1A
==========================================================
*/

(() => {

"use strict";

/*=========================================
DEVICE DETECTION
=========================================*/

const isTouch =
window.matchMedia("(pointer:coarse)").matches;

const prefersReduced =
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches;

/*=========================================
CANVAS
=========================================*/

const canvas =
document.createElement("canvas");

canvas.id = "particles";

document.body.prepend(canvas);

const ctx =
canvas.getContext("2d",{

alpha:true

});

/*=========================================
STYLE
=========================================*/

Object.assign(canvas.style,{

position:"fixed",

top:"0",

left:"0",

width:"100%",

height:"100%",

pointerEvents:"none",

zIndex:"-5"

});

/*=========================================
SIZE
=========================================*/

let width =
window.innerWidth;

let height =
window.innerHeight;

let dpr =
Math.min(

window.devicePixelRatio,

2

);

function resize(){

width =
window.innerWidth;

height =
window.innerHeight;

dpr =
Math.min(

window.devicePixelRatio,

2

);

canvas.width =
width*dpr;

canvas.height =
height*dpr;

ctx.setTransform(

dpr,

0,

0,

dpr,

0,

0

);

}

resize();

/*=========================================
MOUSE
=========================================*/

const mouse={

x:width/2,

y:height/2,

radius:

isTouch ? 80 : 170,

active:false

};

window.addEventListener(

"mousemove",

e=>{

mouse.x=e.clientX;

mouse.y=e.clientY;

mouse.active=true;

}

);

window.addEventListener(

"mouseleave",

()=>{

mouse.active=false;

}

);

/*=========================================
CONFIG
=========================================*/

const CONFIG={

desktop:110,

tablet:70,

mobile:35,

maxDistance:130,

speed:.35,

glow:16

};

function getParticleCount(){

if(prefersReduced)

return 0;

if(width>=1200)

return CONFIG.desktop;

if(width>=768)

return CONFIG.tablet;

return CONFIG.mobile;

}

/*=========================================
PARTICLE
=========================================*/

class Particle{

constructor(){

this.reset();

}

reset(){

this.x=

Math.random()*width;

this.y=

Math.random()*height;

this.vx=

(Math.random()-.5)

*CONFIG.speed;

this.vy=

(Math.random()-.5)

*CONFIG.speed;

this.size=

Math.random()*2+1;

this.alpha=

Math.random()*.5+.25;

const colors=[

"#4f8cff",

"#857dff",

"#42d8ff"

];

this.color=

colors[

Math.floor(

Math.random()

*colors.length

)

];

}

update(){

this.x+=this.vx;

this.y+=this.vy;

if(this.x<0)

this.x=width;

if(this.x>width)

this.x=0;

if(this.y<0)

this.y=height;

if(this.y>height)

this.y=0;

if(mouse.active){

const dx=

mouse.x-this.x;

const dy=

mouse.y-this.y;

const dist=

Math.hypot(

dx,

dy

);

if(

dist<mouse.radius

){

const force=

(mouse.radius-dist)

/mouse.radius;

this.x-=

dx*

force*

0.015;

this.y-=

dy*

force*

0.015;

}

}

}

draw(){

ctx.beginPath();

ctx.arc(

this.x,

this.y,

this.size,

0,

Math.PI*2

);

ctx.fillStyle=

this.color;

ctx.globalAlpha=

this.alpha;

ctx.shadowBlur=

CONFIG.glow;

ctx.shadowColor=

this.color;

ctx.fill();

ctx.shadowBlur=0;

ctx.globalAlpha=1;

}

}

/*=========================================
PARTICLES
=========================================*/

let particles=[];

function createParticles(){

particles=[];

const total=

getParticleCount();

for(

let i=0;

i<total;

i++

){

particles.push(

new Particle()

);

}

}

createParticles();

window.addEventListener(

"resize",

()=>{

resize();

createParticles();

}

);
/*=========================================
AURORA
=========================================*/

let auroraPhase = 0;

function drawAurora() {

    auroraPhase += 0.002;

    const gradient = ctx.createLinearGradient(
        0,
        0,
        width,
        height
    );

    gradient.addColorStop(
        0,
        "rgba(79,140,255,.05)"
    );

    gradient.addColorStop(
        .5,
        "rgba(133,125,255,.04)"
    );

    gradient.addColorStop(
        1,
        "rgba(66,216,255,.05)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

}

/*=========================================
CONNECTION LINE
=========================================*/

function connectParticles() {

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const dist =
                Math.hypot(dx, dy);

            if (dist > CONFIG.maxDistance)
                continue;

            const opacity =
                1 - (dist / CONFIG.maxDistance);

            ctx.beginPath();

            ctx.moveTo(
                particles[i].x,
                particles[i].y
            );

            ctx.lineTo(
                particles[j].x,
                particles[j].y
            );

            ctx.strokeStyle =
                `rgba(79,140,255,${opacity*.15})`;

            ctx.lineWidth = 1;

            ctx.stroke();

        }

    }

}

/*=========================================
MOUSE GLOW
=========================================*/

function drawMouseGlow() {

    if (!mouse.active || isTouch)
        return;

    const glow =
        ctx.createRadialGradient(

            mouse.x,

            mouse.y,

            0,

            mouse.x,

            mouse.y,

            180

        );

    glow.addColorStop(
        0,
        "rgba(79,140,255,.18)"
    );

    glow.addColorStop(
        .5,
        "rgba(79,140,255,.06)"
    );

    glow.addColorStop(
        1,
        "transparent"
    );

    ctx.fillStyle = glow;

    ctx.beginPath();

    ctx.arc(

        mouse.x,

        mouse.y,

        180,

        0,

        Math.PI * 2

    );

    ctx.fill();

}

/*=========================================
BACKGROUND PULSE
=========================================*/

let pulse = 0;

function updatePulse() {

    pulse += 0.03;

    particles.forEach(p => {

        p.alpha =

            .28 +

            Math.sin(

                pulse +

                p.x * .015

            ) * .12;

    });

}

/*=========================================
FPS LIMITER
=========================================*/

let lastFrame = 0;

const FPS = 60;

const frameTime =
1000 / FPS;

/*=========================================
UPDATE
=========================================*/

function updateParticles() {

    for (const p of particles) {

        p.update();

    }

}

/*=========================================
DRAW
=========================================*/

function drawParticles() {

    for (const p of particles) {

        p.draw();

    }

}
/*=========================================
ANIMATION LOOP
=========================================*/

let animationId = null;

let lastTime = 0;

function animate(time = 0){

    const delta =

        time - lastTime;

    if(delta < frameTime){

        animationId =

            requestAnimationFrame(

                animate

            );

        return;

    }

    lastTime =

        time;

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

    drawAurora();

    drawMouseGlow();

    updatePulse();

    updateParticles();

    connectParticles();

    drawParticles();

    animationId =

        requestAnimationFrame(

            animate

        );

}

/*=========================================
START
=========================================*/

if(!prefersReduced){

    animationId =

        requestAnimationFrame(

            animate

        );

}

/*=========================================
PAGE VISIBILITY
=========================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            if(animationId){

                cancelAnimationFrame(

                    animationId

                );

            }

        }

        else{

            lastTime = 0;

            animationId =

                requestAnimationFrame(

                    animate

                );

        }

    }

);

/*=========================================
CLICK BURST
=========================================*/

if(!isTouch){

window.addEventListener(

"click",

e=>{

for(

let i=0;

i<8;

i++

){

const p=

new Particle();

p.x=

e.clientX;

p.y=

e.clientY;

p.vx=

(Math.random()-.5)*2;

p.vy=

(Math.random()-.5)*2;

particles.push(p);

}

if(

particles.length>

CONFIG.desktop+20

){

particles.splice(

0,

particles.length-

(CONFIG.desktop+20)

);

}

}

);

}

/*=========================================
AUTO PERFORMANCE
=========================================*/

let lowPerformance = false;

let frameCounter = 0;

let lastCheck = performance.now();

function monitorPerformance(){

    frameCounter++;

    const now = performance.now();

    if(now-lastCheck>1000){

        if(frameCounter<45 && !lowPerformance){

            lowPerformance=true;

            CONFIG.maxDistance=90;

        }

        else if(frameCounter>=55){

            lowPerformance=false;

            CONFIG.maxDistance=130;

        }

        frameCounter=0;

        lastCheck=now;

    }

}

setInterval(

monitorPerformance,

1000

);

/*=========================================
WINDOW BLUR
=========================================*/

window.addEventListener(

"blur",

()=>{

if(animationId){

cancelAnimationFrame(

animationId

);

}

}

);

window.addEventListener(

"focus",

()=>{

lastTime=0;

animationId=

requestAnimationFrame(

animate

);

}

);
/*=========================================
IDLE FLOAT
=========================================*/

let idleTime = 0;

function idleAnimation(){

    if(mouse.active) return;

    idleTime += 0.003;

    particles.forEach((p,index)=>{

        p.x += Math.sin(idleTime + index)*0.08;

        p.y += Math.cos(idleTime + index)*0.08;

    });

}

/*=========================================
DYNAMIC AURORA
=========================================*/

let hue = 220;

function auroraShift(){

    hue += .03;

    if(hue > 360){

        hue = 220;

    }

}

/*=========================================
MOUSE REPULSION
=========================================*/

function repelParticles(){

    if(!mouse.active) return;

    particles.forEach(p=>{

        const dx = p.x - mouse.x;

        const dy = p.y - mouse.y;

        const distance = Math.hypot(dx,dy);

        if(distance < mouse.radius){

            const angle = Math.atan2(dy,dx);

            const force =

                (mouse.radius-distance)

                /mouse.radius;

            p.x +=

                Math.cos(angle)

                *force*1.3;

            p.y +=

                Math.sin(angle)

                *force*1.3;

        }

    });

}

/*=========================================
AUTO CLEAN
=========================================*/

function cleanParticles(){

    const limit = getParticleCount()+20;

    if(

        particles.length >

        limit

    ){

        particles.splice(

            limit

        );

    }

}

/*=========================================
UPDATE ENGINE
=========================================*/

const oldAnimate = animate;

animate = function(time=0){

    const delta =

        time-lastTime;

    if(delta<frameTime){

        animationId=

        requestAnimationFrame(

            animate

        );

        return;

    }

    lastTime=time;

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

    drawAurora();

    auroraShift();

    drawMouseGlow();

    updatePulse();

    idleAnimation();

    repelParticles();

    updateParticles();

    connectParticles();

    drawParticles();

    cleanParticles();

    animationId=

    requestAnimationFrame(

        animate

    );

};

/*=========================================
REDUCED MOTION
=========================================*/

if(prefersReduced){

    particles=[];

}

/*=========================================
MEMORY OPTIMIZATION
=========================================*/

window.addEventListener(

    "beforeunload",

    ()=>{

        if(animationId){

            cancelAnimationFrame(

                animationId

            );

        }

        particles.length = 0;

    }

);

/*=========================================
DEBUG
=========================================*/

const DEBUG=false;

if(DEBUG){

    setInterval(()=>{

        console.log({

            particles:particles.length,

            fpsLimit:FPS,

            touch:isTouch,

            reducedMotion:prefersReduced

        });

    },3000);

}

/*=========================================
READY
=========================================*/

console.log(

"%cParticles Engine V2 Loaded",

"color:#4f8cff;font-size:16px;font-weight:bold"

);

console.log(

"%cCanvas Background Active",

"color:#42d8ff;font-size:13px"

);

})();