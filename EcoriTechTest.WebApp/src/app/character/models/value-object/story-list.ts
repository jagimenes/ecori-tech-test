import { ListBase } from "../base/list-base";
import { StorySummary } from "./story-summary";

export class StoryList extends ListBase {
  items: StorySummary[] = [];
}
