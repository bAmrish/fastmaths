import {Component, OnInit, ViewChild} from '@angular/core';
import {FormType} from '../../../common/models/form-type';
import {AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserRole, UserType, UserTypeValues} from '../../models/user.interface';
import {UserService} from '../../services/user.service';

const defaultUser: User = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  type: 'Student',
  role: 'User',
  configs: {},
  papers: {},
  createdOn: new Date(),
  modifiedOn: new Date()
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User;
  @ViewChild('formCtrl') frmCtrl: NgForm;
  userForm: FormGroup;
  formType: FormType;
  types: UserType[];
  userNameShort = false;
  userNameRequired = false;
  lastNameRequired = false;
  firstNameRequired = false;
  passwordRequired = false;
  passwordShort = false;
  confirmPasswordMatch = false;
  submitted = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.route.snapshot?.url[0]?.path === 'new') {
      this.formType = 'New';
      this.user = {...defaultUser};
      this.setupForm(this.user);
      return;
    }
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id') || '';
      if (id === '') {
        this.formType = 'Error';
        this.notFoundRedirect();
        return;
      }

      this.formType = 'Edit';
      const user = this.userService.getUser(id);
      if (!user) {
        console.warn(`unable to find user with id ${id}`)
        this.formType = 'Error'
        this.notFoundRedirect();
        return
      }
      this.user = user;

      this.setupForm(this.user);
    })
  }

  buildForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      type: ['Parent'],
      role: ['Admin']
    }, {updateOn: 'submit', validators: [this.validateConfirmPassword.bind(this)]})
  }

  setupForm(user: User) {
    //Do this first before you do anything else with the user form.
    this.userForm.patchValue(user);

    if (this.formType == 'Edit') {
      this.userForm.get('username')?.disable();
    } else {
      this.userForm.get('username')?.enable();
    }
    //setup array of user types
    const types = [...UserTypeValues];
    types.splice(types.indexOf('Internal'))
    this.types = types;

    this.userForm.valueChanges.subscribe(value => this.updateUser(value))
  }

  private updateUser(value: any): void {
    this.user.username = value.username || '';
    this.user.firstName = value.firstName || '';
    this.user.lastName = value.lastName || '';
    this.user.type = value.type;
    this.user.role = this.getRole(this.user.type);
    this.validateControls()
  }

  private validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
    if (this.formType === 'Edit') return null;
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (!password) return null;
    return password !== confirmPassword ? {confirmPasswordMatchError: true} : null
  }

  onSave() {
    this.submitted = true;
    this.validateControls();
    if (this.userForm.invalid) {
      return;
    }

    this.updateUser(this.user);

    const password = this.userForm.get('password')?.value;

    if (this.formType === 'New') {
      this.user = this.userService.newUser(this.user, password);
      this.navigateToCurrentUser();
      return;
    }
    this.userService.saveUser(this.user);
  }

  getRole(type: UserType): UserRole {
    if (type === 'Parent' || type === 'Teacher') return 'Admin';
    return 'User';
  }

  validateControls() {
    if (this.submitted) {
      //username errors
      this.userNameRequired = this.userForm.get('username')?.errors?.['required'];
      this.userNameShort = this.userForm.get('username')?.errors?.['minlength'];

      //name errors
      this.firstNameRequired = this.userForm.get('firstName')?.errors?.['required'];
      this.lastNameRequired = this.userForm.get('lastName')?.errors?.['required'];

      //password errors
      this.passwordRequired = this.userForm.get('password')?.errors?.['required'];
      this.passwordShort = this.userForm.get('password')?.errors?.['minlength'];
      this.confirmPasswordMatch = this.userForm.errors?.['confirmPasswordMatchError'];

      //reset submitted
      this.submitted = false;
    }
  }

  navigateToCurrentUser() {
    this.router.navigate(['..', this.user.id], {relativeTo: this.route}).then();
  }

  notFoundRedirect() {
    this.router.navigate(['/', 'not-found'], {replaceUrl: true}).then();
  }
}
