const { ApolloServer, gql } = require("apollo-server");
const { ApolloClient } = require("apollo-client");
const { HttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
// const { ApolloClient, InMemoryCache } = require("apollo-boost");
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
    code: String
  }

  type Query {
    golfers(club: String!): [Golfer]
    courses: [GolfCourse]
    flights: [FlightSlots]
    clubs: [Club]
  }
`;

const connections = {
  tpckl: {
    client: new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:5001"
      })
    })
  },
  tgcc: {
    client: new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: "http://localhost:5002"
      })
    })
  }
};

let dummyClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "#"
  })
});

const resolvers = {
  Query: {
    golfers: async (_, { club }) => {
      let output = [];

      if (club in connections) {
        dummyClient = connections[club].client;
      } else {
        throw new Error("Unknown Club Code");
      }

      await dummyClient
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
        .then(data => {
          output = [...output, ...data.data.golfers];
        });

      // console.log(output);
      return output;
    },
    clubs: async () => {
      let output = [];

      const conArray = Object.keys(connections);

      await Promise.all(
        conArray.map(async el => {
          await connections[el].client
            .query({
              query: gql`
                query club {
                  club {
                    id
                    name
                    desc
                  }
                }
              `
            })
            .then(data => {
              let preOutput = data.data.club;
              preOutput["code"] = el;
              output = [...output, preOutput];
            });
        })
      );

      return output;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5000).then(({ url }) => {
  console.log(`Gateway listening at ${url}`);
});
