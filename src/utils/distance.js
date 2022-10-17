export function euclidean(v1, v2) {
    const sum = Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2);
    return Math.sqrt(sum);
}