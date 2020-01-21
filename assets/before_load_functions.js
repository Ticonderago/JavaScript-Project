// if the user refreshes the page using buttons or refresh icon on browser
window.onbeforeunload = function() {
    localStorage.setItem("refresh", "true");
}

// null cases covered, first time visiting the website

if (localStorage.getItem("firstTime") === "true") {
    var functionPicker = "0";
    localStorage.setItem("fP", functionPicker);

    var keys = [
        "checked", "lineWidth", "Save", "Restore", "CurrD",
        "lineColor", "fillColor", "downBool", "opacity",
        "D1Bol", "D2Bol", "D3Bol", "CurrD", "canvClearBol",
        "D1DrawFunction", "D2DrawFunction", "D3DrawFunction",
        "fP", "refresh", "DNChecked", "DNLWidth", "DNLColor", "DNFillColor",
        "D1fP", "D2fP", "D3fP", "D1Checked", "D2Checked", "D3Checked",
        "D1FillColor", "D2FillColor", "D3FillColor", "D1LWidth", "D2LWidth",
        "D3LWidth", "D1LColor", "D2LColor", "D3LColor"
    ];
    var values = [
        "false", "0", "false", "false", "D1",
        "#000000", "#000000", "false", "false",
        "true", "false", "false", "D1", "true",
        "Box", "Pentagon", "Star", "1", "false",
        "false", "1", "#000000", "#000000",
        "1", "2", "3", "false", "false", "false",
        "#000000", "#000000", "#000000", "0", "0", "0",
        "#000000", "#000000", "#000000"
    ];

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i]) === null) {
            localStorage.setItem(keys[i], values[i]);
        }
    }
    
    localStorage.setItem("D1Bol", "true");

    resetAttr(localStorage.getItem("CurrD"));

    let name = "Drawing #1";
    localStorage.setItem("D1", name)
    let output = document.getElementById("current-drawing");
    output.innerHTML = `${localStorage.getItem("D1")} Selected`;

    localStorage.setItem("firstTime", "false");
}

// functions for the canvas

// getting mouse cursor positions

const getCursorPositionDown = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("DD1X", x);
        localStorage.setItem("DD1Y", y);
    }

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DD2X", x);
        localStorage.setItem("DD2Y", y);
    }

    else if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("DD3X", x);
        localStorage.setItem("DD3Y", y);
    }
}

const getCursorPositionUp = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    if (localStorage.getItem("CurrD") === "D1") {
        localStorage.setItem("DU1X", x);
        localStorage.setItem("DU1Y", y);
    }

    else if (localStorage.getItem("CurrD") === "D2") {
        localStorage.setItem("DU2X", x);
        localStorage.setItem("DU2Y", y);
    }

    else if (localStorage.getItem("CurrD") === "D3") {
        localStorage.setItem("DU3X", x);
        localStorage.setItem("DU3Y", y);
    }

    returnFunction();
}

