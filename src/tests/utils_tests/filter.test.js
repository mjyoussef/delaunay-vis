import { euclidean } from "../../utils/distance";
import { randPointGenerator } from "./point_generator";
import { filterClusters } from '../../utils/filter';

/**
 * Checks if no points have a distance less than a provided threshold
 * @param {Array<Vertex>} vertices 
 * @param {number} dist 
 * @returns true or false
 */
function isIndependentSet(vertices, dist) {
    for (let i=0; i<vertices.length; i++) {
        for (let j=i+1; j<vertices.length; j++) {
            if (euclidean(vertices[i], vertices[j]) <= dist) {
                return false;
            }
        }
    }

    return true;
}

describe("15 random tests", () => {
    for (let i=0; i<15; i++) {
        test("sparse set of vertices", () => {
            const points = randPointGenerator(25, -50, 50, 0, 100);
        
            const filtered_points = filterClusters(points, 5);
            expect(isIndependentSet(filtered_points, 5)).toBeTruthy();
        });

        test("dense set of vertices", () => {
            const points = randPointGenerator(80, -20, 20, -20, 20);

            const filtered_points = filterClusters(points, 5);
            expect(isIndependentSet(filtered_points, 5)).toBeTruthy();
        });
    }
});