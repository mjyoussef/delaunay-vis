import { Edge } from "../types/graphs";
import { Triangle } from "../types/triangle";
import { superTriangleFrom } from "./superTriangle"

function containsVertex(v, triangle) {
    return v.equals(triangle.v1) || v.equals(triangle.v2) || v.equals(triangle.v3); 
}

function uniqueEdges(edges) {
    const seen = new Set();
    const uniqueEdges = [];

    for (let i=0; i<edges.length; i++) {
        if (!seen.has(edges[i].id)) {
            uniqueEdges.push(edges[i]);
        }
    }

    return uniqueEdges;
}

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
}