// when a button is clicked this occurs
const mainFunction = (htmlText) => {
    var functionName = "";
    var currD = localStorage.getItem("CurrD");

    var draw1 = document.getElementById("drawing-1");
    var draw2 = document.getElementById("drawing-2");
    var draw3 = document.getElementById("drawing-3");
    // checking if the id has been changed of the button
    if (draw1 === null) {
        draw1 = document.getElementById("dis-d1");
    }
    else if (draw2 === null) {
        draw2 = document.getElementById("dis-d2");
    }
    else if (draw3 === null) {
        draw3 = document.getElementById("dis-d3");
    }

    // saves all properties for the restore to use
    if (htmlText === "Save Artwork") {

        var newSaveKeys = [
            "SD1X", "SD1Y", "SD2X", "SD2Y", "SD3X", "SD3Y", "SU1X", "SU1Y", "SU2X", "SU2Y", "SU3X", "SU3Y",
            "SD1Checked", "SD2Checked", "SD3Checked", "SD1FillColor", "SD2FillColor", "SD3FillColor",
            "SD1LColor", "SD2LColor", "SD3LColor", "SD1LWidth", "SD2LWidth", "SD3LWidth", "SD1Bol", "SD2Bol", "SD3Bol",
            "SD1DrawFunction", "SD2DrawFunction", "SD3DrawFunction", "SD1fP", "SD2fP", "SD3fP"
        ];

        var savedValues = [
            localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"), localStorage.getItem("DD2X"),
            localStorage.getItem("DD2Y"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), localStorage.getItem("DU2X"),
            localStorage.getItem("DU2Y"), localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"),
            localStorage.getItem("D1Checked"), localStorage.getItem("D2Checked"), localStorage.getItem("D3Checked"),
            localStorage.getItem("D1FillColor"), localStorage.getItem("D2FillColor"), localStorage.getItem("D3FillColor"),
            localStorage.getItem("D1LColor"), localStorage.getItem("D2LColor"), localStorage.getItem("D3LColor"),
            localStorage.getItem("D1LWidth"), localStorage.getItem("D2LWidth"), localStorage.getItem("D3LWidth"),
            localStorage.getItem("D1Bol"), localStorage.getItem("D2Bol"), localStorage.getItem("D3Bol"),
            localStorage.getItem("D1DrawFunction"), localStorage.getItem("D2DrawFunction"), localStorage.getItem("D3DrawFunction"),
            localStorage.getItem("D1fP"), localStorage.getItem("D2fP"), localStorage.getItem("D3fP")
        ];

        for (let i = 0; i < newSaveKeys.length; i++) {
            localStorage.setItem(newSaveKeys[i], savedValues[i]);
        }

        document.getElementById("has-loaded").innerHTML = "";
        document.getElementById("has-saved").innerHTML = "Saved!";
    }
    
    // if load drawing is clicked
    else if (htmlText === "Load Artwork") {
        // replace all D keys with the SD keys

        localStorage.setItem("DD1X", localStorage.getItem("SD1X"));
        localStorage.setItem("DD1Y", localStorage.getItem("SD1Y"));
        localStorage.setItem("DD2X", localStorage.getItem("SD2X"));
        localStorage.setItem("DD2Y", localStorage.getItem("SD2Y"));
        localStorage.setItem("DD3X", localStorage.getItem("SD3X"));
        localStorage.setItem("DD3Y", localStorage.getItem("SD3Y"));
        localStorage.setItem("DU1X", localStorage.getItem("SU1X"));
        localStorage.setItem("DU1Y", localStorage.getItem("SU1Y"));
        localStorage.setItem("DU2X", localStorage.getItem("SU2X"));
        localStorage.setItem("DU2Y", localStorage.getItem("SU2Y"));
        localStorage.setItem("DU3X", localStorage.getItem("SU3X"));
        localStorage.setItem("DU3Y", localStorage.getItem("SU3Y"));
        localStorage.setItem("D1Checked", localStorage.getItem("SD1Checked"));
        localStorage.setItem("D2Checked", localStorage.getItem("SD2Checked"));
        localStorage.setItem("D3Checked", localStorage.getItem("SD3Checked"));
        localStorage.setItem("D1FillColor", localStorage.getItem("SD1FillColor"));
        localStorage.setItem("D2FillColor", localStorage.getItem("SD2FillColor"));
        localStorage.setItem("D3FillColor", localStorage.getItem("SD3FillColor"));
        localStorage.setItem("D1LColor", localStorage.getItem("SD1LColor"));
        localStorage.setItem("D2LColor", localStorage.getItem("SD2LColor"));
        localStorage.setItem("D3LColor", localStorage.getItem("SD3LColor"));
        localStorage.setItem("D1LWidth", localStorage.getItem("SD1LWidth"));
        localStorage.setItem("D2LWidth", localStorage.getItem("SD2LWidth"));
        localStorage.setItem("D3LWidth", localStorage.getItem("SD3LWidth"));
        localStorage.setItem("D1Bol", localStorage.getItem("SD1Bol"));
        localStorage.setItem("D2Bol", localStorage.getItem("SD2Bol"));
        localStorage.setItem("D3Bol", localStorage.getItem("SD3Bol"));
        localStorage.setItem("D1DrawFunction", localStorage.getItem("SD1DrawFunction"));
        localStorage.setItem("D2DrawFunction", localStorage.getItem("SD2DrawFunction"));
        localStorage.setItem("D3DrawFunction", localStorage.getItem("SD3DrawFunction"));
        localStorage.setItem("D1fP", localStorage.getItem("SD1fP"));
        localStorage.setItem("D2fP", localStorage.getItem("SD2fP"));
        localStorage.setItem("D3fP", localStorage.getItem("SD3fP"));

        let button1 = document.getElementById("drawing-1");
        let button2 = document.getElementById("drawing-2");
        let button3 = document.getElementById("drawing-3");
        // checking if the id has been changed of the button
        if (button1 === null) {
            button1 = document.getElementById("dis-d1");
        }
        else if (button2 === null) {
            button2 = document.getElementById("dis-d2");
        }
        else if (button3 === null) {
            button3 = document.getElementById("dis-d3");
        }

        button2.id = "drawing-2";
        button2.disabled = false;
        button3.id = "drawing-3";
        button3.disabled = false;

        if (localStorage.getItem("D1Bol") === "true") {
            localStorage.setItem("CurrD", "D1");
            button1.id = "dis-d1";
            button1.disabled = true;
        }
        else if (localStorage.getItem("D2Bol") === "true") {
            localStorage.setItem("CurrD", "D2");
            button2.id = "dis-d2";
            button2.disabled = true;
        }
        else if (localStorage.getItem("D3Bol") === "true") {
            localStorage.setItem("CurrD", "D3");
            button3.id = "dis-d3";
            button3.disabled = true;
        }

        resetAttr(localStorage.getItem("CurrD"));

        document.getElementById("has-saved").innerHTML = "";
        document.getElementById("has-loaded").innerHTML = "Loaded!";

        localStorage.setItem("Restore", "true");
        returnFunction();
    }

    // when the user wants to clear a drawing currently selected (erase it)
    else if (htmlText === "Clear") {
        clearButtonHelper(localStorage.getItem("CurrD"));
        location.reload();
    }

    // selecting box to draw
    else if (htmlText === "Box") {
        functionName = "Box";
        localStorage.setItem("Box", functionName);
        let output = document.getElementById("current-selection");
        output.innerHTML = "Current Selection - Box";
        resetDrawSelection("Box", currD);
    }

    // selecting spiral to draw
    else if (htmlText === "Pentagon") {
        functionName = "Pentagon";
        localStorage.setItem("Pentagon", functionName);
        let output = document.getElementById("current-selection");
        output.innerHTML = "Current Selection - Pentagon";
        resetDrawSelection("Pentagon", currD);
    }

    // selecting star to draw
    else if (htmlText === "Star") {
        functionName = "Star";
        localStorage.setItem("Star", functionName);
        let output = document.getElementById("current-selection");
        output.innerHTML = "Current Selection - Star";
        resetDrawSelection("Star", currD);
    }

    // selecting drawing #1
    else if (htmlText === "Drawing #1") {
        localStorage.setItem("CurrD", "D1");
        draw1.id = "dis-d1";
        draw1.disabled = true;
        localStorage.setItem("D1Bol", "true");  /////// THIS MIGHT NEED TO BE REFACTORED!

        // change the id of drawing button back when a different button is clicked
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #1";
        localStorage.setItem("D1", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D1")} Selected`;
    }

    // selecting drawing #2
    else if (htmlText === "Drawing #2") {
        localStorage.setItem("CurrD", "D2");
        draw2.id = "dis-d2";
        draw2.disabled = true;
        localStorage.setItem("D2Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw3.id === "dis-d3") {
            draw3.id = "drawing-3";
            draw3.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #2";
        localStorage.setItem("D2", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D2")} Selected`;
    }

    // selecting drawing #3
    else if (htmlText === "Drawing #3") {
        localStorage.setItem("CurrD", "D3");
        draw3.id = "dis-d3";
        draw3.disabled = true;
        localStorage.setItem("D3Bol", "true");

        // change the id of drawing button back when a different button is clicked
        if (draw1.id === "dis-d1") {
            draw1.id = "drawing-1";
            draw1.disabled = false;
        }
        if (draw2.id === "dis-d2") {
            draw2.id = "drawing-2";
            draw2.disabled = false;
        }

        // when a new drawing is selected I want to keep the old attributes of the drawing
        resetAttr(localStorage.getItem("CurrD"));

        functionName = "Drawing #3";
        localStorage.setItem("D3", functionName)
        let output = document.getElementById("current-drawing");
        output.innerHTML = `${localStorage.getItem("D3")} Selected`;
    }
}

// when the page is reloaded runs this function
const returnFunction = () => {
    // checking which drawing is the current one saving to variable
    var CurrDraw = localStorage.getItem("CurrD");

    // when user calls to load the old drawing
    selectedDrawing();
    let outSelection = document.getElementById("current-selection");

    if (localStorage.getItem(`${CurrDraw}fP`) === "1") {
        outSelection.innerHTML = "Current Selection - Box";
    }

    else if (localStorage.getItem(`${CurrDraw}fP`) === "2") {
        outSelection.innerHTML = "Current Selection - Pentagon";
    }

    else if (localStorage.getItem(`${CurrDraw}fP`) === "3") {
        outSelection.innerHTML = "Current Selection - Star";
    }

    // now to set all shape details for specific current drawing selected

    updateDrawInfo(CurrDraw);

    if (localStorage.getItem(`${CurrDraw}Checked`) === "true") {
        document.getElementById("myCheck").checked = true;
    }
    else {
        document.getElementById("myCheck").checked = false;
    }

    var keepLineText = localStorage.getItem(`${CurrDraw}LWidth`);
    var linecolor = localStorage.getItem(`${CurrDraw}LColor`);
    var fillcolor = localStorage.getItem(`${CurrDraw}FillColor`);

    if (CurrDraw === "DN") {
        keepLineText = localStorage.getItem("DNLWidth");
        linecolor = localStorage.getItem("DNLColor");
        fillcolor = localStorage.getItem("DNFillColor");
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

    // reseting text for save and load function
    document.getElementById("has-saved").innerHTML = "";

    // time to draw for specific slot or to draw an entire artwork
    // that has been saved

    localStorage.setItem("drawNum", "D1");

    if (localStorage.getItem("D1Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D1DrawFunction"), localStorage.getItem("DD1X"), localStorage.getItem("DD1Y"),
            localStorage.getItem("DU1X"), localStorage.getItem("DU1Y"), 
            localStorage.getItem("D1LWidth"), localStorage.getItem("D1LColor")
        );
    }

    localStorage.setItem("drawNum", "D2");

    if (localStorage.getItem("D2Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D2DrawFunction"), localStorage.getItem("DD2X"), localStorage.getItem("DD2Y"),
            localStorage.getItem("DU2X"), localStorage.getItem("DU2Y"), 
            localStorage.getItem("D2LWidth"), localStorage.getItem("D2LColor")
        );
    }

    localStorage.setItem("drawNum", "D3");

    if (localStorage.getItem("D3Bol") === "true") {
        callingDrawF(
            localStorage.getItem("D3DrawFunction"), localStorage.getItem("DD3X"), localStorage.getItem("DD3Y"),
            localStorage.getItem("DU3X"), localStorage.getItem("DU3Y"), 
            localStorage.getItem("D3LWidth"), localStorage.getItem("D3LColor")
        );
    }

    if (localStorage.getItem("Restore") === "true") {
        localStorage.setItem("Restore", "false");
    }

    localStorage.setItem("canvClearBol", "true");
    localStorage.setItem("secondTime", "true");
}