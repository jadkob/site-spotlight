export interface PostType {
  _id?: String;
  username: String;
  name: String;
  description: String;
  link: String;
  reviews: [];
  createdAt: Date;
}
