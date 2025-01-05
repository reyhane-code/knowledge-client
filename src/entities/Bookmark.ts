import Article from "./Article";

export interface UserBookmarks {
  id: number;
  user_id: number;
  game_id?: number;
  article_id?: number;
  article?: Article;
  entity_type: string;
}
