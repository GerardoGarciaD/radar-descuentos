// Planes del armador de outfits.
// Cada plan explica qué pide y trae un outfit de ejemplo armado con ids de public/catalogo.json.
// Para cambiar el ejemplo, cambia el id; para dejar una capa vacía, usa null y una "nota".

// Zonas del cuerpo y qué categorías del catálogo acepta cada capa.
export const ZONAS = [
  {
    id: "cabeza", nombre: "Cabeza", lado: "der", fila: 1,
    capas: [
      { rol: "Gorro", categorias: ["accesorios"] },
      { rol: "Cuello", categorias: ["accesorios"] },
    ],
  },
  {
    id: "torso", nombre: "Torso", lado: "izq", fila: 2,
    capas: [
      { rol: "Afuera", categorias: ["shell", "aislante"] },
      { rol: "Medio", categorias: ["fleece", "aislante"] },
      { rol: "Piel", categorias: ["termica-sup"] },
    ],
  },
  {
    id: "manos", nombre: "Manos", lado: "der", fila: 3,
    capas: [{ rol: "Guantes", categorias: ["guantes"] }],
  },
  {
    id: "piernas", nombre: "Piernas", lado: "izq", fila: 4,
    capas: [
      { rol: "Afuera", categorias: ["pantalones"] },
      { rol: "Piel", categorias: ["termica-inf"] },
    ],
  },
  { id: "pies", nombre: "Pies", lado: "der", fila: 5, pendiente: "Falta tu talla de calzado", capas: [] },
];

export const PLANES = [
  {
    id: "ciudad",
    nombre: "Día en la ciudad",
    corto: "Ciudad",
    icono: "ciudad",
    explicacion:
      "Entras y sales de museos, tiendas y cafés con calefacción, y caminas tramos cortos. No necesitas lo más pesado: necesitas capas que te quites rápido para no sudar adentro.",
    medidores: { abrigo: 2, agua: 1, movimiento: 1 },
    necesitas: ["Térmica delgada", "Polar o suéter", "Parka fácil de quitar", "Gorro y guantes táctiles"],
    dejar: ["Pantalón de nieve: jeans con mallas bastan", "Manoplas gruesas", "Pasamontañas"],
    consejo:
      "Si en tu ciudad baja mucho de 0 °C, cambia la parka por la del plan de noche muy fría.",
    preferir: { "torso-0": "aislante", "torso-1": "fleece" },
    outfit: {
      cabeza: ["ac-sw-merino-beanie", null],
      torso: ["ais-columbia-karis-long", "fl-columbia-benton-col", "ts-sw-allseason"],
      manos: ["gl-tnf-etip"],
      piernas: [null, "ti-rei-midweight"],
    },
    notas: { "piernas-0": "Tus jeans de siempre", "cabeza-1": "No hace falta" },
  },
  {
    id: "fiordos",
    nombre: "Caminata en montaña",
    corto: "Montaña",
    icono: "montana",
    explicacion:
      "Vas a caminar horas y vas a sudar. El reto no es el frío sino no empaparte por dentro: necesitas capas que respiren y que puedas abrir.",
    medidores: { abrigo: 2, agua: 2, movimiento: 3 },
    necesitas: ["Térmica que seque rápido", "Polar ligero que respire", "Impermeable con ventilas", "Pantalón impermeable"],
    dejar: ["Parka gruesa: te hará sudar", "Pantalón de nieve", "Algodón: se queda mojado"],
    consejo:
      "Al detenerte en un mirador te enfrías rápido: lleva en la mochila una chamarra de plumas ligera, como la REI 650 Down, que se guarda en su propio bolsillo.",
    preferir: { "torso-0": "shell", "torso-1": "fleece" },
    outfit: {
      cabeza: ["ac-sw-headband", null],
      torso: ["sh-rei-xerocloud", "fl-rei-flash", "ts-sw-thermal-qz"],
      manos: ["gl-sw-active-fleece"],
      piernas: ["pt-boulder-stratus", "ti-rei-merino185"],
    },
    notas: { "cabeza-1": "Opcional si hay viento" },
  },
  {
    id: "auroras",
    nombre: "Noche muy fría",
    corto: "Noche fría",
    icono: "aurora",
    explicacion:
      "Vas a estar horas quieta, de noche, en el momento más frío del día. Aquí sí va lo más abrigador: si no te mueves, tu cuerpo casi no genera calor.",
    medidores: { abrigo: 3, agua: 1, movimiento: 1 },
    necesitas: ["Térmicas de merino arriba y abajo", "Parka larga de plumas", "Pantalón de nieve", "Manoplas, gorro y pasamontañas"],
    dejar: ["Guantes delgados solos", "Chamarra impermeable delgada como capa exterior"],
    consejo:
      "Si sudas en el camino al punto de observación, cámbiate la térmica antes de quedarte quieta. La humedad es lo que más enfría.",
    preferir: { "torso-0": "aislante", "torso-1": "fleece" },
    outfit: {
      cabeza: ["ac-sw-isto", "ac-sw-balaclava"],
      torso: ["ais-rei-stormhenge-parka", "fl-columbia-fireside", "ts-sw-thermal-crew"],
      manos: ["gl-gordini-aquabloc-mitts"],
      piernas: ["pt-patagonia-powdertown", "ti-sw-thermal"],
    },
    notas: {},
  },
  {
    id: "lluvia",
    nombre: "Lluvia y aguanieve",
    corto: "Lluvia",
    icono: "lluvia",
    explicacion:
      "Cerca de 0 °C con lluvia o aguanieve: mojarse es lo que más enfría. Todo lo de afuera tiene que ser impermeable, y lo de en medio, sintético.",
    medidores: { abrigo: 2, agua: 3, movimiento: 2 },
    necesitas: ["Impermeable larga", "Pantalón de lluvia", "Aislante sintético", "Gorro impermeable"],
    dejar: ["Plumas sin impermeable encima: pierden calor al mojarse", "Algodón y jeans: tardan en secar"],
    consejo: "En ciudades lluviosas este será casi tu outfit diario: prioriza la impermeable larga.",
    preferir: { "torso-0": "shell", "torso-1": "aislante" },
    outfit: {
      cabeza: ["ac-marmot-haypress", null],
      torso: ["sh-cotopaxi-cielo-trench", "ais-rei-microtrek", "ts-sw-allseason"],
      manos: ["gl-sealskinz-witton"],
      piernas: ["pt-boulder-stratus", "ti-rei-midweight"],
    },
    notas: { "cabeza-1": "No hace falta" },
  },
];

export const MEDIDORES = [
  ["abrigo", "Abrigo"],
  ["agua", "Agua y viento"],
  ["movimiento", "Movimiento"],
];
export const NIVEL_TEXTO = { 1: "Poco", 2: "Medio", 3: "Mucho" };
