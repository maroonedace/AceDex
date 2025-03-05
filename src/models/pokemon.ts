export type Pokemon = {
    id: number,
    name: string,
    height: number,
    weight: number,
    species: string,
    pokemon_type: string[],
    image_url: string,
    flavor_text: string,
}

type PokemonGenerations = {
    label: string,
    value: string
}

export const pokemonGenerations: PokemonGenerations[] = [
    {
        label: "Generation 1",
        value: "generation-i"
    },
    {
        label: "Generation 2",
        value: "generation-ii"
    },
    {
        label: "Generation 3",
        value: "generation-iii"
    },
    {
        label: "Generation 4",
        value: "generation-iv"
    },
    {
        label: "Generation 5",
        value: "generation-v"
    },
    {
        label: "Generation 6",
        value: "generation-vi"
    },
    {
        label: "Generation 7",
        value: "generation-vii"
    },
    {
        label: "Generation 8",
        value: "generation-viii"
    },
    {
        label: "Generation 9",
        value: "generation-ix"
    },
]

type PokemonColors = {
    cardBg: string,
    imageBg: string,
    textBg: string
}

export const pokemonColors: Record<string, PokemonColors> = {
    normal: {
        cardBg: "bg-[#A8A77A]",
        imageBg: "bg-[#8D8D64]",
        textBg: "bg-[#C6C6A7]",
      },
      fire: {
        cardBg: "bg-[#EE8130]",
        imageBg: "bg-[#C76A29]",
        textBg: "bg-[#F5AC78]",
      },
      water: {
        cardBg: "bg-[#6390F0]",
        imageBg: "bg-[#4A74D2]",
        textBg: "bg-[#9DB7F5]",
      },
      electric: {
        cardBg: "bg-[#F7D02C]",
        imageBg: "bg-[#C4A720]",
        textBg: "bg-[#FAE078]",
      },
      grass: {
        cardBg: "bg-[#7AC74C]",
        imageBg: "bg-[#5E9E3A]",
        textBg: "bg-[#A7DB8D]",
      },
      ice: {
        cardBg: "bg-[#96D9D6]",
        imageBg: "bg-[#6FB3B0]",
        textBg: "bg-[#BCE6E6]",
      },
      fighting: {
        cardBg: "bg-[#C22E28]",
        imageBg: "bg-[#A02520]",
        textBg: "bg-[#D67873]",
      },
      poison: {
        cardBg: "bg-[#A33EA1]",
        imageBg: "bg-[#822F81]",
        textBg: "bg-[#C183C1]",
      },
      ground: {
        cardBg: "bg-[#E2BF65]",
        imageBg: "bg-[#B89B50]",
        textBg: "bg-[#EBD69D]",
      },
      flying: {
        cardBg: "bg-[#A98FF3]",
        imageBg: "bg-[#8873CC]",
        textBg: "bg-[#C6B7F5]",
      },
      psychic: {
        cardBg: "bg-[#F95587]",
        imageBg: "bg-[#D13D68]",
        textBg: "bg-[#FA92B2]",
      },
      bug: {
        cardBg: "bg-[#A6B91A]",
        imageBg: "bg-[#849014]",
        textBg: "bg-[#C6D16E]",
      },
      rock: {
        cardBg: "bg-[#B6A136]",
        imageBg: "bg-[#8F7D29]",
        textBg: "bg-[#D1C17D]",
      },
      ghost: {
        cardBg: "bg-[#735797]",
        imageBg: "bg-[#5A4476]",
        textBg: "bg-[#A292BC]",
      },
      dragon: {
        cardBg: "bg-[#6F35FC]",
        imageBg: "bg-[#5429D1]",
        textBg: "bg-[#A27DFA]",
      },
      dark: {
        cardBg: "bg-[#705746]",
        imageBg: "bg-[#574236]",
        textBg: "bg-[#A29288]",
      },
      steel: {
        cardBg: "bg-[#B7B7CE]",
        imageBg: "bg-[#9090A6]",
        textBg: "bg-[#D1D1E0]",
      },
      fairy: {
        cardBg: "bg-[#D685AD]",
        imageBg: "bg-[#AE6E8A]",
        textBg: "bg-[#F4BDC9]",
      },
}