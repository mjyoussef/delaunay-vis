import { Edge, Vertex } from "../../types/graphs";
import { uniqueEdges } from "../../utils/triangulation";

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
        console.log(output);

        const expected = [
            new Edge(new Vertex(0,4), new Edge(2,0)),
            dup_edge1,
            new Edge(new Vertex(0,0), new Vertex(0,0)),
            dup_edge2
        ];

        expect(output).toMatchObject(expected);
    });
});