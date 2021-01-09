import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { XrpEur } from './XrpEur';
import { Subject } from 'rxjs';
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
  euroToInr: number;
  xrpEurSubject: Subject<string> = new Subject();
  normalEuroToInr: number;
  noOfXRPPer1000: number;
  exchangeUsingXRP: number;
  percentageDiff: number;

  ngOnInit(): void {
    
    this.httpClient.get<XrpEur>('https://www.bitstamp.net/api/v2/ticker/xrpeur?callback=jsonp')
    .subscribe(data => {
      this.xrpEur = data;
    });

     this.httpClient.get('/order/fetchTickers')
      .subscribe(data => {
       this.xrpINR = data['XRP/INR']['info'];
       this.xrpEurSubject.next('ready');
    });

    this.httpClient.get('https://api.exchangeratesapi.io/latest?base=EUR&symbols=INR')
    .subscribe(data => {
      this.euroToInr = data['rates']['INR'];
    });

    this.xrpEurSubject.subscribe(val => {
      this.normalEuroToInr = this.euroToInr * 1000;
      this.noOfXRPPer1000 = 1000 /this.xrpEur.last;
      this.exchangeUsingXRP = this.noOfXRPPer1000 * this.xrpINR.last_traded_price;
      this.percentageDiff = (this.exchangeUsingXRP - this.normalEuroToInr)/this.exchangeUsingXRP*100;
    });

  }
  title = 'Project-Crypto';
}
