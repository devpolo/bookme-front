import { gql } from "@apollo/client"

export const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    bookings: [Booking!]
  }

  type Booking {
    id: Int!
    title: String!
    start: DateTime!
    end: DateTime!
    roomId: Int!
    room: Room!
    userId: Int!
    user: User!
  }

  """
  A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  """
  scalar DateTime

  type Room {
    id: Int!
    name: String!
    bookings: [Booking!]
  }

  type Query {
    rooms: [Room!]!
    roomById(id: Int!): Room!
    bookings: [Booking!]!
    bookingById(id: Int!): [Booking!]!
    user(id: Int!): User!
  }

  type Mutation {
    createRoom(createRoomInput: CreateRoomInput!): Room!
    deleteRoom(id: Int!): Boolean!
    createBooking(createBookingInput: CreateBookingInput!): Booking!
    updateBooking(updateBookingInput: UpdateBookingInput!): Booking!
    removeBooking(DeleteBookingInput: DeleteBookingInput!): Boolean!
    createUser(createUserInput: CreateUserInput!): User!
    updateUser(updateUserInput: UpdateUserInput!): User!
    removeUser(id: Int!): User!
    login(name: String!): User!
  }

  input CreateRoomInput {
    name: String!
  }

  input CreateBookingInput {
    title: String!
    start: DateTime!
    end: DateTime!
    roomId: Float!
    userId: Float!
  }

  input UpdateBookingInput {
    title: String
    start: DateTime
    end: DateTime
    roomId: Float
    userId: Float!
    id: Float!
  }

  input DeleteBookingInput {
    id: Float!
    userId: Float!
  }

  input CreateUserInput {
    name: String!
  }

  input UpdateUserInput {
    name: String
    id: Int!
  }
`
