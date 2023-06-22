import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CharacterType } from '../core/characters/character-type.enum';
import { Character } from '../core/characters/character.class';
import { Position } from '../core/geometry/position.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characters!: { [key: number]: Character };
  characterIndex!: number;

  constructor() {
    this.characters = [];
    this.characterIndex = 0;
  }

  createCharacter$(
    position?: Position,
    rotation?: number
  ): Observable<Character> {
    const character: Character = new Character(
      CharacterType.Player,
      position ?? { x: 400, y: 200 },
      rotation ?? 135
    );
    this.characters[this.characterIndex++] = character;
    return character.sprite.onLoaded$.pipe(map(() => character));
  }
}
