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
    bg: string,
    imagebg: string,
    textbg: string
}

export const pokemonColors: Record<string, PokemonColors> = {
    fire: {
        bg: "bg-orange-500",
        imagebg: "bg-orange-300",
        textbg: "bg-orange-200"
    },
    water: {
        bg: "bg-blue-500",
        imagebg: "bg-blue-300",
        textbg: "bg-blue-200"
    },
    grass: {
        bg: "bg-green-500",
        imagebg: "bg-green-300",
        textbg: "bg-green-200"
    },
    electric: {
        bg: "bg-yellow-500",
        imagebg: "bg-yellow-300",
        textbg: "bg-yellow-200"
    },
    psychic: {
        bg: "bg-purple-500",
        imagebg: "bg-purple-300",
        textbg: "bg-purple-200"
    },
    ice: {
        bg: "bg-blue-200",
        imagebg: "bg-blue-100",
        textbg: "bg-blue-50"
    },
    dragon: {
        bg: "bg-red-500",
        imagebg: "bg-red-300",
        textbg: "bg-red-200"
    },
    dark: {
        bg: "bg-gray-500",
        imagebg: "bg-gray-300",
        textbg: "bg-gray-200"
    },
    steel: {
        bg: "bg-gray-500",
        imagebg: "bg-gray-300",
        textbg: "bg-gray-200"
    },
    fairy: {
        bg: "bg-pink-500",
        imagebg: "bg-pink-300",
        textbg: "bg-pink-200"
    },
    normal: {
        bg: "bg-gray-500",
        imagebg: "bg-gray-300",
        textbg: "bg-gray-200"
    },
    fighting: {
        bg: "bg-red-500",
        imagebg: "bg-red-300",
        textbg: "bg-red-200"
    },
    flying: {
        bg: "bg-blue-500",
        imagebg: "bg-blue-300",
        textbg: "bg-blue-200"
    },
    poison: {
        bg: "bg-purple-500",
        imagebg: "bg-purple-300",
        textbg: "bg-purple-200"
    },
    ground: {
        bg: "bg-yellow-500",
        imagebg: "bg-yellow-300",
        textbg: "bg-yellow-200"
    },
    bug: {
        bg: "bg-green-500",
        imagebg: "bg-green-300",
        textbg: "bg-green-200"
    },
    rock: {
        bg: "bg-yellow-500",
        imagebg: "bg-yellow-300",
        textbg: "bg-yellow-200"
    },
    ghost: {
        bg: "bg-purple-500",
        imagebg: "bg-purple-300",
        textbg: "bg-purple-200"
    },
}