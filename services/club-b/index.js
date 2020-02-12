const { ApolloServer, gql } = require("apollo-server");

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

  # type Mutation {}
`;

const golfers = [
  {
    name: "Robert Downey Jr.",
    member_id: "P2510P",
    golfer_no: 965754
  },
  {
    name: "Chris Pratt",
    member_id: "P8574P",
    golfer_no: 215478
  },
  {
    name: "Scarlett Johansson",
    member_id: "P4215P",
    golfer_no: 365854
  }
];

const club = {
  id: "8085573b-4cc6-454f-8a16-a02db9873095",
  name: "Tropicana Golf & Country Club"
};

const courses = [
  {
    code: "NOR1",
    name: "NORTH COURSE 1ST NINE"
  },
  {
    code: "NOR2",
    name: "NORTH COURSE 2ND NINE"
  },
  {
    code: "SOU1",
    name: "SOUTH COURSE 1ST NINE"
  },
  {
    code: "SOU2",
    name: "SOUTH COURSE 2ND NINE"
  }
];

const flights = [
  {
    flight_no1: 11,
    flight_no2: 60,
    course1: "NOR1",
    course2: "NOR2",
    flight_date1: "2020-02-12T08:00:00+0800",
    flight_date2: "2020-02-12T10:20:00+0800"
  },
  {
    flight_no1: 12,
    flight_no2: 61,
    course1: "NOR1",
    course2: "NOR2",
    flight_date1: "2020-02-12T08:10:00+0800",
    flight_date2: "2020-02-12T10:30:00+0800"
  },
  {
    flight_no1: 13,
    flight_no2: 62,
    course1: "NOR1",
    course2: "NOR2",
    flight_date1: "2020-02-12T08:20:00+0800",
    flight_date2: "2020-02-12T10:40:00+0800"
  },
  {
    flight_no1: 14,
    flight_no2: 63,
    course1: "NOR1",
    course2: "NOR2",
    flight_date1: "2020-02-12T08:30:00+0800",
    flight_date2: "2020-02-12T10:50:00+0800"
  },
  {
    flight_no1: 15,
    flight_no2: 64,
    course1: "NOR1",
    course2: "NOR2",
    flight_date1: "2020-02-12T08:40:00+0800",
    flight_date2: "2020-02-12T11:00:00+0800"
  }
];

const resolvers = {
  Query: {
    golfers: () => {
      let output = [...golfers].map(el => {
        el["club"] = club;

        return el;
      });

      return output;
    },
    courses: () => {
      let output = [...courses].map(el => {
        el["club"] = club;

        return el;
      });

      return output;
    },
    flights: () => {
      let output = [...flights].map(el => {
        el["club"] = club;

        return el;
      });

      return output;
    },
    club: () => club
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(5002).then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
