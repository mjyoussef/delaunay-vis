import { Application, Graphics } from "pixi.js";
import { randPointGenerator } from "../utils/point_generator";
import { Vertex, Edge} from "../types/graphs";
import { triangulate, get_triangulation_edges} from "../utils/triangulation";


const slider = document.getElementById("slider-bar");
let app;
app = new Application(
    {
        width: 1300,
        height: 650
    }
);

const display_div = document.getElementById("display");
display_div.appendChild(app.view);

const seen = new Set();
function triangulate_display(vertices) {
    for (let i=app.stage.children.length - 1; i>=0; i--) {
        app.stage.removeChild(app.stage.children[i]);
    }

    const triangles = triangulate(vertices);
    const edges = get_triangulation_edges(triangles);

    for (let i=0; i<edges.length; i++) {
        const v1 = edges[i].v1;
        const v2 = edges[i].v2;

        const line = new Graphics();
        app.stage.addChild(line);

        line.lineStyle(1, 0xff0000).moveTo(v1.x,v1.y).lineTo(v2.x, v2.y);
    }
}

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

slider.addEventListener('change', (e) => {
    e.preventDefault();
    const num_points = parseInt(e.target.value);

    const num_points_container = document.getElementById("vertices");
    num_points_container.innerHTML = `<h1>Vertices: ${num_points}</h1>`;

    const vertices = randPointGenerator(num_points, 10, 1200, 10, 600);
    triangulate_display(vertices);
});

const default_num = parseInt(slider.getAttribute("value"));
const vertices = randPointGenerator(default_num, 10, 1200, 10, 600);
triangulate_display(vertices);