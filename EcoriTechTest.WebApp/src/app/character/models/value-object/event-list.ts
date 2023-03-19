import { ListBase } from "../base/list-base";
import { EventSummary } from "./event-summary";

export class EventList extends ListBase {
  items: EventSummary[] = [];
}
