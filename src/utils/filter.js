import { Vertex } from "../types/graphs";
import { euclidean } from "./distance";

export function filterClusters(vertices, spacing) {

    // stores a maximal independent subset from vertices 
    // (note: edge is defined between vertices if distance is less than or equal to spacing)
    const output = [];

    for (let i=0; i<vertices.length; i++) {
        let isValid = true;
        for (let j=0; j<output.length; j++) {
            if (euclidean(output[j], vertices[i]) <= spacing) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            output.push(vertices[i]);
        }
    }

    return output;
}

/**
 * Respaces each point by shifting it a certain distance from the center
 * @param {Array<Vertex>} vertices
 * @param {number} spacing 
 * @returns a new of vertices
 */
export function respacePoints(vertices, spacing) {
    
    let x_sum = 0;
    let y_sum = 0;

    for (let i=0; i<vertices.length; i++) {
        x_sum += vertices[i].x;
        y_sum += vertices[i].y;
    }

    const x_center = x_sum / vertices.length;
    const y_center = y_sum / vertices.length;

    const new_vertices = [];

    for (let i=0; i<vertices.length; i++) {
        const v = vertices[i];
        const angle = Math.atan2((v.y-y_center), (v.x-x_center));
        const new_x = (Math.cos(angle) * spacing) + v.x;
        const new_y = (Math.sin(angle) * spacing) + v.y;

        new_vertices.push(new Vertex(new_x, new_y));
    }

    return new_vertices;
}