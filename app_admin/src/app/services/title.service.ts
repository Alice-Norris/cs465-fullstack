import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Injectable()

export class TitleService {
  private titleChanged = new Subject<boolean>();
  private currentTitle = new Subject<string>();

  private prevTitle = '';
  private currTitleTest = '';

  titleChanged$ = this.titleChanged.asObservable();
  currentTitle$ = this.currentTitle.asObservable();


  constructor(
    private title: Title
  ) {  }

  setTitleChanged(changed: boolean) {
    this.titleChanged.next(changed);
  }

  updateTitle(title: string) {
    this.titleChanged.next(true);
    this.prevTitle = this.currTitleTest;
    this.currTitleTest = title;;
    this.currentTitle.next(title);

  }

  getPreviousTitle() {
    return this.prevTitle;
  }
}
