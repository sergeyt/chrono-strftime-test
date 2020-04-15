extern crate chrono;

use wasm_bindgen::prelude::*;
use chrono::prelude::*;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn format_strftime(format: &str, timestamp: f64) -> String {
    let off = Local::now().offset().fix();
    let d = off.timestamp_millis(timestamp as i64);
    return d.format(format).to_string();
}
