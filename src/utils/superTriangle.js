import { minEnclosingCircle } from "./enclosingCircle";
import { Triangle } from "../types/triangle"
import { Vertex } from "../types/graphs";

export function superTriangleFrom(vertices, margin) {
    const circle = minEnclosingCircle(vertices);

    // tan(60) = Math.sqrt(3)
    const xLeft = circle.center.x - (Math.sqrt(3) * (circle.radius + margin));
    const xRight = circle.center.x + (Math.sqrt(3) * (circle.radius + margin));

    // cos(60) = 0.5
    const yTop = circle.center.y + (2 * (circle.radius + margin));
    const yBottom = circle.center.y - (circle.radius + margin);

    // vertices of inscribed triangle
    const v1 = new Vertex(xLeft, yBottom);
    const v2 = new Vertex(xRight, yBottom);
    const v3 = new Vertex((xRight + xLeft)/2, yTop);

    return new Triangle(v1, v2, v3);
}