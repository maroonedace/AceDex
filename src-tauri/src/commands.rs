
use dotenv::dotenv;

use supabase_rs::SupabaseClient;

use std::{env::var, error::Error};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct EvolvesFrom {
    name: String,
    image_url: String,
}

#[derive(Serialize, Deserialize)]
pub struct PokemonData {
    id: i64,
    name: String,
    height: f32,
    weight: f32,
    species: String,
    pokemon_type: Vec<String>,
    image_url: String,
    flavor_text: String,
    generation: i8,
    evolves_from: EvolvesFrom
}


pub async fn fetch_pokemon(generation: i8) -> Result<Vec<PokemonData>, Box<dyn Error>> {
    dotenv().ok();

    let supabase_url = var("SUPABASE_URL").expect("SUPABASE_URL not set");
    let supabase_public_api_key =
        var("SUPABASE_PUBLIC_API_KEY").expect("SUPABASE_PUBLIC_API_KEY not set");

    let table_name = "pokemon";

    let supabase_client: SupabaseClient =
        SupabaseClient::new(supabase_url, supabase_public_api_key);

    let response = supabase_client
        .select(table_name)
        .eq("generation", &generation.to_string())
        .execute()
        .await?;

    let pokemon: Vec<PokemonData> = response
        .iter()
        .map(|value| serde_json::from_value(value.clone()))
        .collect::<Result<Vec<PokemonData>, _>>()?;

    Ok(pokemon)
}

#[tauri::command]
pub async fn get_pokemon_by_generation(generation: i8) -> Result<Vec<PokemonData>, String> {
    match fetch_pokemon(generation).await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
