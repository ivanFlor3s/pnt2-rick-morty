import { uniqueNamesGenerator, adjectives } from 'unique-names-generator'

const improvedAdjectives = [...adjectives, 'abrasive', 'brash', 'callous', 'daft', 'eccentric', 'Pelado']
const improvedPoliticians = ['Cristina', 'Massa', 'Alberto', 'Agustin Rossi', 'Grabois', 'Milei', 'Larreta']

export const generateName = (): string => {
  return uniqueNamesGenerator({
    dictionaries: [improvedAdjectives,  improvedPoliticians],
    length: 2,
    separator: ' ',
    style: 'capital'
  })
}
