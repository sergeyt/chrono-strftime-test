extern crate chrono;

use wasm_bindgen::prelude::*;
use chrono::prelude::*;

#[wasm_bindgen]
pub fn format_strftime(format: &str, timestamp: f64) -> String {
    let off = Local::now().offset().fix();
    let d = off.timestamp_millis(timestamp as i64);
    return d.format(format).to_string();
}
