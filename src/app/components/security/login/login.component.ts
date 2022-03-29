import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { LoginRequest } from 'src/app/core/models/login-request';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  usernameModel!: string;
  passwordModel!: string;
  loginRequest!: LoginRequest;
  hidePassword=true;
  public showPasswordOnPress!: boolean;
  constructor(private authService: AuthService, private readonly router: Router,
    private readonly dialog: DialogComponent, private readonly idle: Idle) { }

  ngOnInit(): void {
  }

  login() {
    this.loginRequest = new LoginRequest(this.usernameModel, this.passwordModel);
    this.authService.login(this.loginRequest).subscribe({
      next: (response: any) =>  {
        this.router.navigate(['/create-project']);
        this.authService.saveToken(response.accessToken);
        this.authService.saveUser(response.username);
        this.authService.saveRol(response.roles[0]);
        this.authService.isAuthenticated();
        this.usernameModel=response.username;
        this.idle.watch();
      },
      error: (err) => {
          console.log(err);
          this.dialog.show({
            title: "Error",
            content: this.dialog.formatError(err),
            type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
          });
        
      }
    });
  }
}
