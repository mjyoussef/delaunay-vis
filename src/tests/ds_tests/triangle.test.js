import { Vertex } from '../../types/graphs';
import { lineInfoOf, Line, Triangle } from '../../types/triangle';

describe("tests for lineInfoOf", () => {
    test("vertical lines", () => {
        let v1 = new Vertex(0, 0);
        let v2 = new Vertex(0, 5);
    
        let vertical_line = lineInfoOf(v1, v2);
        expect(vertical_line.slope).toBeNull();
    });

    test("constant lines", () => {
        let v1 = new Vertex(0, 5);
        let v2 = new Vertex(10, 5);

        let constant = lineInfoOf(v1, v2);
        expect(constant.slope).toBeCloseTo(0, 3);
    });

    test("sloped lines", () => {
        let v1 = new Vertex(2, 3);
        let v2 = new Vertex(8, 4);

        let sloped = lineInfoOf(v1, v2);
        expect(sloped.slope).toBeCloseTo((1/6), 3);
        expect(sloped.pt).toMatchObject(new Vertex(2,3));
    });
});

describe(("tests for Line"), () => {
    
    test(("constant lines"), () => {
        let const1 = new Line(new Vertex(0,0), 0);
        let const2 = new Line(new Vertex(0,3), 0);

        expect(const1.intersectionWith(const2)).toBeNull();

        const2.lineInfo.pt = new Vertex(0,0);
        expect(const1.intersectionWith(const2)).toBeNull();
    });

    test("vertical lines", () => {
        let vert1 = new Line(new Vertex(0,0), null);
        let vert2 = new Line(new Vertex(3,0), null);

        expect(vert1.intersectionWith(vert2)).toBeNull();

        vert2.lineInfo.pt = new Vertex(0,0);
        expect(vert1.intersectionWith(vert2)).toBeNull();
    });

    test("parralel lines", () => {
        let line1 = new Line(new Vertex(0,0), 2);
        let line2 = new Line(new Vertex(0,3), 2);

        expect(line1.intersectionWith(line2)).toBeNull();

        line2.lineInfo.pt = new Vertex(0,0);
        expect(line1.intersectionWith(line2)).toBeNull();
    });

    test("intersection with vertical", () => {
        let vertical = new Line(new Vertex(5,0), null);
        let sloped = new Line(new Vertex(0,0), 3);

        expect(vertical.intersectionWith(sloped)).toMatchObject(new Vertex(5, 15));
        expect(sloped.intersectionWith(vertical)).toMatchObject(new Vertex(5,15));
    });

    test("intersection wth constant line", () => {
        let constant = new Line(new Vertex(0,0), 0);
        let sloped = new Line(new Vertex(0,-3), 1);

        expect(constant.intersectionWith(sloped)).toMatchObject(new Vertex(3,0));

        let vertical = new Line(new Vertex(-5,0), null);
        expect(constant.intersectionWith(vertical)).toMatchObject(new Vertex(-5,0));
    });

    test("intersection of two non-vertical and non-constant lines", () => {
        let line1 = new Line(new Vertex(0,2), 3);
        let line2 = new Line(new Vertex(0,2), -3);

        expect(line1.intersectionWith(line2)).toMatchObject(new Vertex(0,2));
    });
});

describe("tests for Triangle", () => {
    test("right triangle", () => {
        let triangle = new Triangle(new Vertex(0,0), new Vertex(0,5), new Vertex(3,0));

        expect(triangle.circumcenter).toMatchObject(new Vertex(1.5, 2.5));
    });

    test("isosceles triangle", () => {
        let triangle = new Triangle(new Vertex(0,0), new Vertex(5,0), new Vertex(2.5, 5));

        expect(triangle.circumcenter).toMatchObject(new Vertex(2.5, 1.875));
    });

    test("obtuse triangle", () => {
        let triangle = new Triangle(new Vertex(2,2), new Vertex(3,8), new Vertex(4,-3));

        expect(triangle.circumcenter.x).toBeCloseTo(12.559, 2);
        expect(triangle.circumcenter.y).toBeCloseTo(3.324, 2);
    });
});