import readline from "node:readline";
import { stdin } from "node:process";

async function readInput(input) {
    const rl = readline.createInterface({ input });
    const lines: string[] = [];

    for await (const line of rl) {
        lines.push(line);
    }

    return lines;
}

function parseLine(line:string) : [number, number] {
    const vals = line.split(/ +/).map(Number);

    return [vals[0]!, vals[1]!];
}

function splitNumbers(parsedLines: [number, number][]): [number[], number[]] {
    const flattenedLines = parsedLines.flat();
    const leftNumbers = flattenedLines.filter((_, i) => i % 2 === 0);
    const rightNumbers = flattenedLines.filter((_, i) => i % 2 === 1);

    return [leftNumbers, rightNumbers];
}

function findDistance(leftNumbers: number[], rightNumbers: number[]): number[] {
    leftNumbers.sort();
    rightNumbers.sort();

    return leftNumbers.map((x, i) => Math.abs(x - rightNumbers[i]!));
}

function findSimilarity(leftNumbers: number[], rightNumbers: number[]): number {
    const counts = leftNumbers.map((n) => rightNumbers.filter(x => x === n).length);

    return leftNumbers.map((_, i) => leftNumbers[i] * counts[i]).reduce((acc, n) => acc + n);
}

await (async function () {
    const [leftNumbers, rightNumbers] = splitNumbers((await readInput(stdin)).map(parseLine));

    console.log(
        findDistance(leftNumbers, rightNumbers)
            .reduce((acc, x) => x + acc)
        );

    console.log(findSimilarity(leftNumbers, rightNumbers));
})();