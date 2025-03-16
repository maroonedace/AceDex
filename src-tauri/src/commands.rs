use dotenv::dotenv;

use supabase_rs::SupabaseClient;

use std::{error::Error};

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct PreviousEvolution {
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
    previous_evolution: PreviousEvolution,
}

pub async fn fetch_pokemon(generation: i8) -> Result<Vec<PokemonData>, Box<dyn Error>> {
    dotenv().ok();

    let supabase_url = String::from("https://obeotyhcyygcqyuqbblp.supabase.co");
    let supabase_public_api_key = String::from("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iZW90eWhjeXlnY3F5dXFiYmxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4Njg0ODEsImV4cCI6MjA1NDQ0NDQ4MX0.D9_E2PV5dHFT_U0gxNvXeiNxOep_zPvkNKi-mifn2_Y");

    let table_name = "pokemon";

    let supabase_client: SupabaseClient = SupabaseClient::new(
        supabase_url,
        supabase_public_api_key,
    );

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
