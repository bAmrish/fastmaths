import {Component, OnInit, ViewChild} from '@angular/core';
import {FormType} from '../../../common/models/form-type';
import {StorageService} from '../../../storage/storage.service';
import {AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserRole, UserRoleValues, UserType, UserTypeValues} from '../../models/user.interface';

const defaultUser: User = {
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  type: 'Student',
  role: 'User',
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
  roles: UserRole[];

  userNameShort = false;
  userNameRequired = false;
  lastNameRequired = false;
  firstNameRequired = false;
  passwordRequired = false;
  passwordShort = false;
  confirmPasswordMatch = false;

  constructor(private storage: StorageService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id') || '';
      if (id === '') {
        this.formType = 'Error';
        return;
      }
      if (id === 'new') {
        this.formType = 'New';
        this.user = defaultUser;
      } else {
        this.formType = 'Edit';
        const user = this.storage.getUser(id);
        if (!user) {
          this.formType = 'Error'
          return
        }
      }
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
    const types = [...UserTypeValues];
    types.splice(types.indexOf('Internal'))
    this.types = types;
    const roles = [...UserRoleValues];
    roles.splice(roles.indexOf('Super'))
    this.roles = roles;
    this.userForm.patchValue(user);
    this.userForm.valueChanges.subscribe(value => this.updateUser(value))
  }

  private updateUser(value: any): void {
    this.user.firstName = value.firstName || '';
    this.user.lastName = value.lastName || '';
    this.user.type = value.type;
    this.user.role = this.getRole(this.user.type);

    if(this.frmCtrl.submitted) {
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
    }

  }

  private validateConfirmPassword(control: AbstractControl): ValidationErrors | null {
    if (this.formType === 'Edit') return null;
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(!password) return null;
    return password !== confirmPassword ? {confirmPasswordMatchError: true} : null
  }

  onSave() {
    this.updateUser(this.user);
    console.log(this);
  }

  getRole(type: UserType): UserRole {
    if (type === 'Parent' || type === 'Teacher') return 'Admin';
    return 'User';
  }
}
