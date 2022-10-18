export const Vertex = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    equals(v) {
        return (this.x === v.x) && (this.y === v.y);
    }

    toString(v) {
        return new String(this.x) + new String(this.y);
    }
}

export const Edge = class {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
        
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

    equals(e) {
        return (this.v1.equals(e.v1) && this.v2.equals(e.v2)) || (this.v1.equals(e.v2) && this.v2.equals(e.v1));
    }
}