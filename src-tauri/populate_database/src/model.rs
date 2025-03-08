use serde::{Deserialize, Serialize};

pub struct PokemonGeneration<'a> {
    pub name: &'a str,
    pub generation: i8,
}

#[derive(Serialize, Deserialize)]
pub struct PokemonData {
    pub id: i64,
    pub name: String,
    pub height: i64,
    pub weight: i64,
    pub species: String,
    pub pokemon_type: Vec<String>,
    pub image_url: Option<String>,
    pub flavor_text: String,
    pub generation: i8,
}

pub static POKEMON_GENERATIONS: &[PokemonGeneration] = &[
    PokemonGeneration {
        name: "generation-i",
        generation: 1,
    },
    PokemonGeneration {
        name: "generation-ii",
        generation: 2,
    },
    PokemonGeneration {
        name: "generation-iii",
        generation: 3,
    },
    PokemonGeneration {
        name: "generation-iv",
        generation: 4,
    },
    PokemonGeneration {
        name: "generation-v",
        generation: 5,
    },
    PokemonGeneration {
        name: "generation-vi",
        generation: 6,
    },
    PokemonGeneration {
        name: "generation-vii",
        generation: 7,
    },
    PokemonGeneration {
        name: "generation-viii",
        generation: 8,
    },
    PokemonGeneration {
        name: "generation-ix",
        generation: 9,
    },
];