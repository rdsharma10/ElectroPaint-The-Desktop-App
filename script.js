const canvas = document.querySelector("canvas"),
      toolBtns = document.querySelectorAll(".tool"),
      fillColor = document.querySelector("#fill"),
      sizeSlide = document.querySelector("#slide"),
      colorsBtn = document.querySelectorAll(".colors .option"),
      colorPicker = document.querySelector("#color-picker"),
      clearCanvas = document.querySelector(".clear-canvas"),
      saveJpeg = document.querySelector(".save-img"),
      savePng = document.querySelector(".save-png"),
      input = document.getElementById('customInput');

let isDrawing = false,
    brushWidth = 2,
    selectedTool = "brush",
    selectedColor = "#000",
    isInputActive = false,
    prevMouseX, prevMouseY, snapshot;

const ctx = canvas.getContext("2d");

const initializeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setBackground();
};


const setBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;  
};


const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    ctx.lineWidth = brushWidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawRect = (e) => {
    ctx.putImageData(snapshot, 0, 0);
    const width = e.offsetX - prevMouseX;
    const height = e.offsetY - prevMouseY;
    if (!fillColor.checked) {
        ctx.strokeRect(prevMouseX, prevMouseY, width, height);
    } else {
        ctx.fillRect(prevMouseX, prevMouseY, width, height);
    }
};

const drawCircle = (e) => {
    ctx.putImageData(snapshot, 0, 0);
    const radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.beginPath();
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => {
    ctx.putImageData(snapshot, 0, 0);
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawing = (e) => {
    if (!isDrawing) return;
    if (selectedTool === "brush" || selectedTool === "eraser") {
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
};

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlide.addEventListener("change", () => brushWidth = sizeSlide.value);

colorsBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    selectedColor = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBackground();
});

savePng.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});

saveJpeg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
});

canvas.addEventListener('dblclick', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (!isInputActive) {
        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
        input.style.display = 'block';
        input.focus();
        isInputActive = true;
    } else {
        input.style.display = 'none';
        isInputActive = false;
        drawText(input.value, x, y);
        input.value = '';
    }
});

// Draw text on canvas
const drawText = (text, x, y) => {
    ctx.font = '30px Arial';
    ctx.font.charAt(input);
    ctx.fillText(text, x, y);
};

// Initialize canvas on window load
window.addEventListener("load", initializeCanvas);

// Drawing events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);



