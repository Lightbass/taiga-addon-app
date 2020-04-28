import { Component, OnInit } from '@angular/core';
import { TaigaApiService } from '../services/taiga-api.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: any[];

  constructor(private apiService: TaigaApiService) { }

  ngOnInit() {
    this.apiService.getProjectList(localStorage.getItem('id')).subscribe((res: any[]) => this.projects = res);
  }

}
