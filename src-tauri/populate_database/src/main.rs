use dotenv::dotenv;

use supabase_rs::SupabaseClient;

use std::{env::var, error::Error};

mod model;
use model::POKEMON_GENERATIONS;

mod pokemon;
use pokemon::fetch_pokemon_by_generation;

#[tokio::main]
async fn main() {
    if let Err(e) = insert_pokemon().await {
        eprintln!("Error inserting Pokémon: {}", e);
    }
}

pub async fn insert_pokemon() -> Result<(), Box<dyn Error>> {
    dotenv().ok();

    let supabase_url = var("SUPABASE_URL").expect("SUPABASE_URL not set");
    let supabase_public_api_key =
        var("SUPABASE_PUBLIC_API_KEY").expect("SUPABASE_PUBLIC_API_KEY not set");

    let table_name = "pokemon";

    let supabase_client: SupabaseClient =
        SupabaseClient::new(supabase_url, supabase_public_api_key);

    let mut pokemon_list = Vec::new();

    for pokemon_generation_info in POKEMON_GENERATIONS {
        let pokemon = fetch_pokemon_by_generation(pokemon_generation_info).await?;

        pokemon_list.extend(pokemon);
    }

    let _response = supabase_client
        .bulk_insert(table_name, pokemon_list)
        .await;

    Ok(())
}