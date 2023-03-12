import { Component, OnInit } from '@angular/core';
import { ICharacter, IParamsApi } from '../../Interfaces/Character';
import { ListCharacterService } from '../../Services/list-characters.service';

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css']
})
export class ListCharactersComponent implements OnInit {
  infoPage = {
    currentPage: 0,
    totalPages: 0
  }
  characters: ICharacter[] = []
  detailsCharacter: ICharacter[] = []
  paramsFilterAllCharacters: IParamsApi = {
    name: null,
    nameStartsWith: null,
    modifiedSince: null,
    comics: null,
    series: null,
    events: null,
    stories: null,
    OrderBy: null,
    take: 8,
    skip: 0
  }

  ngOnInit(): void { }

  constructor(private listCharacterService: ListCharacterService) {
    this.getCharacters();
  }

  handleChange(args: any) {
    const prop: keyof IParamsApi = args.target.id;
    const value = args.target.value;
    if (args.target.value === "") {
      this.paramsFilterAllCharacters[prop] = null
    } else {
      this.paramsFilterAllCharacters[prop] = value
    }
    this.infoPage.currentPage = 0;
    this.infoPage.totalPages = 0;
    this.paramsFilterAllCharacters.skip = 0;
    this.getCharacters();
  }

  getCharacters(): void {
    this.characters = [];
    this.listCharacterService.getAll(this.paramsFilterAllCharacters).subscribe((response) => {
      this.infoPage.totalPages = Math.ceil(response.data.total / 8)
      this.characters = response.data.results
    });
  }

  getOneCharacters(id: number): void {
    this.detailsCharacter = []
    this.listCharacterService.getById(id).subscribe((response) =>
      this.detailsCharacter = response.data.results
    );
  }

  nextPage(finish = false) {
    if (finish) {
      this.infoPage.currentPage = this.infoPage.totalPages - 1
    } else {
      this.infoPage.currentPage += 1
    }
    this.paramsFilterAllCharacters.skip = this.infoPage.currentPage;
    this.getCharacters();
  }

  prevPage(start = false) {
    if (this.infoPage.currentPage > 0) {
      if (start) {
        this.infoPage.currentPage = 0
      } else {
        this.infoPage.currentPage -= 1
      }
      this.paramsFilterAllCharacters.skip = this.infoPage.currentPage;
      this.getCharacters();
    }
  }

  openModal(id: number) {
    this.getOneCharacters(id);
    const modal: HTMLElement = document.getElementById('myModal')!;
    modal.style.display = "block";
  }

  closeModal() {
    const modal: HTMLElement = document.getElementById('myModal')!;
    modal.style.display = 'none';
  }
}
