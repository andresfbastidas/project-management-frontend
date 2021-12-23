import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  readonly monitor = 'ilde Monitor';

  constructor(private readonly router: Router,
    private readonly idle: Idle,
    private readonly loggerService: LoggerService,
    private readonly messageService: MessageService,
    public readonly authService:AuthService) { 
      this.setIldeMonitor();
    }

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }//logout

  private setIldeMonitor(): void {
    this.idle.setIdle(environment.maxIdleSeconds);
    this.idle.setTimeout(environment.timeOutSeconds);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      this.loggerService.log(this.monitor, this.idleState);
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.loggerService.log(this.monitor, this.idleState);
      this.logout();
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You have gone idle!';
      this.loggerService.log(this.monitor, this.idleState);
    });

    this.idle.onTimeoutWarning.subscribe((countdown: string) => {
      this.idleState = `La sesión caducará en ${countdown} segundos!`;
      this.notifyAlertTimeout(countdown);
      return this.idleState;
    });
  }//setIldeMonitor

  private notifyAlertTimeout(countdown: any): void {
    if (countdown % environment.idleIntervalAlert === 0) {
      this.loggerService.log('Idle monitor', this.idleState);
      this.messageService.add({
        key: 'timeOutWarning',
        id: 'timeout',
        severity: 'warn',
        summary: 'Alerta de inactividad',
        detail: this.idleState
      });
    }
  }//notifyAlertTimeout
}
