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
  intervalId: any;

  mouseClicking(): void {
    if (!this.wasAlreadyClicked) {
      this.subscription = this.observe.subscribe((value) => {
        this.wasAlreadyClicked = value;
      });
    }

    if (this.wasAlreadyClicked) {
      this.wasAlreadyClicked = false;
      this.mouseDoubleClicked.emit();
      this.subscription.unsubscribe();
      clearInterval(this.intervalId);
      return;
    }
    this.wasAlreadyClicked = true;
  }

  ngOnInit(): void {
    this.divisionsArray.length = 60;
    this.observe = new Observable((observer) => {
      this.intervalId = setTimeout(() => {
        if (this.wasAlreadyClicked) {
          observer.next(false);
          observer.complete();
        }
      }, 500);
    });
  }
}
