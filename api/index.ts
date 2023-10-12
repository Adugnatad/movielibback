import "dotenv/config";
import express from "express";
import * as movieController from "../controllers/movie";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
app.post("/movie", movieController.postMovie);
app.get("/movie", movieController.getMovies);
app.put("/movie/:id", movieController.updateMovie);
app.delete("/movie/:id", movieController.deleteMovieId);

app.use((req, res) => {
  res.status(405).send();
});

app.listen(3000, () => {
  console.log(`
    🚀 Server ready at: http://localhost:3000`);
});

export default app;
