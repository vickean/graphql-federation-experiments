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
    name: "Leonardo DiCaprio",
    member_id: "P0254P",
    golfer_no: 521402
  },
  {
    name: "Brad Pitt",
    member_id: "P9624P",
    golfer_no: 853471
  },
  {
    name: "Quentin Tarantino",
    member_id: "P8542P",
    golfer_no: 965447
  }
];

const club = {
  id: "bfc49d13-a064-45d9-8bf5-d8b7619258f4",
  name: "TPC Kuala Lumpur"
};

const courses = [
  {
    code: "EST1",
    name: "EAST COURSE 1ST NINE"
  },
  {
    code: "EST2",
    name: "EAST COURSE 2ND NINE"
  },
  {
    code: "WST1",
    name: "WEST COURSE 1ST NINE"
  },
  {
    code: "WST2",
    name: "WEST COURSE 2ND NINE"
  }
];

const flights = [
  {
    flight_no1: 1,
    flight_no2: 50,
    course1: "EST1",
    course2: "EST2",
    flight_date1: "2020-02-12T07:00:00+0800",
    flight_date2: "2020-02-12T09:20:00+0800"
  },
  {
    flight_no1: 2,
    flight_no2: 51,
    course1: "EST1",
    course2: "EST2",
    flight_date1: "2020-02-12T07:10:00+0800",
    flight_date2: "2020-02-12T09:30:00+0800"
  },
  {
    flight_no1: 3,
    flight_no2: 52,
    course1: "EST1",
    course2: "EST2",
    flight_date1: "2020-02-12T07:20:00+0800",
    flight_date2: "2020-02-12T09:40:00+0800"
  },
  {
    flight_no1: 4,
    flight_no2: 53,
    course1: "EST1",
    course2: "EST2",
    flight_date1: "2020-02-12T07:30:00+0800",
    flight_date2: "2020-02-12T09:50:00+0800"
  },
  {
    flight_no1: 5,
    flight_no2: 54,
    course1: "EST1",
    course2: "EST2",
    flight_date1: "2020-02-12T07:40:00+0800",
    flight_date2: "2020-02-12T10:00:00+0800"
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

server.listen(5001).then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
