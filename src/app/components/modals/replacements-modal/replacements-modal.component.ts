import {Component, Input, OnInit} from '@angular/core';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Ingredient} from '../../../models/ingredient';
import {IngredientReplacementsModalComponent} from '../../ingredient-replacements-modal/ingredient-replacements-modal.component';

@Component({
  selector: 'app-replacements-modal',
  templateUrl: './replacements-modal.component.html',
  styleUrls: ['./replacements-modal.component.css']
})
export class ReplacementsModalComponent implements OnInit {

  modalRef: MDBModalRef;

  @Input()
  replacements: Ingredient[];


  constructor(private modalService: MDBModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.show(IngredientReplacementsModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-dialog-centered modal-sm',
      containerClass: '',
      animated: true,
      data: {
        replacements: this.replacements
      }
    });
    this.modalRef.content.action.subscribe((result: boolean) => this.modalRef.hide());
  }

  ngOnInit(): void {

  }

}
