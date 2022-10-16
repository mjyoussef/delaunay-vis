import { Vertex } from "./graphs";


const VERTICAL = "vertical";
const SLOPED = "sloped";

function lineInfoOf(v1, v2) {
    diffY = v1.y - v2.y;
    diffX = v1.x - v2.x;

    if (diffX === 0) {
        return {pt: v1, slope: null};
    }

    return {pt: v1, slope: diffY/diffX};
}

const Line = class {
    constructor(v1, v2) {
        this.lineInfo = lineInfoOf(v1, v2);
    }

    constructor(slope, v) {
        this.lineInfo = {pt: v, slope: slope};
    }

    intersectionWith(line) {

        if ((this.lineInfo.slope === line.lineInfo.slope) || 
            (this.lineInfo.slope === null && line.lineInfo.slope === null)) {
            return null;
        }

        if (this.lineInfo.slope === null) {
            m = line.lineInfo.slope;
            v = line.lineInfo.v;

            x = this.lineInfo.v.x;
            return new Vertex(x, m*(x - v.x) + v.y);
        }

        if (line.lineInfo.slope === null) {
            return line.intersectionWith(this);
        }

        m1 = this.lineInfo.slope;
        x1 = this.lineInfo.v.x;
        y1 = this.lineInfo.v.y;

        m2 = line.lineInfo.slope;
        x2 = line.lineInfo.v.x;
        y2 = line.lineInfo.v.y;

        x = ((m1 * x1) - y1 - (m2 * x2) + y2)/(m1 - m2);
        y = m1*(x - x1) + y1;

        return new Vertex(x, y);
    }
}

export const Triangle = class {
    constructor(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }

    calculateCircumCenter() {
        let mp1 = Vertex((this.v1.x + this.v2.x)/2, (this.v1.y + this.v2.y)/2);
        let mp2 = Vertex((this.v2.x + this.v3.x)/2, (this.v2.y + this.v3.y)/2);
        let mp3 = Vertex((this.v1.x + this.v3.x)/2, (this.v1.y + this.v3.y)/2);

        let slope1 = 0;
        let slope2 = 0;
        let slope3 = 0;
        
    }
}