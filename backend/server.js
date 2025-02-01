const express = require("express");
const cors =  require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tenant", require("./routes/tenantRoutes"));
app.use("/api/lease", require("./routes/LeaseRoutes"));


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));