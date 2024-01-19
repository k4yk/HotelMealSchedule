import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class DateValidatorService {
    public isDateRangeValid(startDate: string, endDate: string): boolean {
        const startDateDate = new Date(startDate);
        const endDateDate = new Date(endDate);
        return endDateDate > startDateDate;
    }
}