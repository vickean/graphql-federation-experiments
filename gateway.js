const { ApolloServer, gql } = require("apollo-server");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
require("cross-fetch/polyfill");

const typeDefs = gql`
  type Golfer {
    club: Club
    name: String
    member_id: String
    golfer_no: Int
  }

  type GolfCourse {
    club: Club
    code: String
    name: String
  }

  type FlightSlots {
    club: Club
    flight_no1: Int
    flight_no2: Int
    course1: String
    course2: String
    flight_date1: String
    flight_date2: String
  }

  type Club {
    id: String
    name: String
    desc: String
  }

  type Query {
    golfers: [Golfer]
    courses: [GolfCourse]
    flights: [FlightSlots]
    club: Club
  }
`;

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:5001"
});

const tpcklClient = new ApolloClient({
  cache,
  link
});

const resolvers = {
  Query: {
    golfers: async () => {
      let output = [];
      await tpcklClient
        .query({
          query: gql`
            query golfers {
              golfers {
                club {
                  name
                  id
                }
                name
                member_id
                golfer_no
              }
            }
          `
        })
        .then(data => (output = data.golfers));
      console.log(output);
      return output;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5000).then(url => {
  console.log(`Gateway listening at ${url}`);
});
