export interface Interfaces {
  title: string;
  author: string;
  date: Date;
}

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface Post {
  title: string;
  author: string;
  text: string;
  date: Date;
  id?: string;
}

export interface FbCreateResponse {
  name: string;
}
