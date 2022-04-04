import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service'
import { ILoaderState } from 'src/app/core/models/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  show = false;
  
  constructor(
    private readonly loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: ILoaderState) => {
        this.show = state.show;
      }
    );
  }//ngOnInit

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }//ngOnDestroy
}
