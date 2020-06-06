import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {StepService} from '../../services/step.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-new-step',
  templateUrl: './add-new-step.component.html',
  styleUrls: ['./add-new-step.component.css']
})
export class AddNewStepComponent implements OnInit {

  @Input()
  recipeId: number;

  stepForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modal: ConfirmationModalComponent,
              private stepService: StepService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stepForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      detail: new FormControl('')
    });
  }

  addStep() {
    this.stepService.addStep(this.recipeId, this.stepForm);
  }

  get name() {
    return this.stepForm.get('name');
  }

  open(content) {
    this.modal.open(content);
  }

  reload() {
    setTimeout(() => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([`/recipe/${this.recipeId}`])), 150);
  }

}
