import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BitstampCoin } from '../BitstampCoin';
import { CardDetails } from '../CardDetails';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent implements OnInit {

  constructor() { }

  @Input() cardDetail: CardDetails;
  @Input() header: string;

  ngOnInit(): void {
  }


}
