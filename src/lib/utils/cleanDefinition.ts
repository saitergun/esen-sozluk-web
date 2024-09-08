const DEFINITION_BLACKLIST = ['►', '343']

export default function cleanDefinition(definition: string) {
  return definition
    .split(' ')
    .filter((sig) => !DEFINITION_BLACKLIST.includes(sig))
    .join(' ')
}
