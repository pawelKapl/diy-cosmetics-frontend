import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToolService} from '../../services/tool.service';
import {Tool} from '../../models/tool';

@Component({
  selector: 'app-add-new-tool-form',
  templateUrl: './add-new-tool-form.component.html',
  styleUrls: ['./add-new-tool-form.component.css']
})
export class AddNewToolFormComponent implements OnInit {

  toolFormGroup: FormGroup;
  tool: Tool = new Tool();

  constructor(private formBuilder: FormBuilder, private toolService: ToolService) {
  }

  ngOnInit(): void {
    this.toolFormGroup = this.formBuilder.group({
      name: new FormControl(this.tool.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
      ),
      description: new FormControl(this.tool.description)
    });
  }

  get name() {
    return this.toolFormGroup.get('name');
  }

  onSubmit() {
    console.log(this.toolFormGroup.value);
    this.toolService.saveTool(this.toolFormGroup);
  }
}
