import {Component, OnInit} from '@angular/core';
import {Tool} from '../../models/tool';
import {ToolService} from '../../services/tool.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.css']
})
export class ToolsListComponent implements OnInit {

  tools: Tool[] = [];

  constructor(private toolService: ToolService,
              private modal: ConfirmationModalComponent) {
  }

  ngOnInit(): void {
    this.toolService.operationSuccessEvent.subscribe(() => this.getToolList());
    this.getToolList();
  }

  private getToolList() {
    this.toolService.getToolsList().subscribe(data => this.tools = data);
  }

  deleteTool(tool: Tool) {
    this.toolService.deleteTool(tool);
  }

  open(content) {
    this.modal.open(content);
  }
}
