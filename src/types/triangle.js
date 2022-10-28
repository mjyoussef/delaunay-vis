import { Vertex } from "./graphs";
import { euclidean } from "../utils/distance";

const VERTICAL = "vertical";
const SLOPED = "sloped";

/**
 * Generate a line from two vertices
 * @param {Vertex} v1 vertex 1
 * @param {Vertex} v2 vertex 2
 * @returns a tuple containing a point on the line and the slope of the line (null if vertical)
 */
export function lineInfoOf(v1, v2) {
    const diffY = v1.y - v2.y;
    const diffX = v1.x - v2.x;

    if (diffX === 0) {
        return {pt: v1, slope: null};
    }

    return {pt: v1, slope: diffY/diffX};
}

/**
 * @class
 * Stores the line formed between two vertices and provides method for computing intersection
 * with other lines
 */
export class Line {

    constructor(v, slope) {
        this.lineInfo = {pt: v, slope: slope};
    }

    /**
     * Finds the intersection of this line with another line
     * @param {Line} line 
     * @returns returns the vertex where they intersect or null if they don't intersect
     */
    intersectionWith(line) {

        // parralel lines, even if they contain the same points, have zero intersection
        if ((this.lineInfo.slope === line.lineInfo.slope) || 
            (this.lineInfo.slope === null && line.lineInfo.slope === null)) {
            return null;
        }

        // this line is vertical
        if (this.lineInfo.slope === null) {
            const m = line.lineInfo.slope;
            const v = line.lineInfo.pt;

            const x = this.lineInfo.pt.x;
            return new Vertex(x, m*(x - v.x) + v.y);
        }

        // the line passed as input is vertical
        if (line.lineInfo.slope === null) {
            return line.intersectionWith(this);
        }

        const m1 = this.lineInfo.slope;
        const x1 = this.lineInfo.pt.x;
        const y1 = this.lineInfo.pt.y;

        const m2 = line.lineInfo.slope;
        const x2 = line.lineInfo.pt.x;
        const y2 = line.lineInfo.pt.y;

        // derived from m1(x-x1) + y1 = m2(x-x2) + y2
        const x = ((m1 * x1) - y1 - (m2 * x2) + y2)/(m1 - m2);
        const y = m1*(x - x1) + y1;

        // returned in the event where both lines intersect and are not vertical
        return new Vertex(x, y);
    }
}

export class Triangle {
    constructor(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;

        this.line1 = lineInfoOf(this.v1, this.v2);
        this.line2 = lineInfoOf(this.v2, this.v3);
        this.line3 = lineInfoOf(this.v1, this.v3);

        // accessed frequently, so it is a better idea to store as an instance variable
        this.circumcenter = this.circumcenter();
        this.circumradius = this.circumradius();
    }

    /**
     * Computes the recipricol of a slope
     * @param {number} slope 
     * @returns a number of null if recipricol is undefined
     */
    recipricolOf(slope) {
        if (slope === null) {
            return 0;
        }

        if (slope === 0) {
            return null;
        }

        return -1/slope;
    }

    /**
     * Computes the circumcenter of a triangle by finding the intersection of two perpendicular bisectors
     * @returns a Vertex representing the circumcenter of a triangle
     */
    circumcenter() {

        // store the midpoints of each side of the triangle
        let mp1 = new Vertex((this.v1.x + this.v2.x)/2, (this.v1.y + this.v2.y)/2);
        let mp2 = new Vertex((this.v2.x + this.v3.x)/2, (this.v2.y + this.v3.y)/2);

        // find recipricol of slopes for first two slopes
        const recip1 = this.recipricolOf(this.line1.slope);
        const recip2 = this.recipricolOf(this.line2.slope);

        // find the intersection of first two perpendicular bisectors
        const perp_line1 = new Line(mp1, recip1);
        const perp_line2 = new Line(mp2, recip2);

        return perp_line1.intersectionWith(perp_line2);
    }

    /**
     * Computes the radius of the circumcircle of the triangle
     * @returns a number
     */
    circumradius() {
        return euclidean(this.circumcenter, this.v1);
    }

    /**
     * Determines whether or not a vertex is inside circumcircle of our triangle
     * @param {Vertex} v 
     * @returns true or false
     */
    inCircumcircle(v) {
        return euclidean(this.circumcenter, v) <= this.circumradius;
    }
}