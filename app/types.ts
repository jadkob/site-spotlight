export interface PostType {
  id?: String;
  username: String;
  name: String;
  description: String;
  link: String;
  reviews: [];
  createdAt: Date;
  userId: String;
}
export interface UserType {
  id: String;
  username: String;
  password: String;
  email: String;
  isAdmin: Boolean;
  followers: Array<string>;
  following: Array<string>;
  posts: Array<string>;
  discordLink: String;
  createdAt: Date;
}
