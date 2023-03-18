import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { Character } from '../../models/character';
import { UrlValue } from '../../models/value-object/url-value';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {
  model: Character = new Character();
  error: string = '';
  loading: boolean = false;
  imagePath: string = '';
  selectedTab: number = 0;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading = true;
    let routeId = Number(this.route.snapshot.paramMap.get('id'));
    if(routeId){
        this.characterService.Get(routeId).pipe(
          finalize(() => this.loading = false)
        ).subscribe(result => {
          this.model = result;
          console.log(result)
          if(this.model.id == 0){
            this.error = "Character not found."
          }
          else{
            this.imagePath = `${this.model.thumbnail.path}.${this.model.thumbnail.extension}`;
          }
        });
    }
    else{
      this.error = "Invalid id.";
      this.loading = false;
    }
  }

  SetTab(tab: number): void{
    this.selectedTab = tab;
  }

  GetClassUrl(url: UrlValue): string{
    let badgeClass = "me-1 cursor-pointer text-white badge";
    if(url.type == 'wiki')
      badgeClass += ' text-bg-primary';

    if(url.type == 'detail')
      badgeClass += ' text-bg-info';

    if(url.type == 'comiclink')
      badgeClass += ' text-bg-danger';

    return badgeClass;
  }

  OpenUrl(url: UrlValue): void{
    window.open(url.url, '_blank');
  }
}
