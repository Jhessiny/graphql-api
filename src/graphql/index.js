const userData = require("../../MOCK_DATA.json");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const UserType = require("./User");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: {
        page: { type: GraphQLInt },
        count: { type: GraphQLInt },
      },
      resolve(parent, { page, count }) {
        console.log(page, count);
        const start = count * (page - 1);
        const end = start + count;
        const users = userData.slice(start, end);
        return users;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          ...args,
        });
        return args;
      },
    },
  },
});

const graphqlSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = graphqlSchema;
