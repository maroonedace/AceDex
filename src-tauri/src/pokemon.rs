use rustemon::pokemon::pokemon;
use rustemon::model::pokemon::Pokemon;
use rustemon::client::RustemonClient;
use rustemon::error::Error;


async fn fetch_pokemon_data(name: &str, client: &RustemonClient) -> Result<Pokemon, Error> {
    match pokemon::get_by_name(name, &client).await {
        Ok(pokemon_details) => Ok(pokemon_details),
        Err(e) => Err(e),
    }
}

async fn fetch_pokemon() -> Result<Vec<Pokemon>, Error> {
    let client = RustemonClient::default();

    let pokemon_list = match pokemon::get_page(&client).await {
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
pub async fn get_pokemon() -> Result<Vec<Pokemon>, String> {
    match fetch_pokemon().await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
