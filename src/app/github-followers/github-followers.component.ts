import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from './github-followers.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest, switchMap } from 'rxjs'; 
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any;

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService) { }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(switchMap((combined: { get: (arg0: string) => any; }[]) => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');

      return this.service.getFollowers();
    }))
    .subscribe(followers => this.followers = followers);
  }
}
