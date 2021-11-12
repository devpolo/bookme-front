import { gql } from "@apollo/client"

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }
  input LoginInput {
    name: String!
  }

  type Query {
    # rooms(): User!
   
  }
  type Mutation {
    login(input: LoginInput!): User!
  }
`
