import jsonServer from "json-server";
import cors from "cors";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

const rules = auth.rewriter({
  "/users/:userId": "/users?id=:userId",
  "/products/:slug": "/products?slug=:slug",
});

server.use(cors());
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port} with authentication`);
});
