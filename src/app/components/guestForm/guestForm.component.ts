import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Guest } from 'src/app/interfaces/guest.interface';
import { DateValidatorService } from 'src/app/services/dateValidator.service';
import { saveGuestData } from 'src/app/store/meal/actions/meal.actions';
import { selectIsLoading } from 'src/app/store/meal/selectors/meal-schedule.selectors';

@Component({
  selector: 'guest-form',
  templateUrl: './guestForm.component.html',
  styleUrls: ['./guestForm.component.scss'],
})
export class GuestForm implements OnInit {
  isLoading$: Observable<boolean>;

  @Input() name: string = "";
  @Input() startDate: string = "";
  @Input() endDate: string = "";
  @Input() isFoodSensitive: boolean = false;


  constructor(private store: Store, private dateValidator: DateValidatorService) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
  }

  ngOnInit() {}

  public saveData() {
    if (this.name && this.startDate && this.endDate && this.dateValidator.isDateRangeValid(this.startDate, this.endDate)) {
      const newGuest = {
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        isFoodSensitive: this.isFoodSensitive
      } as Guest;
      const jsonData = JSON.stringify(newGuest);
      this.store.dispatch(saveGuestData({guest: jsonData}));
      this.name = "";
      this.startDate = "";
      this.endDate = "";
      this.isFoodSensitive = false;
    }
  }
}
