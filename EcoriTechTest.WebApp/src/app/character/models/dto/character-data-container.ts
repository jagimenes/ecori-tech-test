import { Character } from "../character";

export class CharacterDataContainer {
  offset: number = 0;
  limit: number = 0;
  total: number = 0;
  count: number = 0;
  results: Character[] = [];
}
