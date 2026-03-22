import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import db, { authors } from './_db';
import type { Game, Review, Author } from './_db';

const resolvers = {
  Query: {
    games(): Game[] {
      return db.games;
    },

    game(_, args: { id: string }): Game {
      return db.games.find((game) => game.id === args.id);
    },

    reviews(): Review[] {
      return db.reviews;
    },

    review(_, args: { id: string }): Review {
      return db.reviews.find((review) => review.id === args.id);
    },

    authors(): Author[] {
      return db.authors;
    },

    author(_, args: { id: string }): Author {
      return db.authors.find((author) => author.id === args.id);
    },
  },

  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },

  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },

  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },

  Mutation: {
    deleteGame(_, args: { id: string }): Game[] {
      db.games = db.games.filter((game) => game.id !== args.id);

      return db.games;
    },

    addGame(_, args): Game {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000),
      };

      db.games.push(game);
      return game;
    },

    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }

        return game;
      });

      return db.games.find((g) => g.id === args.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server ready at port', 4000);
