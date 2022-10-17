import { Vertex } from "../types/graphs";
import { euclidean } from "./distance";

export function minEnclosingCircle(vertices) {
    let maxDist = 0;
    let p1 = vertices[0];
    let p2 = vertices[1];

    for (let i=1; i<vertices.length; i++) {
        for (let j=i+1; j<vertices.length; j++) {
            let dist = euclidean(vertices[i], vertices[j]);
            if (dist > maxDist) {
                minDist = dist;
                p1 = vertices[i];
                p2 = vertices[j];
            }
        }
    }

    const midX = (p1.x + p2.x)/2;
    const midY = (p1.y + p2.y)/2;

    return {diameter: maxDist, center: new Vertex(midX, midY)};
}