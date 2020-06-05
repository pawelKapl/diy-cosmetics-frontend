import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToolService} from '../../services/tool.service';
import {Tool} from '../../models/tool';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-new-tool-form',
  templateUrl: './add-new-tool-form.component.html',
  styleUrls: ['./add-new-tool-form.component.css']
})
export class AddNewToolFormComponent implements OnInit {

  toolFormGroup: FormGroup;
  tool: Tool = new Tool();

  private promise: Promise<unknown>;
  private update: boolean;

  constructor(private formBuilder: FormBuilder,
              private toolService: ToolService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.populatingIfUpdate());
  }

  private getFormGroup() {
    this.toolFormGroup = this.formBuilder.group({
      name: new FormControl(this.tool.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
      ),
      description: new FormControl(this.tool.description)
    });
  }

  private populatingIfUpdate() {
    this.update = this.route.snapshot.paramMap.has('id');

    if (this.update) {
      let id: number = +this.route.snapshot.paramMap.get('id');
      this.promise = new Promise((resolve) => {
        this.toolService.getToolById(id).subscribe(data => {
          this.tool = data, resolve(data);
        });
      });
      this.promise.then(() => this.getFormGroup());
    } else {
      this.getFormGroup();
    }
  }

  get name() {
    return this.toolFormGroup.get('name');
  }

  onSubmit() {
    console.log('Handling submit button', this.toolFormGroup.value);
    if (this.update) {
      this.toolService.updateTool(this.toolFormGroup);
    } else {
      this.toolService.saveTool(this.toolFormGroup);
    }
  }
}
