import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly http = inject(HttpClient);

  getIncidents(): Observable<readonly Incident[]> {
    return this.http.get<readonly Incident[]>('data/incidents.json');
  }
}
