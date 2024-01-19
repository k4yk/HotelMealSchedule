import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, retryWhen, take, throwError } from 'rxjs';
import { GuestList } from '../interfaces/guestList.interface';
import { Guest } from '../interfaces/guest.interface';

const TEST_API_URL = '/api/test';
const MEAL_API_URL = '/api/meal';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(private http: HttpClient) {}

  getTestData() {
    return this.http.get<any>(TEST_API_URL).pipe(
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  getMealData() {
    return this.http.get<any>(MEAL_API_URL).pipe(
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  saveMealData(dataJson: string) {
    return this.http.post<string>(MEAL_API_URL, dataJson, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).pipe(
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client-side
      console.warn('Client', err.message);
    } else {
      // server-side
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }

  public createGuestListFromData(jsonData: any): GuestList[] {
    const result: GuestList[] = [];
    jsonData.forEach((guest: Guest) => {
      const startDate = new Date(guest.startDate);
      const endDate = new Date(guest.endDate);
  
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0];
        const existingResult = result.find((res) => res.date === dateString);
  
        if (existingResult) {
          existingResult.breakfast.push(guest);
          existingResult.lunch.push(guest);
          existingResult.dinner.push(guest);
          existingResult.isAnyoneFoodSensitive = existingResult.breakfast.some(i => i.isFoodSensitive);
        } else {
          result.push({ date: dateString, breakfast: [guest], lunch: [guest], dinner: [guest], isAnyoneFoodSensitive: guest.isFoodSensitive });
        }
      }
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  
    return result;
  }
}
