import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { XrpEur } from './XrpEur';
// import { bitbnsApi } from '../../node_modules/bitbns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient: HttpClient) {
  }

  xrpEur: XrpEur;
  xrpINR: any;
  euroToInr: Number;

  ngOnInit(): void {
    
    this.httpClient.get<XrpEur>('https://www.bitstamp.net/api/v2/ticker/xrpeur?callback=jsonp')
    .subscribe(data => {
      this.xrpEur = data;
    });

     this.httpClient.get('https://localhost:4200/order/fetchTickers')
      .subscribe(data => {
       this.xrpINR = data['XRP/INR']['info'];
    });

    this.httpClient.get('https://api.exchangeratesapi.io/latest?base=EUR&symbols=INR')
    .subscribe(data => {
      this.euroToInr = data['rates']['INR'];
    })
  }
  title = 'Project-Crypto';
}
