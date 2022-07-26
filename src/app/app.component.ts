import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Angles } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  countdown: Date = new Date(0);
  time: Date = new Date();
  isStarted: Boolean = false;
  subscription: Subscription = new Subscription();
  angles: Angles = { minuteAngle: '0deg', secondAngle: '0deg' };

  wait() {
    if (this.angles.secondAngle !== '0deg') {
      this.time = new Date(
        Math.abs(new Date().getTime() - this.countdown.getTime())
      );
      this.chooseAndProceed();
    }
  }

  resetTime(): void {
    this.time = new Date();
    this.countdown = new Date(0);
  }

  countdownAction(): void {
    this.isStarted = !this.isStarted;
    this.time = new Date();
    this.chooseAndProceed();
  }

  chooseAndProceed(): void {
    if (!this.subscription.closed) {
      this.subscription.unsubscribe();
    } else {
      this.startCounting();
    }
  }
  startCounting(): void {
    this.subscription = timer(0, 1).subscribe(() => {
      const now = new Date();
      this.countdown = new Date(Math.abs(now.getTime() - this.time.getTime()));
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
