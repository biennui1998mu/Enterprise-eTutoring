import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { User, USER_TYPE } from '../../../interface/User';
import { MatChipInputEvent } from '@angular/material/chips';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TokenService } from '../../../services/token.service';
import { UsersSystemService } from '../../../services/state/client-tutor';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit {
  @ViewChild('userSearchInput')
  userSearchInput: ElementRef<HTMLInputElement>;
  @ViewChild('managerAutoComplete')
  userAutocompleteInput: MatAutocomplete;

  @Input()
  formUserPassing: AbstractControl;
  formSearchUser: FormControl = new FormControl(
    { value: '' },
    [Validators.required],
  );

  @Input()
  userType: USER_TYPE;
  USER_TYPE = USER_TYPE;

  filteredUser: User[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userFormSearch = new FormControl();

  constructor(
    private tokenService: TokenService,
    private service: UsersSystemService,
  ) {
  }

  ngOnInit(): void {
    this.searchUserFormSub();
    this.formUserPassing.valueChanges.subscribe(data => {
      if (data) {
        this.formSearchUser.disable();
      } else {
        this.formSearchUser.enable();
      }
    });
  }

  removeUser() {
    this.formSearchUser.setValue(null);
    this.formUserPassing.setValue(null);
  }

  addUser($event: MatChipInputEvent) {
    if ($event.value.length < 2) {
      console.log('Must have at least 2 characters!');
    } else if (this.filteredUser.length == 0) {
      console.log('No result found to add.');
    } else if (
      $event.value.length > 2 &&
      this.filteredUser.length > 0 &&
      !this.formSearchUser.value
    ) {
      const newUser = this.filteredUser[0];
      this.addManagerToForm(newUser);
    }
  }

  selectedManager(event: MatAutocompleteSelectedEvent): void {
    if (!this.formUserPassing.value) {
      const newUser = event.option.value as User;
      this.addManagerToForm(newUser);
    }
  }

  private addManagerToForm(newUser: User) {
    this.userSearchInput.nativeElement.value = '';
    this.userFormSearch.setValue(null);
    this.formUserPassing.setValue(newUser);
  }

  private searchUserFormSub() {
    this.userFormSearch.valueChanges
      .pipe(
        debounceTime(200),
        filter((input: string | null) => input && input.length > 1),
        distinctUntilChanged(),
        switchMap(value => this.service.find(value, this.userType)),
      ).subscribe(
      listUser => this.filteredUser = listUser,
    );
  }
}
