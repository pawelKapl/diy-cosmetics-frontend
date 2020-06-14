import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-popup-modal',
  templateUrl: './image-popup-modal.component.html',
  styleUrls: ['./image-popup-modal.component.css']
})
export class ImagePopupModalComponent implements OnInit {

  @Input()
  imageURL: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
