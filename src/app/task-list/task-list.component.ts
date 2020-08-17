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

  isIssuesList = false;

  currentPage: number;
  countElements: number;
  pageSize = 200;

  constructor(private apiService: TaigaApiService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.getFilters();
    this.makeRequest();
  }

  getFilters() {
    this.apiService.filterInfo(this.route.snapshot.params.id, this.isIssuesList).subscribe(res => this.filterInfo = res);
  }

  makeRequest(page = 1) {
    if (this.isIssuesList) {
      this.apiService.getIssuesList(this.pageSize, page, this.route.snapshot.params.id, this.statusId, this.assignedUserId,
        this.createdByUserId)
        .subscribe((res) => {
          this.countElements = +res.headers.get('x-pagination-count');
          this.currentPage = +res.headers.get('x-pagination-current');
          this.tasks = res.body;
        });
    } else {
      this.apiService.getTasksList(this.pageSize, page, this.route.snapshot.params.id, this.statusId, this.assignedUserId,
        this.createdByUserId)
        .subscribe((res) => {
          this.countElements = +res.headers.get('x-pagination-count');
          this.currentPage = +res.headers.get('x-pagination-current');
          this.tasks = res.body;
        });
    }
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

  changeStatusForItem(event, task) {
    this.apiService.changeStatus(task.id, task.version, +event.target.value, this.isIssuesList).subscribe((res: any) => {
      task.status = res.status;
      task.version = res.version;
    });
  }

  changeListType() {
    this.isIssuesList = !this.isIssuesList;
    this.getFilters();
    this.clearFilters();
    this.makeRequest();
  }

  clearFilters() {
    this.statusId = undefined;
    this.assignedUserId = undefined;
    this.createdByUserId = undefined;
  }

  resetSearch() {
    this.clearFilters();
    this.makeRequest();
  }
}
