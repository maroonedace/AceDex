use rustemon::client::{CacheMode, RustemonClient, RustemonClientBuilder, MokaManager};
use rustemon::error::Error;
use rustemon::model::pokemon::Pokemon;
use rustemon::pokemon::pokemon;

async fn fetch_pokemon_data(name: &str, client: &RustemonClient) -> Result<Pokemon, Error> {
    match pokemon::get_by_name(name, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon(index: i64) -> Result<Vec<Pokemon>, Error> {
    let client = RustemonClientBuilder::default()
        .with_manager(MokaManager::default())
        .with_mode(CacheMode::NoStore)
        .try_build()
        .unwrap();
    let pokemon_limit = 25;

    let pokemon_list =
        match pokemon::get_page_with_param(index * pokemon_limit, pokemon_limit, &client).await {
            Ok(list) => list,
            Err(e) => return Err(e),
        };

    let mut pokemon_detail_list = Vec::new();

    for item in pokemon_list.results {
        let pokemon = fetch_pokemon_data(&item.name, &client).await?;
        pokemon_detail_list.push(pokemon);
    }

    Ok(pokemon_detail_list)
}

#[tauri::command]
pub async fn get_pokemon(index: i64) -> Result<Vec<Pokemon>, String> {
    match fetch_pokemon(index).await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
