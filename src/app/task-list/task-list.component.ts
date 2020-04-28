import { Component, OnInit } from '@angular/core';
import { TaigaApiService } from '../services/taiga-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any[];
  filterInfo: any;

  statusId: number;
  assignedUserId: number;
  createdByUserId: number;

  constructor(private apiService: TaigaApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.filterInfo(this.route.snapshot.params.id).subscribe(res => this.filterInfo = res);
    this.makeRequest();
  }

  makeRequest() {
    this.apiService.getTasksList(this.route.snapshot.params.id, this.statusId, this.assignedUserId, this.createdByUserId)
      .subscribe((res: any[]) => this.tasks = res);
  }

  selectAssignedUser(event) {
    this.assignedUserId = event.target.value;
    this.makeRequest();
  }

  selectCreatedByUser(event) {
    this.createdByUserId = event.target.value;
    this.makeRequest();
  }

  selectStatus(event) {
    this.statusId = event.target.value;
    this.makeRequest();
  }

}
