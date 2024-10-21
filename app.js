const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const goatRoutes = require("./routes/goats");
const careRoutes = require("./routes/cares");
const userRoutes = require("./routes/user");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/v1/auth", authRoutes);
app.use("/v1/goats", goatRoutes);
app.use("/v1/cares", careRoutes);
app.use("/v1/users", userRoutes);
app.use("/v1/kandang", require("./routes/kandang"));
app.use("/v1/induk-betina", require("./routes/indukan"));
app.use("/v1/induk-pejantan", require("./routes/pejantan"));
app.use("/v1/perkawinan", require("./routes/perkawinan"));
app.use("/v1/pertumbuhan-kambing", require("./routes/pertumbuhan"));
app.use("/v1/pemerahan-kambing", require("./routes/pemerahan"));
app.use("/v1/kesehatan-kambing", require("./routes/kesehatan"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync({ alter: true });
});
