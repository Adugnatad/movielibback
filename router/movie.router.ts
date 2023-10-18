import express from "express";
import { Request, Response, NextFunction } from "express";
import * as movieController from "../controllers/movie";
import { verifyToken } from "../config.ts/jwtToken";

const movie_routes = express.Router();

movie_routes.use((req: Request, res: Response, next: NextFunction) => {
  console.log("movie route called");
  next();
});

movie_routes
  .get("/", verifyToken, movieController.getMovies)
  .post("/", verifyToken, movieController.postMovie)
  .put("/:id", verifyToken, movieController.updateMovie)
  .delete("/:id", verifyToken, movieController.deleteMovieId);

export default movie_routes;
