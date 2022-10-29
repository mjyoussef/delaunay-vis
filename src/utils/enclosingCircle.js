import { Vertex } from "../types/graphs";
import { euclidean } from "./distance";

/**
 * Creates a minimum enclosing circle from a set of vertices using the two points that are
 * farthest apart.
 * @param {Array<Vertex>} vertices 
 * @returns a tuple storing the diameter of the circle and its center
 */
export function minEnclosingCircle(vertices) {
    let maxDist = 0;
    let p1 = vertices[0];
    let p2 = vertices[1];

    for (let i=0; i<vertices.length; i++) {
        for (let j=i+1; j<vertices.length; j++) {
            let dist = euclidean(vertices[i], vertices[j]);
            if (dist > maxDist) {
                maxDist = dist;
                p1 = vertices[i];
                p2 = vertices[j];
            }
        }
    }

    // midpoint of the line connecting the two points that are farthest from each other
    const center = new Vertex((p1.x+p2.x)/2, (p1.y+p2.y)/2);

    let radius = 0;
    for (let i=0; i<vertices.length; i++) {
        radius = Math.max(radius, euclidean(center, vertices[i]))
    }

    return {center: center, radius: radius};
}