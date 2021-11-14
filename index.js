const app = require("./app")
const {PORT} = process.env;

app.listen(PORT , () => console.log(`ser is running at port ${PORT}...`));