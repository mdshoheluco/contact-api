import express from "express";
import dbConnect from "./config/dbConnect";
import AuthRoute from "./routes/Auth";
import UsersRoute from "./routes/Users";
import ContactsRoute from "./routes/Contacts";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT | 3000;

// Swagger config
const options = {
  swaggerDefinition: {
    basepath: "http://localhost:3000",
    info: {
      title: "Contact Keeper API",
      description: "An API to keep track of your contacts",
      contact: {
        name: "Contact Keeper",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "development server",
        },
        {
          url: "http://localhost:3000/qa",
          description: "QA server",
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);

// Connect to the database
dbConnect();
const app = express();

app.use(express.json({ extended: false }));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/contacts", ContactsRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
