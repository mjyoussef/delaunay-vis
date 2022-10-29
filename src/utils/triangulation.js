import { Edge } from "../types/graphs";
import { Triangle } from "../types/triangle";
import { superTriangleFrom } from "./superTriangle"

/**
 * Checks whether or not a vertex matches any vertex in a triangle
 * @param {Vertex} v 
 * @param {Array<Vertex>} triangle 
 * @returns true or false
 */
function containsVertex(v, triangle) {
    return v.equals(triangle.v1) || v.equals(triangle.v2) || v.equals(triangle.v3); 
}

/**
 * Removes duplicate edges from a list of edges
 * @param {Array<Edge>} edges 
 * @returns a list of edges
 */
export function uniqueEdges(edges) {
    const seen = new Set();
    const uniqueEdges = [];

    for (let i=0; i<edges.length; i++) {
        if (!seen.has(edges[i].id)) {
            uniqueEdges.push(edges[i]);
            seen.add(edges[i].id);
        }
    }

    return uniqueEdges;
}

/**
 * Creates a new edges from triangles that have circumcircles containing the provided vertex
 * and removes those triangles
 * @param {Vertex} v 
 * @param {Array<Triangle>} triangles 
 * @returns a new array of triangles
 */
function considerVertex(v, triangles) {
    const edges = [];

    triangles = triangles.filter((triangle) => {
        if (triangle.inCircumcircle(v)) {
            edges.push(new Edge(triangle.v1, triangle.v2));
            edges.push(new Edge(triangle.v2, triangle.v3));
            edges.push(new Edge(triangle.v1, triangle.v3));

            return false;
        }

        return true;
    });

    edges = uniqueEdges(edges);

    edges.forEach((e) => {
        triangles.push(new Triangle(e.v1, e.v2, v));
    });

    return triangles;
}

/**
 * Constructs a Delauney triangulation from an array of vertices
 * @param {Array<Vertex>} vertices 
 * @returns an array of triangles
 */
export function triangulate(vertices) {
    const superTriangle = superTriangleFrom(vertices, 0.1);

    const triangles = [superTriangle];

    vertices.forEach((v) => {
        triangles = considerVertex(v, triangles);
    });

    output = triangles.filter((triangle) => {
        const v1 = triangle.v1;
        const v2 = triangle.v2;
        const v3 = triangle.v3;

        return !containsVertex(v1, superTriangle) 
                && !containsVertex(v2, superTriangle)
                && !containsVertex(v3, superTriangle);
    });

    return output;
}