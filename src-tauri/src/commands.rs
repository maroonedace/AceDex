use aws_sdk_s3::presigning::PresigningConfig;
use aws_sdk_s3::Client as S3Client;
use aws_config;
use dotenv::dotenv;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{env, error::Error};
use std::time::Duration;

#[derive(Serialize, Deserialize, Debug)]
pub struct TableRow {
    id: i8,
    name: String,
    created_at: String,
    ingredients: Vec<String>,
    instructions: String,
    image_url: String,
}

pub async fn fetch_s3_request(key: String) -> Result<String, Box<dyn Error>> {
    let config = aws_config::load_from_env().await;
    let client = S3Client::new(&config);

    let presigned_request = client
        .get_object()
        .bucket("maroonedace-recipes")
        .key(key)
        .presigned(PresigningConfig::expires_in(Duration::from_secs(3600))?) // Expires in 1 hour
        .await?;

    Ok(presigned_request.uri().to_string())
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
        .send()
        .await?;

    if response.status().is_success() {
        let mut data: Vec<TableRow> = response.json().await?;

        for item in &mut data {
            item.image_url = fetch_s3_request(item.image_url.clone()).await?;
        }

        Ok(data)
    } else {
        Err(format!("Failed to fetch data: {}", response.status()).into())
    }
}

#[tauri::command]
pub async fn get_data() -> Result<Vec<TableRow>, String> {
    match fetch_supabase_data().await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
