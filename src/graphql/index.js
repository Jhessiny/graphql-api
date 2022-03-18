const userData = require("../../MOCK_DATA.json");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const UserType = require("./User");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData;
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
