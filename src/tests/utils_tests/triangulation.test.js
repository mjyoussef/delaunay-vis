import { Edge, Vertex } from "../../types/graphs";
import { triangulate, uniqueEdges } from "../../utils/triangulation";
import { randPointGenerator } from "../../utils/point_generator";

describe("uniqueEdges tests", () => {
    test("two edges", () => {
        const edges = [new Edge(new Vertex(0,0), new Vertex(0,1))];
        const output = uniqueEdges(edges);

        expect(output).toMatchObject(edges);
    });

    test("all duplicate edges", () => {
        const the_edge = new Edge(new Vertex(0,0), new Vertex(0,1))
        const edges = [the_edge, the_edge, the_edge];
        const output = uniqueEdges(edges);

        expect(output).toMatchObject([the_edge]);
    });

    test("some duplicates", () => {
        const dup_edge1 = new Edge(new Vertex(-4,2), new Vertex(3,3));
        const dup_edge2 = new Edge(new Vertex(0,3), new Vertex(2,0));
        const edges = [
            new Edge(new Vertex(0,4), new Edge(2,0)), 
            dup_edge1, 
            new Edge(new Vertex(0,0), new Vertex(0,0)), 
            dup_edge2, 
            // matches dup_edge1
            new Edge(new Vertex(3,3), new Vertex(-4,2)), 
            //matches dup_edge2
            new Edge(new Vertex(0,3), new Vertex(2,0))
        ];

        const output = uniqueEdges(edges);

        const expected = [
            new Edge(new Vertex(0,4), new Edge(2,0)),
            dup_edge1,
            new Edge(new Vertex(0,0), new Vertex(0,0)),
            dup_edge2
        ];

        expect(output).toMatchObject(expected);
    });
});

function isValidTriangulation(triangles) {
    for (let i=0; i<triangles.length; i++) {
        const v1 = triangles[i].v1;
        const v2 = triangles[i].v2;
        const v3 = triangles[i].v3;

        for (let j=0; j<triangles.length; j++) {
            if (j != i) {
                const t = triangles[i];
                if (t.inCircumcircle(v1) || t.inCircumcircle(v2) || t.inCircumcircle(v3)) {
                    return false;
                }
            }
        }
    }

    return true;
}

describe("triangulating small sets", () => {
    test("3 points", () => {
        const vertices = [new Vertex(0,0), new Vertex(3,4), new Vertex(10,0)];
        const output = triangulate(vertices);
        expect(isValidTriangulation(output)).toBeTruthy();
    });

    test("multiple points", () => {
        const vertices = [new Vertex(0,0), new Vertex(3,4), new Vertex(2,1), new Vertex(10,0), new Vertex(5,8), new Vertex(3,3), new Vertex(8,-0.5)];
        const output = triangulate(vertices);
        expect(isValidTriangulation(output)).toBeTruthy();
    });

    test("points along same axis", () => {
        const vertices = [new Vertex(0,0), new Vertex(2,1), new Vertex(4,4), new Vertex(2,-1), new Vertex(2,8), new Vertex(10,4), new Vertex(11,4)];
        const output = triangulate(vertices);
        expect(isValidTriangulation(output)).toBeTruthy();
    });

    test("random number of points", () => {
        const vertices = randPointGenerator(30, 0, 500, 0, 500);
        const output = triangulate(vertices);
        expect(isValidTriangulation(output)).toBeTruthy();
    });
});