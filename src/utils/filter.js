import { euclidean } from "./distance";

export function filterClusters(vertices, spacing) {

    // stores a maximal independent subset from vertices 
    // (note: edge is defined between vertices if distance is less than or equal to spacing)
    const output = [];

    for (let i=0; i<vertices.length; i++) {
        let isValid = true;
        for (let j=0; j<output.length; j++) {
            if (euclidean(output[j], vertices[i]) <= spacing) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            output.push(vertices[i]);
        }
    }

    return output;
}