const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("FUNCIONANDO");
});

const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

const PORT = 4000;

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});