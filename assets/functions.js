// null cases covered

if (localStorage.getItem("fP") === null) {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);
}

var keys = ["checked", "lineWidth", "Save", "Restore", "lineColor", "fillColor"];
var values = ["false", "0", "false", "false", "#000000", "#000000"]

for (let i = 0; i < keys.length; i++) {
    if (localStorage.getItem(keys[i]) === null) {
        localStorage.setItem(keys[i], values[i]);
    }
}

// functions for the canvas

const mainFunction = (htmlText) => {
    var functionName = "";

    // saves all properties for the restore to use
    if (htmlText === "Save Drawing") {
        localStorage.setItem("Save", "true");
        localStorage.setItem("savefP", localStorage.getItem("fP"));
        localStorage.setItem("saveFill", localStorage.getItem("checked"));
        localStorage.setItem("saveLine", localStorage.getItem("lineWidth"));
        localStorage.setItem("saveLineColor", localStorage.getItem("lineColor"));
        localStorage.setItem("saveFillColor", localStorage.getItem("fillColor"));

        if (localStorage.getItem("savefP") === "1") {
            localStorage.setItem("saveName", "Box");
        }
        else if (localStorage.getItem("savefP") === "2") {
            localStorage.setItem("saveName", "Spiral");
        }
        else if (localStorage.getItem("savefP") === "3") {
            localStorage.setItem("saveName", "Star");
        }
    }

    if (htmlText === "Load Drawing") {
        localStorage.setItem("Restore", "true");
        returnFunction();
    }

    if (htmlText === "Box") {
        functionPicker = "1";
        functionName = "Box";
        localStorage.setItem("Box", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
    }

    if (htmlText === "Spiral") {
        functionPicker = "2";
        functionName = "Spiral";
        localStorage.setItem("Spiral", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Spiral")}`;
    }

    if (htmlText === "Star") {
        functionPicker = "3";
        functionName = "Star";
        localStorage.setItem("Star", functionName)
        localStorage.setItem("fP", functionPicker);
        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
    }
}

const returnFunction = () => {

    // when user calls restore of old drawing
    if (localStorage.getItem("Restore") === "true") {
    
        if (localStorage.getItem("savefP") === "1") {
            box();
        }
    
        if (localStorage.getItem("savefP") === "2") {
            spiral();
        }
    
        if (localStorage.getItem("savefP") === "3") {
            star();
        }

        let output = document.getElementById("current-selection");
        output.innerHTML = `Current Selection - ${localStorage.getItem("saveName")}`;
    
        if (localStorage.getItem("saveFill") === "true") {
            document.getElementById("myCheck").checked = true;
        }

        var keepLineText = localStorage.getItem("saveLine");

        var linecolor = localStorage.getItem("saveLineColor");

        var fillcolor = localStorage.getItem("saveFillColor");
    }
    else {  // when user does not wanna restore

        if (localStorage.getItem("fP") === "0") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - none`;
            initial();
        }
    
        if (localStorage.getItem("fP") === "1") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Box")}`;
            box();
        }
    
        if (localStorage.getItem("fP") === "2") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Spiral")}`;
            spiral();
        }
    
        if (localStorage.getItem("fP") === "3") {
            let output = document.getElementById("current-selection");
            output.innerHTML = `Current Selection - ${localStorage.getItem("Star")}`;
            star();
        }
    
        if (localStorage.getItem("checked") === "true") {
            document.getElementById("myCheck").checked = true;
        }
    
        var keepLineText = localStorage.getItem("lineWidth");

        var linecolor = localStorage.getItem("lineColor");

        var fillcolor = localStorage.getItem("fillColor");
    }
    
    // setting line color
    let cline = document.getElementById("actual-l-color");
    let lineColorPicker = document.getElementById("myColor");
    cline.innerHTML = linecolor;
    lineColorPicker.value = linecolor;

    // setting fill color
    let cfill = document.getElementById("actual-f-color");
    let fillColorPicker = document.getElementById("myFillColor");
    cfill.innerHTML = fillcolor;
    fillColorPicker.value = fillcolor;

    // slider inputs
    let slider = document.getElementById("myRange");
    let output = document.getElementById("line-w");
    output.innerHTML = keepLineText;
    slider.value = keepLineText;

    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
    }
}

// drawing functions

const initial = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = localStorage.getItem("lineWidth");
        
        // Non Filled Box
        ctx.beginPath();
        ctx.moveTo(225, 225);
        ctx.lineTo(305, 225);
        ctx.lineTo(305, 305);
        ctx.lineTo(225, 305)
        ctx.closePath();
        ctx.stroke();
    }
}

// Box Drawing
const box = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor"); // (line color)
        }

        ctx.beginPath();
        ctx.moveTo((canvas.width / 2) - 45, (canvas.height / 2) - 45);
        ctx.lineTo((canvas.width / 2) + 75, (canvas.height / 2) - 45);
        ctx.lineTo((canvas.width / 2) + 75, (canvas.height / 2) + 75);
        ctx.lineTo((canvas.width / 2) - 45, (canvas.height / 2) + 75);
        ctx.closePath();

        if (localStorage.getItem("Restore") === "true") {
            if (localStorage.getItem("saveFill") === "true") {
                // Filled Box if checked
                ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
                ctx.fill();
            }
            ctx.stroke();
        }
        else {
            if (localStorage.getItem("checked") === "true") {
                // Filled Box if checked
                ctx.fillStyle = localStorage.getItem("fillColor");
                ctx.fill();
            }
            ctx.stroke();
        }
    }
}

// Spiral Drawing
const spiral = () => {
    const canvas = document.getElementById('canv');
    var radius = 0;
    var angle = 0;

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor"); // (line color)
        }

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);

        for (var n = 0; n < 200; n++) {
            radius += 0.75;
            // make a complete circle every 50 iterations
            angle += (Math.PI * 2) / 50;
            var x = canvas.width / 2 + radius * Math.cos(angle);
            var y = canvas.height / 2 + radius * Math.sin(angle);
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }
}

// Star Drawing
const star = () => {
    const canvas = document.getElementById('canv');

    if (canv.getContext) {
        const ctx = canvas.getContext('2d');

        if (localStorage.getItem("Restore") === "true") {
            ctx.lineWidth = localStorage.getItem("saveLine");
            ctx.strokeStyle = localStorage.getItem("saveLineColor"); // (line color)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        else {
            ctx.lineWidth = localStorage.getItem("lineWidth");
            ctx.strokeStyle = localStorage.getItem("lineColor");
        }

        ctx.beginPath();
        ctx.moveTo((canvas.width / 2) - 15, (canvas.height / 2) - 60);
        ctx.lineTo((canvas.width / 2) + 45, (canvas.height / 2) + 70);
        ctx.lineTo((canvas.width / 2) - 100, (canvas.height / 2) - 5);
        ctx.lineTo((canvas.width / 2) + 70, (canvas.height / 2) - 5);
        ctx.lineTo((canvas.width / 2) - 70, (canvas.height / 2) + 70);
        ctx.closePath();

        if (localStorage.getItem("Restore") === "true") {
            if (localStorage.getItem("saveFill") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("saveFillColor"); // (fill color)
                ctx.fill();
            }
            ctx.stroke();
        }
        else {
            if (localStorage.getItem("checked") === "true") {
                // Filled Star if checked
                ctx.fillStyle = localStorage.getItem("fillColor");
                ctx.fill();
            }
            ctx.stroke();
        }
    }
}

module.exports = { returnFunction, mainFunction };