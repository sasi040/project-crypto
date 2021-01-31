import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitstampCoin } from './BitstampCoin';
import { Subject } from 'rxjs';
import { CardDetails } from './CardDetails';
// import { bitbnsApi } from '../../node_modules/bitbns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private httpClient: HttpClient) {
  }

  xrpEur: BitstampCoin;
  ethEur: BitstampCoin;
  ltcEur: BitstampCoin;
  btcEur: BitstampCoin;
  xlmEur: BitstampCoin;
  linkEur: BitstampCoin;
  xrpINR: any;
  ethINR: any;
  ltcINR: any;
  btcINR: any;
  xlmINR: any;
  linkINR: any;
  euroToInr: number;
  xrpEurSubject: Subject<string> = new Subject();
  normalEuroToInr: number;
  noOfXRPPer1000: number;
  exchangeUsingXRP: number;
  percentageDiff: number;
  xrpCard: CardDetails;
  btcCard: CardDetails;
  ltcCard: CardDetails;
  ethCard: CardDetails;
  xlmCard: CardDetails;
  linkCard: CardDetails;

  ngOnInit(): void {

    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/xrpeur?callback=jsonp')
    .subscribe(data => {
      this.xrpEur = data;
    });
    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/ltceur?callback=jsonp')
      .subscribe(data => {
        this.ltcEur = data;
      });
    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/btceur?callback=jsonp')
      .subscribe(data => {
        this.btcEur = data;
      });
    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/etheur?callback=jsonp')
      .subscribe(data => {
        this.ethEur = data;
      });
    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/xlmeur?callback=jsonp')
      .subscribe(data => {
        this.xlmEur = data;
      });
    this.httpClient.get<BitstampCoin>('https://www.bitstamp.net/api/v2/ticker/linkeur?callback=jsonp')
      .subscribe(data => {
        this.linkEur = data;
      });

    this.httpClient.get('/order/fetchTickers')
      .subscribe(data => {
       this.xrpINR = data['XRP/INR']['info'];
       this.ltcINR = data['LTC/INR']['info'];
       this.btcINR = data['BTC/INR']['info'];
       this.ethINR = data['ETH/INR']['info'];
       this.xlmINR = data['XLM/INR']['info'];
       this.linkINR = data['LINK/INR']['info'];
       this.xrpEurSubject.next('ready');
    });

    this.httpClient.get('https://api.exchangeratesapi.io/latest?base=EUR&symbols=INR')
    .subscribe(data => {
      this.euroToInr = data['rates']['INR'];
    });

    this.xrpEurSubject.subscribe(val => {
      this.normalEuroToInr = this.euroToInr * 1000;
      this.xrpCard = this.getCardDetails(this.xrpEur, this.xrpINR, 0.02);
      this.btcCard = this.getCardDetails(this.btcEur, this.btcINR,0.0005);
      this.ltcCard = this.getCardDetails(this.ltcEur, this.ltcINR,0.001);
      this.ethCard = this.getCardDetails(this.ethEur, this.ethINR,0.04);
      this.xlmCard = this.getCardDetails(this.xlmEur, this.xlmINR,0.005);
      this.linkCard = this.getCardDetails(this.linkEur, this.linkINR,0.25);
    });

  }

  getCardDetails(bitStampCoin: BitstampCoin, bitbnsCoin: any, transferFee: number): CardDetails {
    
    const noOfCoins = (995 / bitStampCoin.last) - transferFee;
    const exchangeValue = noOfCoins * bitbnsCoin.last_traded_price;
    const percentageDiff = (exchangeValue - this.normalEuroToInr) / this.normalEuroToInr * 100;
    let cardDetail: CardDetails;
    cardDetail = {
      euroHigh: bitStampCoin.high,
      euroLast: bitStampCoin.last,
      euroLow: bitStampCoin.low,
      inrHigh: bitbnsCoin.highest_buy_bid,
      inrLow: bitbnsCoin.lowest_sell_bid,
      inrLast: bitbnsCoin.last_traded_price,
      exchangeValue,
      percentageDiff
    };
    return cardDetail;
  }
  title = 'Project-Crypto';
}
