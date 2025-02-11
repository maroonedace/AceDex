use aws_config;
use aws_sdk_s3::presigning::PresigningConfig;
use aws_sdk_s3::Client as S3Client;
use dotenv::dotenv;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::time::Duration;
use std::{env, error::Error};

#[derive(Serialize, Deserialize, Debug, Ord, PartialOrd, Eq, PartialEq)]
pub struct Recipe {
    id: i8,
    name: String,
    created_at: String,
    ingredients: Vec<String>,
    instructions: String,
    image_url: String,
    recipe_type: String,
}

pub async fn fetch_s3_images(key: String) -> Result<String, Box<dyn Error>> {
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

pub async fn fetch_recipes(recipe_type: String) -> Result<Vec<Recipe>, Box<dyn Error>> {
    dotenv().ok();

    let supabase_public_api_key = env::var("SUPABASE_PUBLIC_API_KEY").unwrap();
    let supabase_url = env::var("SUPABASE_URL").unwrap();
    let table_name = "recipes";

    let supabase_url = &format!("{}/rest/v1/{}", supabase_url, table_name);

    let client = Client::new();
    let response = client
        .get(supabase_url)
        .header("apikey", &supabase_public_api_key)
        .send()
        .await?;

    if response.status().is_success() {
        let mut data: Vec<Recipe> = response.json().await?;

        if !&recipe_type.is_empty() {
            data = data
                .into_iter()
                .filter(|row| row.recipe_type.contains(&recipe_type))
                .collect();
        }

        for item in &mut data {
            item.image_url = fetch_s3_images(item.image_url.clone()).await?;
        }

        data.sort_by(|a, b| a.name.cmp(&b.name));

        Ok(data)
    } else {
        Err(format!("Failed to fetch data: {}", response.status()).into())
    }
}

#[tauri::command]
pub async fn get_recipes(recipe_type: String) -> Result<Vec<Recipe>, String> {
    match fetch_recipes(recipe_type).await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
