const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orders");
const { swaggerUi, swaggerSpec } = require("./utils/swagger");

const app = express();
const PORT = 8200;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/ays-svc", orderRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/check-alive", (req, res) => {
  res.send("I'm alive");
});

app.listen(PORT, () =>
  console.log(
    `Server running at http://localhost:${PORT}\nSwagger: http://localhost:${PORT}/api-docs`
  )
);
