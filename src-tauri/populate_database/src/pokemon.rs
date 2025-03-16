use rustemon::client::{CacheMode, MokaManager, RustemonClient, RustemonClientBuilder};
use rustemon::error::Error;
use rustemon::games::generation;
use rustemon::model::pokemon::{Pokemon, PokemonSpecies};
use rustemon::pokemon::{pokemon, pokemon_species};

use crate::model::{PreviousEvolution, PokemonData, PokemonGeneration};

fn format_flavor_text(text: &str) -> String {
    let clean_text = text.replace("\n", " ").replace("\x0c", " ");

    let sentences: Vec<String> = clean_text
        .split('.')
        .filter(|s| !s.trim().is_empty())
        .map(|sentence| {
            let sentence = sentence.trim().to_lowercase();
            let mut chars = sentence.chars();
            match chars.next() {
                Some(first) => first.to_uppercase().collect::<String>() + chars.as_str(),
                None => String::new(),
            }
        })
        .collect();

    let flavor_text = sentences.join(". ") + ".";

    flavor_text.replace("pokémon", "Pokémon")
}

async fn fetch_pokemon_data(id: i64, client: &RustemonClient) -> Result<Pokemon, Error> {
    match pokemon::get_by_id(id, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon_species(
    name: &str,
    client: &RustemonClient,
) -> Result<PokemonSpecies, Error> {
    match pokemon_species::get_by_name(name, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

pub async fn fetch_pokemon_by_generation(
    generation_info: &PokemonGeneration<'_>,
) -> Result<Vec<PokemonData>, Error> {
    let client = RustemonClientBuilder::default()
        .with_mode(CacheMode::NoStore)
        .with_manager(MokaManager::default())
        .try_build()
        .unwrap();

    let pokemon_list = match generation::get_by_name(generation_info.name, &client).await {
        Ok(list) => list,
        Err(e) => return Err(e),
    };

    let mut pokemon_detail_list = Vec::new();

    for pokemon_creature in pokemon_list.pokemon_species {
        let species = fetch_pokemon_species(&pokemon_creature.name, &client).await?;
        let pokemon = fetch_pokemon_data(species.id, &client).await?;
        let genera = species
            .genera
            .iter()
            .find(|x| x.language.name == "en")
            .unwrap()
            .clone();
        let flavor_text_entry = species
            .flavor_text_entries
            .iter()
            .find(|x| x.language.name == "en")
            .unwrap()
            .clone();

        let flavor_text = format_flavor_text(&flavor_text_entry.flavor_text);

        let height = pokemon.height as f32 / 10.0;
        let weight = pokemon.weight as f32 / 10.0;

        let pokemon_type = pokemon.types.iter().map(|x| x.type_.name.clone()).collect();

        let evolves_from_name = species
            .evolves_from_species
            .map(|s| s.name)
            .unwrap_or_default();

        let evolves_from_pokemon = if evolves_from_name.is_empty() {
            Pokemon::default()
        } else {
            let evolves_species = fetch_pokemon_species(&evolves_from_name, &client).await?;
            fetch_pokemon_data(evolves_species.id, &client).await?
        };

        let pokemon_data = PokemonData {
            id: pokemon.id,
            name: pokemon.name,
            height: height,
            weight: weight,
            species: genera.genus,
            pokemon_type: pokemon_type,
            image_url: pokemon.sprites.front_default.unwrap_or_default(),
            flavor_text: flavor_text,
            generation: generation_info.generation,
            previous_evolution: PreviousEvolution {
                name: evolves_from_pokemon.name,
                image_url: evolves_from_pokemon.sprites.front_default.unwrap_or_default(),
            },
        };

        pokemon_detail_list.push(pokemon_data);
    }

    pokemon_detail_list.sort_by(|a, b| a.id.cmp(&b.id));

    Ok(pokemon_detail_list)
}
