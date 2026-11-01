const transbox1 = document.getElementById("transbox1");
const interactionLayer1 = document.getElementById("interactionLayer1");
const staticImg1 = document.getElementById("staticImg1");
const gif1 = document.getElementById("gif1");
const prevBtn = document.getElementById("prevBtn");
const nextToStep2 = document.getElementById("nextToStep2");

let step1Timeout = null;
let slide1Blob = null;


// Hide Next button initially
if (nextToStep2) {
    nextToStep2.style.visibility = "hidden";
}

// Fetch the GIF as a blob to prevent any reload/cache/flicker issues
fetch("../assets/gifs/Step a.gif")
    .then(r => r.blob())
    .then(b => {
        slide1Blob = b;
    })
    .catch(err => {
        console.warn("Could not pre-fetch GIF blob, falling back to direct URL reference.", err);
    });

transbox1.addEventListener("click", () => {
    interactionLayer1.style.display = "none";
    gif1.style.display = "block";
    gif1.style.opacity = "1";

    gif1.onload = () => {
        gif1.onload = null;
        staticImg1.style.display = "none";

        // Step a.gif duration is 4960ms
        step1Timeout = setTimeout(() => {
            gif1.style.display = "none";
            staticImg1.src = "../assets/gifs/step1_last.png";
            staticImg1.style.display = "block";
            if (nextToStep2) {
                nextToStep2.style.visibility = "visible";
            }
        }, 4960);
    };

    if (slide1Blob) {
        gif1.src = URL.createObjectURL(slide1Blob);
    } else {
        gif1.src = "../assets/gifs/Step a.gif?" + new Date().getTime();
    }
});

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step_gama.html";
    });
}

if (nextToStep2) {
    nextToStep2.addEventListener("click", () => {
        // Redirect to Step 2 when clicked
        window.location.href = "step2.html";
    });
}
