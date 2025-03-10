type EvolvesFrom = {
    name: string,
    image_url: string
}

export type Pokemon = {
    id: number,
    name: string,
    height: number,
    weight: number,
    species: string,
    pokemon_type: string[],
    image_url: string,
    flavor_text: string,
    evolves_from: EvolvesFrom,
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