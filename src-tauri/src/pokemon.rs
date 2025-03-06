use rustemon::client::RustemonClient;
use rustemon::error::Error;
use rustemon::model::pokemon::{Pokemon, PokemonSpecies};
use rustemon::games::generation;
use rustemon::pokemon::{pokemon, pokemon_species};

use crate::model::{PokemonGeneration, PokemonData};

async fn fetch_pokemon_data(id: i64, client: &RustemonClient) -> Result<Pokemon, Error> {
    match pokemon::get_by_id(id, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon_species(name: &str, client: &RustemonClient) -> Result<PokemonSpecies, Error> {
    match pokemon_species::get_by_name(name, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

pub async fn fetch_pokemon_by_generation(generation_info: &PokemonGeneration<'_>) -> Result<Vec<PokemonData>, Error> {
    let client = RustemonClient::default();

    let pokemon_list =
        match generation::get_by_name(generation_info.name, &client).await {
            Ok(list) => list,
            Err(e) => return Err(e),
        };

    let mut pokemon_detail_list = Vec::new();

    for pokemon_creature in pokemon_list.pokemon_species {
        let species = fetch_pokemon_species(&pokemon_creature.name, &client).await?;
        let pokemon = fetch_pokemon_data(species.id, &client).await?;
        let genera = species.genera.iter().find(|x| x.language.name == "en").unwrap().clone();
        let flavor_text_entry = species.flavor_text_entries.iter().find(|x| x.language.name == "en").unwrap().clone();
        let pokemon_type = pokemon.types.iter().map(|x| x.type_.name.clone()).collect();

        let pokemon_data = PokemonData {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            species: genera.genus,
            pokemon_type: pokemon_type,
            image_url: pokemon.sprites.front_default,
            flavor_text: flavor_text_entry.flavor_text,
            generation: generation_info.generation,
        };

        pokemon_detail_list.push(pokemon_data);
    }

    pokemon_detail_list.sort_by(|a, b| a.id.cmp(&b.id));

    Ok(pokemon_detail_list)
}
