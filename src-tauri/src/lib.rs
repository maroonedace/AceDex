mod commands;
mod pokemon;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![commands::get_recipes, pokemon::get_pokemon])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
