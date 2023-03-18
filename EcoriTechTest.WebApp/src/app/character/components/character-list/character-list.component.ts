import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { Character } from '../../models/character';
import { CharacterDataContainer } from '../../models/dto/character-data-container';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit{
    baseContainer: CharacterDataContainer = new CharacterDataContainer();
    textFilter: string = '';
    limit: number = 12;
    loading: boolean = false;
    textFilterUpdate = new Subject<string>();
    
    constructor(private characterService: CharacterService, private router: Router) {
      this.textFilterUpdate.pipe(
        debounceTime(1000),
        distinctUntilChanged())
        .subscribe(value => {
          this.textFilter = value;
          this.Search();
        });
    }

    ngOnInit(): void {
      this.Search();
    }

    GetList() : void{
      this.loading = true;

      let filter = `limit=${this.limit}&offset=${this.baseContainer.count}`;
      if(this.textFilter){
        filter+= `&nameStartsWith=${this.textFilter}`;
      }

      this.characterService.GetWithFilter(filter).pipe(
        finalize(() => this.loading = false)
      ).subscribe(resultDataContainer => {
        this.baseContainer.count = this.baseContainer.count + resultDataContainer.count;
        this.baseContainer.total = resultDataContainer.total;
        this.baseContainer.limit = resultDataContainer.limit;
        this.baseContainer.results.push(...resultDataContainer.results)
      })
    }

    Search(): void{
      this.baseContainer = new CharacterDataContainer();
      this.GetList();
    }

    GetMore(): void{
      this.GetList();
    }

    OnFilter(event: any): void{
      
    }

    GetCharaceterImagePath(character: Character) : string{
      return `${character.thumbnail.path}.${character.thumbnail.extension}`;
    }

    GetCharaceterDescription(character: Character) : string{
      return character.description ? `${character.description.substring(0, 145)}...` :"Character has no description.";
    }

    ViewCharacter(character: Character): void{
      this.router.navigate(['/character', character.id])
    }
}
