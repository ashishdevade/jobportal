import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }
  @Input() cardMetaData: any;
  cardTitle: string;
  ngOnInit(): void {
    if (this.cardMetaData && this.cardMetaData.cardTitle) {
      this.cardTitle = this.cardMetaData.cardTitle;
    }
  }

}
