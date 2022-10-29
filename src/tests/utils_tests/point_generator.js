import { Vertex } from "../../types/graphs";

/**
 * Randomly generates points within provided boundaries
 * @param {number} num_points 
 * @param {number} left 
 * @param {number} right 
 * @param {number} down 
 * @param {number} up 
 * @returns a list of vertices
 */
 export function randPointGenerator(num_points, left, right, down, up) {

    const points = [];
    for (let i=0; i<num_points; i++) {
        let x = left + Math.trunc(Math.random() * (right-left)) + 1;
        let y = down + Math.trunc(Math.random() * (up-down)) + 1;

        points[i] = new Vertex(x, y);
    }

    return points;
}