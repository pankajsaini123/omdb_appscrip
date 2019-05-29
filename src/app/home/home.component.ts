import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AppService } from '../app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public search_movie: string;
  public results: any;
  public selectedMovie: any;
  public loading = false;

  constructor(public toastr: ToastrManager, public appService: AppService) { }

  ngOnInit() {
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
     this.getMovie()
    }
  }
public getMovie = () => {
  this.results = '';
  this.selectedMovie = '';
   if(!this.search_movie) {
     this.toastr.warningToastr("enter movie name")
   } else {
    this.loading = true;
    this.appService.searchMovie(this.search_movie).subscribe((apiResponse: any) => {
        
        if (apiResponse.Response === 'True') {
          this.results = apiResponse.Search        
          this.search_movie = '';
          this.loading = false;
        } else if (apiResponse.Response === 'False') {
          this.toastr.warningToastr(apiResponse.Error)
          this.search_movie = '';
          this.loading = false;
        }
       
    }, (err) => {
      this.toastr.errorToastr(err.message)
      this.loading = false;
    })
     
   }
}
public showDetails(movie: any) {
  this.loading = true;
  this.selectedMovie = movie;
  setTimeout(() => {
    this.loading = false;
  }, 1000);
}


}
