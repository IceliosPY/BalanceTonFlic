import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Incident } from '../models/incident';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly http = inject(HttpClient);
  private readonly incidents = this.http.get<readonly Incident[]>('data/incidents.json').pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getIncidents(): Observable<readonly Incident[]> {
    return this.incidents;
  }
}
