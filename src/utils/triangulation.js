import { Edge, Vertex } from "../types/graphs";
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
 * Creates a new set of triangles if the provided point is in the circumcircle of any triangle.
 * @param {Vertex} v 
 * @param {Array<Triangle>} triangles
 * @returns a new array of triangles
 */
function considerVertex(v, triangles) {
    const edges = [];

    const new_triangles = triangles.filter((triangle) => {
        if (triangle.inCircumcircle(v)) {
            const v1 = new Vertex(triangle.v1.x, triangle.v1.y);
            const v2 = new Vertex(triangle.v2.x, triangle.v2.y);
            const v3 = new Vertex(triangle.v3.x, triangle.v3.y);

            edges.push(new Edge(v1, v2));
            edges.push(new Edge(v2, v3));
            edges.push(new Edge(v1, v3));

            return false;
        }

        return true;
    });
    
    const edges_map = new Map();
    const edges_count = new Map();

    edges.forEach(e => {
        if (edges_count.has(e.id)) {
            edges_count.set(e.id, edges_count.get(e.id)+1);
        } else {
            edges_count.set(e.id, 1);
        }

        if (!edges_map.has(e.id)) {
            edges_map.set(e.id, e);
        }
    });

    const single_edges = [];
    for (let key of edges_count.keys()) {
        if (edges_count.get(key) === 1) {
            single_edges.push(edges_map.get(key));
        }
    }

    single_edges.forEach((e) => {
        const new_triangle = new Triangle(e.v1, e.v2, v);
        new_triangles.push(new_triangle);
    });

    return new_triangles;
}

/**
 * Constructs a Delauney triangulation from an array of vertices
 * @param {Array<Vertex>} vertices 
 * @returns an array of triangles
 */
export function triangulate(vertices) {
    const superTriangle = superTriangleFrom(vertices, 10);

    let triangles = [superTriangle];

    vertices.forEach((v) => {
        triangles = considerVertex(v, triangles);
    });

    const output = triangles.filter((triangle) => {
        const v1 = triangle.v1;
        const v2 = triangle.v2;
        const v3 = triangle.v3;

        return !containsVertex(v1, superTriangle) 
                && !containsVertex(v2, superTriangle)
                && !containsVertex(v3, superTriangle);
    });

    return output;
}

/**
 * Returns the set of edges in a Delauney triangulation
 * @param {Array<Triangle>} triangles array of triangles
 * @returns a list of edges
 */
export function get_triangulation_edges(triangles) {
    const edges = [];
    for (let i=0; i<triangles.length; i++) {
        const t = triangles[i];
        const e1 = new Edge(t.v1, t.v2);
        const e2 = new Edge(t.v2, t.v3);
        const e3 = new Edge(t.v1, t.v3);

        edges.push(e1, e2, e3);
    }

    return uniqueEdges(edges);
}