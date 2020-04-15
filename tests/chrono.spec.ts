/**
 * @jest-environment node
 */
import _ from "lodash";
const wasm = require("../pkg/index.js");

describe("chrono", () => {
  it("hour diff", () => {
    let diff: any = {};
    for (let y = 0; y <= 2020; y++) {
      const d = new Date();
      d.setFullYear(y);
      d.setHours(13);
      const expected = String(d.getHours());
      const actual = wasm.format_strftime("%H", d.getTime());
      if (actual !== expected) {
        const d = parseInt(expected, 10) - parseInt(actual, 10);
        const key = String(d);
        if (!diff[key]) {
          diff[key] = { ranges: [] };
        }
        const range = _.find(
          diff[key].ranges,
          (r) => y >= r[0] && y <= r[1] + 1
        );
        if (range) {
          range[1] = y;
        } else {
          diff[key].ranges.push([y, y]);
        }
      }
    }
    console.log(JSON.stringify(diff, null, "  "));
    expect(Object.keys(diff).length).toBe(0);
  });
});
