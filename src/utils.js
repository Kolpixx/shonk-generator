export default function getLongestString(arr) {
    return arr.reduce((a, b) => {
        return a.length > b.length ? a : b;
    });
}