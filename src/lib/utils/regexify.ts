export default function regexify(string: string) {
  return string
    .replace(new RegExp('[aAÂâ]', 'gi'), '[aAÂâ]')
    .replace(new RegExp('[iİIıîÎ]', 'gi'), '[iİIıîÎ]')
    .replace(new RegExp('[üÜuUÛû]', 'gi'), '[üÜuUÛû]')
    .replace(new RegExp('[cCÇç]', 'gi'), '[cCÇç]')
    .replace(new RegExp('[gGĞğ]', 'gi'), '[gGĞğ]')
    .replace(new RegExp('[sSŞş]', 'gi'), '[sSŞş]')
    .replace(new RegExp('[oOÖö]', 'gi'), '[oOÖö]')
    .replace('(', '\\(')
    .replace(')', '\\)')
}
