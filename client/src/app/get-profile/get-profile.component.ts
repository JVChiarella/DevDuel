import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css']
})
export class GetProfileComponent implements OnInit {

  @Input() userProfile : any;
  @Input() duelWinner : any;
  @Input() userNum : any;

  profilePicLink : String = "";
  profileEntries = ["username", "name", "location", "titles", "favorite-language", "total-stars", "highest-starred", "public-repos",  "perfect-repos", "followers", "following"]

  userWins = false;
  userLost = false;

  constructor() { }

  ngOnInit(): void {
    console.log("get-profile component received: ", this.userProfile);

    this.profilePicLink = this.userProfile["avatar_url"];

    if(this.duelWinner != null){
      if(this.userNum == this.duelWinner){
        console.log("user", this.userNum, "wins");
        this.userWins = true;
      } else {
        this.userLost = true;
      }
    }
  }
}
