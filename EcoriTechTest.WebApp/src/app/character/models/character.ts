import { ComicList } from "./value-object/comic-list";
import { EventList } from "./value-object/event-list";
import { Image } from "./value-object/image";
import { SeriesList } from "./value-object/series-list";
import { StoryList } from "./value-object/story-list";
import { UrlValue } from "./value-object/url-value";

export class Character {
  id: number = 0;
  name: string = '';
  description: string = '';
  modified: Date = new Date();
  resourceURI: string = '';
  urls: UrlValue[] = [];
  thumbnail: Image = new Image();
  comics: ComicList = new ComicList();
  stories: StoryList = new StoryList();
  events: EventList = new EventList();
  series: SeriesList = new SeriesList();
}
