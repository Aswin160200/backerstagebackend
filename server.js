const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const investorRoutes = require("./routes/investorRoutes");
const userRoutes = require("./routes/userRoutes");
const subscriptionRoutes = require("./routes/subscriptionRouters");
const coproducersRoutes = require("./routes/coProducersRoutes");
const projectCostRoutes = require("./routes/projectsCostRoutes");
const distributionRoutes = require("./routes/distributionsRoutes");
const documentsRoutes = require("./routes/documentsRoutes");
const watermarkedDocumentsRoutes = require("./routes/watermarkedDocumentRoutes");
const partysProjectRoutes = require("./routes/partyProjectRoutes");
const notesRoutes = require("./routes/notesRoutes");
const loginRoutes = require("./routes/loginRoutes")
const app = express();

app.use(cors());

app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/investors", investorRoutes);
app.use("/users", userRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/coproducers", coproducersRoutes);
app.use("/projectscost", projectCostRoutes);
app.use("/distributions", distributionRoutes);
app.use("/documents", documentsRoutes);
app.use("/watermarked-documents", watermarkedDocumentsRoutes);
app.use("/partysprojects", partysProjectRoutes);
app.use("/notes", notesRoutes);
app.use("/login", loginRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));