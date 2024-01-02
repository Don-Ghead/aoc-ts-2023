import run from "aocrunner"
import { match } from "node:assert"

type highestRGB = {
  gameId: number
  rgb: {
    red: number
    green: number
    blue: number
  }
}

const extractGameIdFromStr = (input: string) => {
  const gameIdString = input.match(/\d+/)
  if (gameIdString) {
    return Number(gameIdString[0])
  } else {
    console.log(`invalid gameId: ${gameIdString}`)
    return NaN
  }
}

const returnHighestOccurrenceOfColour = (
  input: string,
  colour: "red" | "green" | "blue",
) => {
  const matches = [
    ...input.matchAll(new RegExp(`\\b(\\d+)\\s${colour}\\b`, "g")),
  ].map((match) => parseInt(match[1]))
  return (
    matches?.reduce(
      (acc, currentValue) =>
        Number(currentValue) > acc ? Number(currentValue) : acc,
      0,
    ) ?? 0
  )
}

const parseInput = (rawInput: string): highestRGB[] => {
  let parsedHighest: highestRGB[] = []
  const games = rawInput.split("\n")
  games.map((game) => {
    const splitGameFromSubsets = game.split(":")
    const gameId = extractGameIdFromStr(splitGameFromSubsets[0])
    const highestRed = returnHighestOccurrenceOfColour(
      splitGameFromSubsets[1],
      "red",
    )
    const highestGreen = returnHighestOccurrenceOfColour(
      splitGameFromSubsets[1],
      "green",
    )
    const highestBlue = returnHighestOccurrenceOfColour(
      splitGameFromSubsets[1],
      "blue",
    )
    const highestRgb = {
      gameId,
      rgb: { blue: highestBlue, red: highestRed, green: highestGreen },
    }
    console.log(highestRgb)
    parsedHighest.push(highestRgb)
  })

  return parsedHighest
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const numCubes = { red: 12, green: 13, blue: 14 }

  return input.reduce((acc, currentValue) => {
    const keys = Object.keys(currentValue.rgb) as Array<keyof highestRGB["rgb"]>

    for (let key of keys) {
      if (currentValue.rgb[key] > numCubes[key]) {
        // console.log(`skipping gameId: ${currentValue.gameId}`)
        return acc
      }
    }

    // console.log(`gameId: ${currentValue.gameId} added to sum`)
    return acc + currentValue.gameId
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // part 2 just requires getting the highest occurence of each colour cube
  // from each game and then multiplying them together. Then adding all those
  // Sums together
  return input.reduce((acc, { rgb: { red, green, blue } }) => {
    return acc + red * green * blue
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input:
          "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
          "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
          "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
          "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
          "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
          "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
          "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
          "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
          "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
