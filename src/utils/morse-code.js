export const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '0',
  'SOS', 'Ä', 'Á', 'Å', 'Ch', 'É', 'Ñ', 'Ö', 'Ü',
  '•', ',', ':', '?', '\'', '-', '/', '"', '@', '=']
export const code = [
  '•―', // A
  '―•••', // B
  '―•―•', // C
  '―••', // D
  '•', // E
  '••―•', // F
  '――•', // G
  '••••', // H
  '••', // I
  '•―――', // J
  '―•―', // K
  '•―••', // L
  '――', // M
  '―•', // N
  '―――', // O
  '•――•', // P
  '――•―', // Q
  '•―•', // R
  '•••', // S
  '―', // T
  '••―', // U
  '•••―', // V
  '•――', // W
  '―••―', // X
  '―•――', // Y
  '――••', // Z
  '•――――', // 1
  '••―――', // 2
  '•••――', // 3
  '••••―', // 4
  '•••••', // 5
  '―••••', // 6
  '――•••', // 7
  '―――••', // 8
  '――――•', // 9
  '―――――', // 0
  '•••―――•••', // SOS
  '•―•―', // Ä
  '•――•―', // Á
  '•――•―', // Å
  '――――', // Ch,
  '••―••', // É
  '――•――', // Ñ,
  '―――•', // Ö,
  '••――', // Ü
  '•―•―•―', // •
  '――••――', // ,
  '―――•••', // :
  '••――••', // ?
  '•――――•', // '
  '―••••―', // -
  '―••―•', // "/"
  '•―••―•', // "
  '•――•―•', // @
  '―•••―' // =
]

export function convertToCode (word) {
  return word.split('').map(letter => code[letters.indexOf(letter.toUpperCase())]).join(' ')
}

export function convertToString (message) {
  return message.map(word => word.map(letter => letters[code.indexOf(letter)]).join('')).join(' ')
}

export function isLetter (sounds) {
  return !!letters[code.indexOf(sounds)]
}
