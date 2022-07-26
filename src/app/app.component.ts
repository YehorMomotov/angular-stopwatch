import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Angles } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  countdown: Date = new Date(0);
  startTime: Date = new Date();
  isStarted: Boolean = false;
  subscription: Subscription = new Subscription();
  angles: Angles = { minuteAngle: '0deg', secondAngle: '0deg' };
  intervalId: any;
  observable: Observable<any> = new Observable((observer) => {
    this.intervalId = setInterval(() => {
      const now = new Date();
      observer.next(
        new Date(Math.abs(now.getTime() - this.startTime.getTime()))
      );
    }, 100);
  });

  wait() {
    if (this.angles.secondAngle !== '0deg') {
      this.startTime = new Date(
        Math.abs(new Date().getTime() - this.countdown.getTime())
      );
      this.chooseAndProceed();
    }
  }

  resetTime(): void {
    this.startTime = new Date();
    this.countdown = new Date(0);
  }

  countdownAction(): void {
    this.isStarted = !this.isStarted;
    this.startTime = new Date();
    this.chooseAndProceed();
  }

  chooseAndProceed(): void {
    if (this.intervalId) {
      this.subscription.unsubscribe();
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      if (this.isStarted) {
        this.startCounting();
      }
    }
  }
  startCounting(): void {
    this.observable.subscribe((value) => {
      this.countdown = value;
      this.calculateAngles();
    });
  }

  calculateAngles(): void {
    this.angles = {
      minuteAngle: (this.countdown.getMinutes() / 60) * 360 + 'deg',
      secondAngle: (this.countdown.getSeconds() / 60) * 360 + 'deg',
    };
  }

  ngOnInit(): void {
    this.subscription.unsubscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
