/**
 * @class
 * Represents a 2D coordinate
 */
export class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(v) {
        return (this.x === v.x) && (this.y === v.y);
    }

    toString() {
        return new String(this.x) + new String(this.y);
    }
}

/**
 * @class
 * Denotes an edge between two vertices (2D coordinates)
 */
export class Edge {

    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }

    equals(e) {
        return (this.v1.equals(e.v1) && this.v2.equals(e.v2)) || (this.v1.equals(e.v2) && this.v2.equals(e.v1));
    }

    /**
     * Returns a string containing the vertices in lexicographic order
     * @returns 
     */
    toString() {
        if (v1.x < v2.x) {
            return new String(v1.x) + new String(v1.y) + new String(v2.x) + new String(v2.y);
        } else if (v1.x > v2.x) {
            return new String(v2.x) + new String(v2.y) + new String(v1.x) + new String(v1.y);
        } else {
            if (v1.y <= v2.y) {
                return new String(v1.x) + new String(v1.y) + new String(v2.x) + new String(v2.y);
            } else {
                return new String(v2.x) + new String(v2.y) + new String(v1.x) + new String(v1.y);
            }
        }
    }
}