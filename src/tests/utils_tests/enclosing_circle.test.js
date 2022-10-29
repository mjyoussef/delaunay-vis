import { Vertex } from "../../types/graphs";
import { euclidean } from "../../utils/distance";
import { minEnclosingCircle } from "../../utils/enclosingCircle";
import { randPointGenerator } from './point_generator';

/**
 * Determines whether or not a point is inside a circle
 * @param {Array<Vertex>} vertices 
 * @param circle a tuple storing diameter + center of circle
 * @returns true or false
 */
function isInCircle(vertices, circle) {

    const radius = circle.radius;
    const center = circle.center;

    for (let i=0; i<vertices.length; i++) {
        if (euclidean(vertices[i], center) > radius) {
            return false;
        }
    }

    return true;
}

describe("15 random tests", () => {
    for (let i=0; i<15; i++) {
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
    }
});