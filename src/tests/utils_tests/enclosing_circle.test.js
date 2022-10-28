import { Vertex } from "../../types/graphs";
import { euclidean } from "../../utils/distance";
import { minEnclosingCircle } from "../../utils/enclosingCircle";

/**
 * Determines whether or not a point is inside a circle
 * @param {Array<Vertex>} vertices 
 * @param circle a tuple storing diameter + center of circle
 * @returns true or false
 */
function isInCircle(vertices, circle) {

    const radius = circle.diameter/2;
    const center = circle.center;

    for (let i=0; i<vertices.length; i++) {
        if (euclidean(vertices[i], center) > radius) {
            return false;
        }
    }

    return true;
}

/**
 * Randomly generates points within provided boundaries
 * @param {number} num_points 
 * @param {number} left 
 * @param {number} right 
 * @param {number} down 
 * @param {number} up 
 * @returns a list of vertices
 */
function randPointGenerator(num_points, left, right, down, up) {

    const points = [];
    for (let i=0; i<num_points; i++) {
        let x = left + Math.trunc(Math.random() * (right-left)) + 1;
        let y = down + Math.trunc(Math.random() * (up-down)) + 1;

        points[i] = new Vertex(x, y);
    }

    return points;
}

describe("large number of points", () => {
    test("dense", () => {
        const points = randPointGenerator(50, -5, 5, 0, 10);

        const circle = minEnclosingCircle(points);

        expect(isInCircle(points, circle)).toBeTruthy();
    });

    test("sparse", () => {
        const points = randPointGenerator(20, -50, 50, -100, 100);

        const circle = minEnclosingCircle(points);

        expect(isInCircle(points, circle)).toBeTruthy();
    });
});