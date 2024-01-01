import run from 'aocrunner'

const wordToNumberStr = (word: string) => {
  const wordToNumberMap: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7 ',
    eight: '8',
    nine: '9',
  }
  const lowercaseWord = word.toLowerCase()
  if (wordToNumberMap.hasOwnProperty(lowercaseWord)) {
    return wordToNumberMap[lowercaseWord]
  } else {
    // in this case we're assuming that it's already a numberStr (e.g. '1', '2')
    return word
  }
}

/**
 * @param rawInput alphanumeric string
 *
 * will return a single number which is a combination of the first and last digits it found in the input string
 */
const parseInput = (rawInput: string) => {
  const regex: RegExp = /\d|one|two|three|four|five|six|seven|eight|nine/g

  const matches = rawInput.match(regex)
  // console.log(`Matches: ${matches}`)
  if (matches) {
    const first = wordToNumberStr(matches[0]).trim()
    const last = wordToNumberStr(matches[matches.length - 1]).trim()
    console.log(`first: ${first}, last: ${last}`)
    return Number('' + first + last)
  } else {
    console.log('matches was null')
    return 0
  }
}

const part1 = (rawInput: string): number => {
  const splitStrings = rawInput.split('\n')
  // console.log(`num split strings: ${splitStrings.length}`)

  return splitStrings.reduce(
    (acc, inputString) => acc + parseInput(inputString),
    0,
  )
}

const part2 = (rawInput: string) => {
  const splitStrings = rawInput.split('\n')
  // console.log(`num split strings: ${splitStrings.length}`)

  return splitStrings.reduce(
    (acc, inputString) => acc + parseInput(inputString),
    0,
  )
}

run({
  part1: {
    tests: [
      {
        input:
          'sixsrvldfour4seven\n' + '53hvhgchljnlxqjsgrhxgf1zfoureightml5hvvv',
        expected: 122,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input:
          'two1nine\n' +
          'eightwothree\n' +
          'abcone2threexyz\n' +
          'xtwone3four\n' +
          '4nineeightseven2\n' +
          'zoneight234\n' +
          '7pqrstsixteen',
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
