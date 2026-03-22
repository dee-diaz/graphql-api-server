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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server ready at port', 4000);
