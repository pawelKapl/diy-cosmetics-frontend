import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToolService} from '../../services/tool.service';

@Component({
  selector: 'app-add-new-tool-form',
  templateUrl: './add-new-tool-form.component.html',
  styleUrls: ['./add-new-tool-form.component.css']
})
export class AddNewToolFormComponent implements OnInit {

  toolFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private toolService: ToolService) { }

  ngOnInit(): void {
    this.toolFormGroup = this.formBuilder.group({
      tool: this.formBuilder.group({
        name: '',
        description: ''
      })
    });
  }

  onSubmit() {
    console.log(this.toolFormGroup.get('tool').value);
    this.toolService.saveTool(this.toolFormGroup.get('tool'));
  }
}
