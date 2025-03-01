use rustemon::model::resource::NamedApiResourceList;
use rustemon::pokemon::pokemon;
use rustemon::client::RustemonClient;
use rustemon::error::Error;
use rustemon::model::pokemon::Pokemon;

async fn fetch_pokemon() -> Result<NamedApiResourceList<Pokemon>, Error> {
    let client = RustemonClient::default();

    match pokemon::get_page(&client).await {
        Ok(pokemon) => Ok(pokemon),
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub async fn get_pokemon() -> Result<NamedApiResourceList<Pokemon>, String> {
    match fetch_pokemon().await {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Error fetching data: {}", e)),
    }
}
