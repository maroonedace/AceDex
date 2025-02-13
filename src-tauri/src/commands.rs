use aws_config;
use aws_sdk_s3::presigning::PresigningConfig;
use aws_sdk_s3::Client as S3Client;

use dotenv::dotenv;

use supabase_rs::SupabaseClient;

use serde::{Deserialize, Serialize};
use std::time::Duration;
use std::{env::var, error::Error};

#[derive(Serialize, Deserialize, Debug, Ord, PartialOrd, Eq, PartialEq)]
pub struct Recipe {
    id: i8,
    name: String,
    created_at: String,
    ingredients: Vec<String>,
    instructions: Vec<String>,
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

    let supabase_url = var("SUPABASE_URL").expect("SUPABASE_URL not set");
    let supabase_public_api_key =
        var("SUPABASE_PUBLIC_API_KEY").expect("SUPABASE_PUBLIC_API_KEY not set");

    let table_name = "recipes";

    let supabase_client: SupabaseClient =
        SupabaseClient::new(supabase_url, supabase_public_api_key);

    let response = supabase_client.select(table_name).execute().await?;

    let mut recipes: Vec<Recipe> = response
        .iter()
        .map(|value| serde_json::from_value(value.clone()))
        .collect::<Result<Vec<Recipe>, _>>()?;

    if !recipe_type.is_empty() {
        recipes = recipes
            .into_iter()
            .filter(|row| row.recipe_type.contains(&recipe_type))
            .collect();
    }

    for item in &mut recipes {
        item.image_url = fetch_s3_images(item.image_url.clone()).await?;
    }

    recipes.sort_by(|a, b| a.name.cmp(&b.name));

    Ok(recipes)
}

#[tauri::command]
pub async fn get_recipes(recipe_type: String) -> Result<Vec<Recipe>, String> {
    match fetch_recipes(recipe_type).await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
