use dotenv::dotenv;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{env, error::Error};

#[derive(Serialize, Deserialize, Debug)]
pub struct TableRow {
    id: i8,
    created_at: String
}

// Fetch data from Supabase
pub async fn fetch_supabase_data() -> Result<Vec<TableRow>, Box<dyn Error>> {
    dotenv().ok();

    let supabase_public_api_key = env::var("SUPABASE_PUBLIC_API_KEY").unwrap();
    let supabase_url = env::var("SUPABASE_URL").unwrap();
    let table_name = "cocktails";

    let supabase_url = &format!("{}/rest/v1/{}", supabase_url, table_name);

    let client = Client::new();
    let response = client
        .get(supabase_url)
        .header("apikey", &supabase_public_api_key)
        .header(
            "Authorization",
            format!("Bearer {}", &supabase_public_api_key),
        )
        .header("Accept", "application/json")
        .send()
        .await?;

    if response.status().is_success() {
        let data = response.json().await?;
        Ok(data)
    } else {
        Err(format!("Failed to fetch data: {}", response.status()).into())
    }
}

#[tauri::command]
pub async fn get_data() -> Result<Vec<TableRow>, String> {
    match fetch_supabase_data().await {
        Ok(data) => {
            Ok(data)
        }
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
