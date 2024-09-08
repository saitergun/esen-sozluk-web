declare type TdkMaddeLisanKodu =
  | '0'
  | '22' // Rusça
  | '11' // Arapça | '' (1)
  | '13' // Fransızca | marka (1) | özel (1)
  | '12' // Farsça | Arapça (1) | Fransızca (1) | '' (1)
  | '23' // Almanca
  | '14' // İtalyanca
  | '393' // Rumca | Yunanca (1)
  | '18' // İngilizce | Fransızca (2)
  | '19' // Türkçe
  | '16' // Latince
  | '15' // Yunanca
  | '153' // Moğolca
  | '354' // Moğolca
  | '20' // İspanyolca
  | '21' // Ermenice
  | '25' // İbranice
  | '27' // Bulgarca
  | '26' // Macarca | Mar. (1)
  | '346' // Japonca
  | '392' // Fince
  | '395' // Soğdca
  | '28' // Portekizce
  | '24' // Slavca (Leipzig şehrinin adından)
  | '486' // Sırpça
  | '348' // Arnavutça
  | '420' // Korece

declare type TdkMaddeAtasozu = {
  madde: string
  on_taki: string | null
  madde_id: number // string
}

declare type TdkMaddeAnlamOrnekYazar = {
  ekno: string // ?number
  tam_adi: string
  kisa_adi: string
  yazar_id: string // ?number
}

declare type TdkMaddeAnlamOrnek = {
  kac: '0' | '1' | '2' | '3'
  ornek: string
  yazar?: TdkMaddeAnlamOrnekYazar[]
  anlam_id: string // ?number
  ornek_id: string // ?number
  yazar_id: string | null // ?number
  ornek_sira: '1' | '2' | '3' | '4'
}

declare type TdkMaddeAnlamOzellik = {
  tur: '1' | '3' | '4'
  ekno: string // ?number
  tam_adi: string
  kisa_adi: string
  ozellik_id: string // ?number
}

declare type TdkMaddeAnlam = {
  gos: string // ?number
  fiil: string // ?number
  anlam: string
  tipkes: string // ?number
  anlam_id: string // ?number
  madde_id: string // ?number
  anlam_sira: string // ?number
  ozelliklerListe?: TdkMaddeAnlamOzellik[]
  orneklerListe?: TdkMaddeAnlamOrnek[]
}

declare type TdkMadde = {
  madde_id: string // ?number
  kac: '0' | '1' | '2' | '3' | '4' | '5' // aynı kelime varsa sırası
  kelime_no: string // ?number
  cesit: string // ?number
  anlam_gor: '0' | '1' | '2' | '3' | '4' | '5'
  on_taki_html: string | null
  on_taki: string | null
  madde: string
  madde_html: string
  cesit_say: string // ?number // atasozu sayısı
  anlam_say: string // ?number // anlam sayısı
  taki: string | null
  cogul_mu: '0' | '1' // ?boolean
  ozel_mi: '0' | '1' // ?boolean
  egik_mi: '0' | '1' // ?boolean
  lisan_kodu: TdkMaddeLisanKodu
  lisan_html: string | ''
  lisan: string | ''
  telaffuz_html: string | null
  telaffuz: string | null
  birlesikler: string | null
  font: null // hepsi null geliyor. niye var ki o zaman?
  madde_duz: string
  gosterim_tarihi: string | null
  /**
   * 4 tane için soru işareti koyduk :(
   * 4 tanesinde anlamlarListe yok galiba, unuttum neden olduğunu.
   */
  anlamlarListe?: TdkMaddeAnlam[]
  atasozu?: TdkMaddeAtasozu[]
}
