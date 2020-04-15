/**
 * @jest-environment node
 */
const wasm = require("../pkg/index.js");

describe("chrono", () => {
  it("hour diff", () => {
    let diffs: any = {};
    for (let y = 0; y <= 2020; y++) {
      const d = new Date();
      d.setFullYear(y);
      d.setHours(13);
      const expected = String(d.getHours());
      const actual = wasm.format_strftime("%H", d.getTime());
      if (actual !== expected) {
        const key = String(parseInt(expected, 10) - parseInt(actual, 10));
        const dif = diffs[key] || (diffs[key] = { ranges: [] });
        const range = dif.ranges.find((r) => y >= r[0] && y <= r[1] + 1);
        if (range) {
          range[1] = y;
        } else {
          dif.ranges.push([y, y]);
        }
      }
    }
    console.log(JSON.stringify(diffs, null, "  "));
    expect(Object.keys(diffs).length).toBe(0);
  });
});
