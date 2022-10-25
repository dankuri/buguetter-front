import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
};

export type Comments = {
  __typename?: 'Comments';
  authorId: Scalars['Int'];
  date: Scalars['Int'];
  id: Scalars['Int'];
  likes: Array<Reaction>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Posts;
  addPost: Posts;
  addReaction: Posts;
  deleteComment: Posts;
  deletePost: Status;
  deleteReaction: Posts;
  deleteUser: Status;
  follow: UsersRealationship;
  login: UsersRealationship;
  logout: Status;
  refresh: Status;
  register: UsersRealationship;
  seen: Status;
  unfollow: UsersRealationship;
};


export type MutationAddCommentArgs = {
  postId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationAddPostArgs = {
  tags?: InputMaybe<Array<Scalars['String']>>;
  text: Scalars['String'];
};


export type MutationAddReactionArgs = {
  reaction: Scalars['String'];
  select: Scalars['String'];
  selectionId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
  postId: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
};


export type MutationDeleteReactionArgs = {
  select: Scalars['String'];
  selectionId: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  delete: Scalars['Boolean'];
};


export type MutationFollowArgs = {
  followId: Scalars['Int'];
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  login: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSeenArgs = {
  postId: Array<Scalars['Int']>;
};


export type MutationUnfollowArgs = {
  followId: Scalars['Int'];
};

export type Posts = {
  __typename?: 'Posts';
  author: Scalars['String'];
  authorId: Scalars['Int'];
  comment: Array<Comments>;
  date: Scalars['Int'];
  id: Scalars['Int'];
  likes: Array<Reaction>;
  postId: Scalars['Int'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  feed: Array<Posts>;
  find: Posts;
  status: Status;
  user: UsersRealationship;
};


export type QueryFeedArgs = {
  id?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  selection: Scalars['String'];
};


export type QueryFindArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Reaction = {
  __typename?: 'Reaction';
  postId: Scalars['Int'];
  reaction: Scalars['String'];
  userId: Scalars['Int'];
};

export type Status = {
  __typename?: 'Status';
  error: Scalars['Int'];
  msg: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  date: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UsersRealationship = {
  __typename?: 'UsersRealationship';
  date: Scalars['Int'];
  follower: Array<Users>;
  following: Array<Users>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type AddPostMutationVariables = Exact<{
  text: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'Posts', id: number, date: number } };

export type AddReactionMutationVariables = Exact<{
  reaction: Scalars['String'];
  section: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type AddReactionMutation = { __typename?: 'Mutation', addReaction: { __typename?: 'Posts', likes: Array<{ __typename?: 'Reaction', userId: number, reaction: string }> } };

export type LoginMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UsersRealationship', id: number, name: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Status', msg: string, error: number } };

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = { __typename?: 'Mutation', refresh: { __typename?: 'Status', msg: string, error: number } };

export type RegisterMutationVariables = Exact<{
  login: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UsersRealationship', id: number, name: string } };

export type DeleteReactionMutationVariables = Exact<{
  section: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type DeleteReactionMutation = { __typename?: 'Mutation', deleteReaction: { __typename?: 'Posts', likes: Array<{ __typename?: 'Reaction', userId: number, reaction: string }> } };

export type FeedQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  selection: Scalars['String'];
}>;


export type FeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Posts', id: number, text: string, date: number, comment: Array<{ __typename?: 'Comments', text: string, authorId: number }>, likes: Array<{ __typename?: 'Reaction', userId: number, reaction: string }> }> };

export type FindPostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindPostQuery = { __typename?: 'Query', find: { __typename?: 'Posts', id: number, text: string, date: number, author: string, authorId: number, comment: Array<{ __typename?: 'Comments', id: number, text: string, authorId: number, date: number, likes: Array<{ __typename?: 'Reaction', userId: number, reaction: string }> }>, likes: Array<{ __typename?: 'Reaction', userId: number, reaction: string }> } };

export type ServerStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type ServerStatusQuery = { __typename?: 'Query', status: { __typename?: 'Status', msg: string, error: number } };

export type UserFullQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserFullQuery = { __typename?: 'Query', user: { __typename?: 'UsersRealationship', id: number, name: string, date: number, follower: Array<{ __typename?: 'Users', id: number, name: string }>, following: Array<{ __typename?: 'Users', id: number, name: string }> } };

export type UserMinQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserMinQuery = { __typename?: 'Query', user: { __typename?: 'UsersRealationship', id: number, name: string } };


export const AddPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<AddPostMutation, AddPostMutationVariables>;
export const AddReactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reaction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"section"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reaction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reaction"}}},{"kind":"Argument","name":{"kind":"Name","value":"select"},"value":{"kind":"Variable","name":{"kind":"Name","value":"section"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"reaction"}}]}}]}}]}}]} as unknown as DocumentNode<AddReactionMutation, AddReactionMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<RefreshMutation, RefreshMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const DeleteReactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteReaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"section"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteReaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"select"},"value":{"kind":"Variable","name":{"kind":"Name","value":"section"}}},{"kind":"Argument","name":{"kind":"Name","value":"selectionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"reaction"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteReactionMutation, DeleteReactionMutationVariables>;
export const FeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Feed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"selection"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"selection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"selection"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"reaction"}}]}}]}}]}}]} as unknown as DocumentNode<FeedQuery, FeedQueryVariables>;
export const FindPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"find"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"reaction"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"reaction"}}]}}]}}]}}]} as unknown as DocumentNode<FindPostQuery, FindPostQueryVariables>;
export const ServerStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServerStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ServerStatusQuery, ServerStatusQueryVariables>;
export const UserFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserFullQuery, UserFullQueryVariables>;
export const UserMinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserMin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserMinQuery, UserMinQueryVariables>;