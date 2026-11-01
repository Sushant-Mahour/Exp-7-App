const prevBtn = document.getElementById("prevBtn");
const nextToStep12 = document.getElementById("nextToStep12");

// Enable Back button behavior
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        window.location.href = "step10.html";
    });
}

// Enable Next button behavior
if (nextToStep12) {
    nextToStep12.style.visibility = "visible"; // Just in case
    nextToStep12.addEventListener("click", () => {
        window.location.href = "step12.html";
    });
}
