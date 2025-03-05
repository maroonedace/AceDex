use dotenv::dotenv;

use supabase_rs::SupabaseClient;

use std::{env::var, error::Error};

use serde_json::json;

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

    let _response = supabase_client.insert(table_name, json!({
        "id": 1,
    })).await;

    Ok(())
}