import { Author } from './author';

export class Post {
  public readonly id: number | null = null;
  public readonly author: Author | null = null;
  constructor(public readonly content: string) {}
}
