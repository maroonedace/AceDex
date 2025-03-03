use rustemon::client::{CACacheManager, CacheMode, MokaManager, RustemonClient, RustemonClientBuilder};
use rustemon::error::Error;
use rustemon::model::pokemon::{Pokemon, PokemonSpecies};
use rustemon::games::generation;
use rustemon::pokemon::{pokemon, pokemon_species};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct PokemonData {
    id: i64,
    name: String,
    height: i64,
    weight: i64,
    species: String,
    pokemon_type: String,
    image_url: Option<String>,
    flavor_text: String,
}

async fn fetch_pokemon_data(name: &str, client: &RustemonClient) -> Result<Pokemon, Error> {
    match pokemon::get_by_name(name, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon_species(id: i64, client: &RustemonClient) -> Result<PokemonSpecies, Error> {
    match pokemon_species::get_by_id(id, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon_by_generation(generation: &str) -> Result<Vec<PokemonData>, Error> {
    let client = RustemonClientBuilder::default()
        .with_manager(MokaManager::default())
        // .with_mode(CacheMode::NoCache)
        .try_build()
        .unwrap();



    let pokemon_list =
        match generation::get_by_name(generation, &client).await {
            Ok(list) => list,
            Err(e) => return Err(e),
        };

    let mut pokemon_detail_list = Vec::new();

    for item in pokemon_list.pokemon_species {
        let pokemon = fetch_pokemon_data(&item.name, &client).await?;
        let species = fetch_pokemon_species(pokemon.id, &client).await?;
        let species_name = species.genera[7].genus.clone();

        let pokemon_data = PokemonData {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            species: species_name,
            pokemon_type: pokemon.types[0].type_.name.clone(),
            image_url: pokemon.sprites.front_default,
            flavor_text: species.flavor_text_entries[0].flavor_text.clone(),
        };

        pokemon_detail_list.push(pokemon_data);
    }

    pokemon_detail_list.sort_by(|a, b| a.id.cmp(&b.id));

    Ok(pokemon_detail_list)
}

#[tauri::command]
pub async fn get_pokemon_by_generation(generation: &str) -> Result<Vec<PokemonData>, String> {
    match fetch_pokemon_by_generation(generation).await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
