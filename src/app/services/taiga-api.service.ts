import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class TaigaApiService {
  constructor(private http: HttpClient) {}

  getTasksList(projectId?: number, statusId?: number, assignedUserId?: number, createdByUserId?: number) {
    const url = 'https://api.taiga.io/api/v1/tasks';
    let params = new HttpParams().append('page_size', '200');
    if (projectId) { params = params.append('project', projectId.toString()); }
    if (statusId) { params = params.append('status', statusId.toString()); }
    if (assignedUserId) { params = params.append('assigned_to', assignedUserId.toString()); }
    if (createdByUserId) { params = params.append('owner', createdByUserId.toString()); }
    return this.http.get(url, { params });
  }

  getIssuesList(projectId?: number, statusId?: number, assignedUserId?: number, createdByUserId?: number) {
    const url = 'https://api.taiga.io/api/v1/issues';
    let params = new HttpParams().append('page_size', '200');
    if (projectId) { params = params.append('project', projectId.toString()); }
    if (statusId) { params = params.append('status', statusId.toString()); }
    if (assignedUserId) { params = params.append('assigned_to', assignedUserId.toString()); }
    if (createdByUserId) { params = params.append('owner', createdByUserId.toString()); }
    return this.http.get(url, { params });
  }

  getProjectList(userId: string) {
    const url = 'https://api.taiga.io/api/v1/projects';
    let params = new HttpParams().append('member', userId);
    params = params.append('order_by', 'user_order');
    params = params.append('slight', 'true');
    return this.http.get(url, { params });
  }

  loginUser(username: string, password: string) {
    const type = 'normal';
    const url = 'https://api.taiga.io/api/v1/auth';
    return this.http.post(url, { username, password, type });
  }

  filterInfo(projectId: string, isIssues?: boolean) {
    const url = `https://api.taiga.io/api/v1/${isIssues ? 'issues' : 'tasks'}/filters_data`;
    const params = new HttpParams().append('project', projectId);
    return this.http.get(url, { params });
  }

  changeStatus(itemId: number, version: number, status: number, isIssues?: boolean) {
    const url = `https://api.taiga.io/api/v1/${isIssues ? 'issues' : 'tasks'}/${itemId}`;
    const sampleObj = { status, version };
    return this.http.patch(url, sampleObj);
  }
}
