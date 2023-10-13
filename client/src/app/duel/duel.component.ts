import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""

  dataReceived : boolean = false;
  userData : any;
  userData1 : any;
  userData2 : any;

  winnerPicked : boolean = false;
  winner: String = "";
  user1Points : number = 0;
  user2Points : number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async onSubmit(){
    //reset flags on each call
    this.winnerPicked = false;
    this.dataReceived = false;

    this.userData = await this.userService.duelUsers(this.usernameOne, this.usernameTwo);

    //split user data for each user
    this.userData1 = this.userData[0];
    this.userData2 = this.userData[1];
    //console.log(this.userData1, this.userData2)
    this.dataReceived = true;

    this.pickWinner(this.userData1, this.userData2);
  }

  pickWinner(user1 : any, user2 : any) : void{
    //winner decided by who gets the most points:
    //1 point for most stars, highest starred, public repos, perfect repos and followers

    //reset vars if page isnt refreshed between calls
    this.winner = "";
    this.user1Points = 0;
    this.user2Points = 0;

    let factors = ["total-stars", "highest-starred", "public-repos",  "perfect-repos", "followers"];

    for(let factor of factors){
      if(user1[factor] > user2[factor]){
        this.user1Points++;
      } else if(user1[factor] < user2[factor]){
        this.user2Points++;
      } //else its a tie; no points for either
    }

    if(this.user1Points > this.user2Points){
      this.winner = "user1";
    } else if(this.user1Points < this.user2Points) {
      this.winner = "user2";
    } else {
      //randomly pick winner in tie case
      if(Math.round(Math.random()) == 0){
        this.winner = "user1";
      } else {
        this.winner = "user2";
      }
    }

    this.winnerPicked = true;
  }
}
