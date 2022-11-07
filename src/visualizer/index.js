import { Application, Graphics } from "pixi.js";

const slider = document.getElementById("slider")
slider.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(e.target.value);
});

const submit = document.getElementById("slider-input")
submit.addEventListener('change', (e) => {
    e.preventDefault();
    const maximum = document.getElementById("maximum");
    const minimum = document.getElementById("minimum");

    const slider_min = document.getElementById("slider-min");
    const slider_max = document.getElementById("slider-max");

    const slider_bar = document.getElementById("slider-bar");
    let min = slider_bar.getAttribute("min");
    let max = slider_bar.getAttribute("max");

    if (maximum.value !== "") {
        max = maximum.value;
    }

    if (minimum.value !== "") {
        min = minimum.value;
    }

    if (parseInt(max) - parseInt(min) <= 0) {
        alert("Invalid range!")
    } else {
        slider_bar.setAttribute("min", min);
        slider_bar.setAttribute("max", max);

        slider_min.innerText = min;
        slider_max.innerText = max;
    }
});


let app;
app = new Application(
    {
        width: 1300,
        height: 650
    }
);

let obj = new Graphics();
app.stage.addChild(obj);

obj.position.set(10, 10);
obj.lineStyle(1, 0xff0000).moveTo(30,30).lineTo(50, 50);
obj.moveTo(60, 60).lineTo(90, 100);

const display_div = document.getElementById("display");
display_div.appendChild(app.view);