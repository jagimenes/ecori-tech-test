import { ListBase } from "../base/list-base";
import { ComicSummary } from "./comic-summary";

export class ComicList extends ListBase {
  items: ComicSummary[] = [];
}
