import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Booking = {
  __typename?: 'Booking';
  end: Scalars['DateTime'];
  id: Scalars['Int'];
  room: Room;
  roomId: Scalars['Int'];
  start: Scalars['DateTime'];
  title: Scalars['String'];
  user: User;
  userId: Scalars['Int'];
};

export type CreateBookingInput = {
  end: Scalars['DateTime'];
  roomId: Scalars['Float'];
  start: Scalars['DateTime'];
  title: Scalars['String'];
  userId: Scalars['Float'];
};

export type CreateRoomInput = {
  title: Scalars['String'];
};

export type CreateUserInput = {
  name: Scalars['String'];
};

export type DeleteBookingInput = {
  id: Scalars['Float'];
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createRoom: Room;
  createUser: User;
  deleteRoom: Scalars['Boolean'];
  login: User;
  removeBooking: Scalars['Boolean'];
  removeUser: User;
  updateBooking: Booking;
  updateUser: User;
};


export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
};


export type MutationRemoveBookingArgs = {
  DeleteBookingInput: DeleteBookingInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateBookingArgs = {
  updateBookingInput: UpdateBookingInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  bookingById: Array<Booking>;
  bookings: Array<Booking>;
  roomById: Room;
  rooms: Array<Room>;
  user: User;
};


export type QueryBookingByIdArgs = {
  id: Scalars['Int'];
};


export type QueryRoomByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  bookings?: Maybe<Array<Booking>>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type UpdateBookingInput = {
  end?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  roomId?: InputMaybe<Scalars['Float']>;
  start?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  userId: Scalars['Float'];
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  bookings?: Maybe<Array<Booking>>;
  id: Scalars['Int'];
  name: Scalars['String'];
};
