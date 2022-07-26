import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Angles } from '../models';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  @Input() angles: Angles;
  @Output() mouseDoubleClicked = new EventEmitter<void>();
  wasAlreadyClicked: Boolean = false;
  observe: Observable<Boolean>;
  subscription: Subscription = new Subscription();
  divisionsArray: Array<any> = [];
  mouseClicking(): void {
    this.subscription = this.observe.subscribe((value) => {
      this.wasAlreadyClicked = value;
    });

    if (this.wasAlreadyClicked) {
      this.mouseDoubleClicked.emit();
      this.subscription.unsubscribe();
    }
    this.wasAlreadyClicked = !this.wasAlreadyClicked;
  }

  ngOnInit(): void {
    this.divisionsArray.length = 60;
    this.observe = new Observable((observer) => {
      setTimeout(() => {
        if (!this.wasAlreadyClicked) {
          observer.next(false);
          observer.complete();
        }
      }, 500);
    });
  }
}
