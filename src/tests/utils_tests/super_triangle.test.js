import { Vertex } from "../../types/graphs";
import { Line } from "../../types/triangle";
import { Triangle } from "../../types/triangle";
import { superTriangleFrom } from "../../utils/superTriangle";
import { randPointGenerator } from '../../utils/point_generator';

/**
 * Determines whether or not a point is inside a triangle
 * @param {Vertex} pt
 * @param {Triangle} triangle
 * @returns true or false
 */
function inTriangle(pt, triangle) {
    const ray_cast_line = new Line(pt, 0);

    const line1 = new Line(triangle.line3.pt, triangle.line3.slope);
    const line2 = new Line(triangle.line2.pt, triangle.line2.slope);

    const inter1 = ray_cast_line.intersectionWith(line1);
    const inter2 = ray_cast_line.intersectionWith(line2);

    return (inter1.x <= pt.x) && (inter2.x >= pt.x) && (pt.y <= triangle.v3.y) && (pt.y >= triangle.v1.y);
}

/**
 * Checks if every point is inside the triangle.
 * @param {Array<Vertex>} pts 
 * @param {Triangle} triangle 
 * @returns true or false
 */
function allInTriangle(pts, triangle) {
    for (let i=0; i<pts.length; i++) {
        if (!inTriangle(pts[i], triangle)) {
            return false;
        }
    }

    return true;
}

describe("15 random tests", () => {
    for (let i=0; i<15; i++) {
        test("sparse set", () => {
            const points = randPointGenerator(30, -50, 50, -100, 100);
            const super_triangle = superTriangleFrom(points, 3);
            expect(allInTriangle(points, super_triangle)).toBeTruthy();
        });

        test("dense set", () => {
            const points = randPointGenerator(100, -20, 20, -20, 20);
            const super_triangle = superTriangleFrom(points, 1);
            expect(allInTriangle(points, super_triangle)).toBeTruthy();
        });
    }
});