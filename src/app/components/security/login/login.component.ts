import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login-request';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogComponent } from 'src/app/shared/notification/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;
  loginRequest!: LoginRequest;
  constructor(private authService: AuthService, private readonly router: Router,
    private readonly dialog: DialogComponent) { }

  ngOnInit(): void {
  }

  login() {
    this.loginRequest = new LoginRequest(this.username, this.password);
    this.authService.login(this.loginRequest).subscribe({
      next: (response: any) =>  {
        this.router.navigate(['/create-project']);
        this.authService.saveToken(response.accessToken);
        this.authService.saveUser(response.username);
        this.authService.isAuthenticated();
        this.username=response.username;
      },
      error: (err) => {
        this.dialog.show({
          title: "Error",
          content: this.dialog.formatError(err),
          type: "error", footer: new Date().toLocaleString(), textTech: `${this.dialog.formatError(err)}`
        });
        if (err.status == 0){ //or whatever condition you like to put
          this.dialog.show({
            title: "Sistema", content:"Hubo un inconveninete de comunicación con el servidor.Por favor contacte al administrador.", type:"error",
            defaultButtonClass:"btn-danger", footer:new Date().toLocaleString(),
            textTech:"El servicio backend no esta respondiendo apropiadamente."}
        );
          }
      }
    });
  }
}
