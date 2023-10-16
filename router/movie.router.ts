import express from "express";
import { Request, Response, NextFunction } from "express";
import * as movieController from "../controllers/movie";

const movie_routes = express.Router();

movie_routes.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

movie_routes
  .get("/", movieController.getMovies)
  .post("/", movieController.postMovie);
movie_routes
  .put("/:id", movieController.updateMovie)
  .delete("/:id", movieController.deleteMovieId);

export default movie_routes;
