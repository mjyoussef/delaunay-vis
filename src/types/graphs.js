export const Vertex = class {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    equals(v) {
        return (this.x === v.x) && (this.y === v.y);
    }
}

export const Edge = class {
    constructor(v1, v2, id) {
        this.v1 = v1;
        this.v2 = v2;
        this.id = id;
    }

    equals(e) {
        return (this.v1.equals(e.v1) && this.v2.equals(e.v2)) || (this.v1.equals(e.v2) && this.v2.equsls(e.v1));
    }
}