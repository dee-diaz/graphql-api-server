import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import db, { authors } from './_db';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },

    reviews() {
      return db.reviews;
    },

    authors() {
      return db.authors;
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
