export type Post = {
  id: number;
  title: string;
  summary: string;
  body: string;
  author: string;
  category: string;
  date: string;
  urlSlug: string;
  tags: Tag[];
  comments?: Comment[];
};

export type Tag = {
  tagId?: number;
  tagName: string;
  urlSlug?: string;
};

export type Comment = {
  commentId: number;
  author: string;
  body: string;
  date: string;
};

export type User = {
  username: string;
  displayName: string;
  token: string;
};

export type UserFormValues = {
  email: string;
  password: string;
  displayName?: string;
  username?: string;
};

export type ArticleProps = {
  singlePost?: Post;
};

export type DashboardProps = {
  user: User;
  onChangeSinglePost: (onChangeSinglePost: any) => void;
};

export type CreatePostProps = {
  user: User;
  onCreate: (newPost: Post) => void;
};

export type EditPostProps = {
  singlePost: Post;
  onEdit: (newPost: Post) => void;
};

export type LoginProps = {
  onLogin: (newUser: User) => void;
};

export type LogoutProps = {
  onLogout: () => void;
};
