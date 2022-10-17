import { minEnclosingCircle } from "./enclosingCircle";
import { Triangle } from "../types/triangle"
import { Vertex } from "../types/graphs";

export function superTriangleFrom(vertices, margin) {
    const circle = minEnclosingCircle(vertices);

    const yTop = circle.center.y + (circle.diameter/2) + margin;
    const yBottom = circle.center.y - (circle.diameter/2) - margin;

    const xRight = circle.center.x + (circle.diameter/2) + margin;
    const xLeft = circle.center.x - (circle.diameter/2) - margin;

    const v1 = new Vertex(xLeft, yBottom);
    const v2 = new Vertex(xRight, yBottom);
    const v3 = new Vertex((xRight + xLeft)/2, yTop);

    return new Triangle(v1, v2, v3);
}