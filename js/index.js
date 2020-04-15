import("../pkg/index.js")
  .then((module) => {
    const now = new Date(Date.now());
    const s = module.format_strftime("%Y-%m-%d %H:%M:%S", now.getTime());
    console.log(s);
  })
  .catch(console.error);
