import { Request, Response } from "express";
import { Movie } from "../models";
import { check, validationResult } from "express-validator";

export const getMovies = async (req: Request, res: Response) => {
  const {
    name,
    rating,
    limit,
    orderBy = "createdAt",
    sortBy = "DESC",
  } = req.query;

  const movies: any = await Movie.findAll({
    order: [[orderBy.toString(), sortBy.toString()]],
  });

  let filteredMovies = movies;

  if (name) {
    filteredMovies = movies.filter(
      (movie: any) =>
        movie.movie_name.toLowerCase() === name.toString().toLowerCase()
    );
  }

  if (rating) {
    filteredMovies = filteredMovies.filter(
      (movie: any) => movie.rating == parseFloat(rating.toString())
    );
  }

  if (limit) {
    filteredMovies = await Movie.findAll({
      limit: parseInt(limit.toString()),
    });
  }
  res.status(200).json(filteredMovies);
};

export const postMovie = async (req: Request, res: Response) => {
  const { movie_name, duration, rating } = req.body;

  await check("movie_name", "Movie Name cannot be less than 2 characters")
    .isLength({ min: 2, max: 100 })
    .not()
    .isEmpty()
    .custom(async (value) => {
      const m = await Movie.findAll({
        where: {
          movie_name: value,
        },
      });
      console.log(m);
      if (m.length) {
        throw new Error("Movie name already in use");
      }
    })
    .run(req);
  await check("duration", "Duration is not valid")
    .isString()
    .custom((value) => {
      const durationRegex = /^(\d+(\.\d+)?h|\d+(\.\d+)?m)$/;

      if (!durationRegex.test(value || "")) {
        return false;
      }

      const numericValue = parseFloat(value || "");

      if (value?.endsWith("h")) {
        return numericValue >= 0.1 && numericValue <= 12;
      } else if (value?.endsWith("m")) {
        return numericValue >= 1 && numericValue <= 720;
      }

      return false;
    })
    .run(req);
  await check("rating", "Rating must be between 0 and 10")
    .isFloat({ min: 0, max: 10 })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }

  const mv = await Movie.create({
    movie_name,
    duration: duration.toString().endsWith("h")
      ? parseFloat(duration || "")
      : parseFloat(duration || "") / 60,
    rating,
  })
    .then((movie) => {
      res.status(200).json({ movie });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { movie_name, duration, rating } = req.body;

  await check("movie_name", "Movie Name cannot be less than 2 characters")
    .isLength({ min: 2, max: 100 })
    .not()
    .isEmpty()
    .run(req);
  await check("duration", "Duration is not valid")
    .isString()
    .custom((value) => {
      const durationRegex = /^(\d+(\.\d+)?h|\d+(\.\d+)?m)$/;

      if (!durationRegex.test(value || "")) {
        return false;
      }

      const numericValue = parseFloat(value || "");

      if (value?.endsWith("h")) {
        return numericValue >= 0.1 && numericValue <= 12;
      } else if (value?.endsWith("m")) {
        return numericValue >= 1 && numericValue <= 720;
      }

      return false;
    })
    .run(req);
  await check("rating", "Rating must be between 0 and 10")
    .isFloat({ min: 0, max: 10 })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors.array());
  }

  const order = await Movie.update(
    {
      movie_name,
      duration: duration.toString().endsWith("h")
        ? parseFloat(duration || "")
        : parseFloat(duration || "") / 60,
      rating,
    },
    {
      where: {
        id: parseInt(id),
      },
    }
  )
    .then(() => {
      res.status(200).json("movie updated");
    })
    .catch((err) => {
      res.status(403).send("Update Failed");
    });
};

export const deleteMovieId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie = await Movie.destroy({
    where: {
      id: parseInt(id),
    },
  })
    .then((movie) => {
      if (movie == 1) {
        res.status(200).json("movie deleted");
      } else {
        res.status(403).json({ Error: "No Movie by that id found" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Movie with id=" + id,
      });
    });
};
