import {Component, OnInit} from '@angular/core';
import {PaperConfig} from '../../../models/paper-config.interface';
import {StorageService} from '../../../../core/services/storage.service';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {Operator} from '../../../models/operator.type';
import {UtilService} from '../../../../common/services/util.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Difficulty, DifficultyValues} from '../../../models/paper-difficulty';
import {FormType} from '../../../../common/models/form-type';

const defaultConfig: PaperConfig = {
  id: '',
  name: '',
  difficulty: 'Medium',
  timePerQuestion: 5,
  operators: ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'],
  totalQuestions: 5,
  addition: {
    min: 1, max: 10
  },
  subtraction: {
    min: 1, max: 10
  },
  multiplication: {
    min: 1, max: 10
  },
  division: {
    min: 1, max: 10
  },
  createdOn: new Date()
}

class Message {
  type: 'SUCCESS' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

@Component({
  selector: 'app-paper-config',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditConfigComponent implements OnInit {
  config: PaperConfig;
  saveMessage: Message | null = null;

  configForm = this.buildForm();
  submitted = false;
  type: FormType;

  difficulties: Difficulty[] = DifficultyValues;


  constructor(private storage: StorageService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id') || '';
      if (id === '') {
        this.type = 'Error';
      }
      if (id === 'new') {
        this.type = 'New';
        this.setupForm(defaultConfig);
      } else {
        this.type = 'Edit';
        const config = this.storage.getConfig(id);
        if (!config) {
          this.type = 'Error'
          return
        }
        this.setupForm(config);
      }
    })
  }

  private buildForm() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      difficulty: ['Medium'],
      totalQuestions: [10],
      timePerQuestion: [10],
      operators: [['ADD'], [this.validateOperators()]],
      addition: this.fb.group({
        min: [2],
        max: [20],
      }),
      subtraction: this.fb.group({
        min: [2],
        max: [20],
      }),
      multiplication: this.fb.group({
        min: [2],
        max: [20],
      }),
      division: this.fb.group({
        min: [2],
        max: [20],
      }),
    })
  }

  private setupForm(config: PaperConfig) {
    this.config = config;
    // noinspection TypeScriptValidateTypes
    this.configForm.patchValue(this.config);
    this.configForm.valueChanges.subscribe(value => this.updateConfig(value))
  }

  private updateConfig(value: any): void {
    this.config.name = value.name?.toString() || '';
    this.config.difficulty = value.difficulty;
    this.config.totalQuestions = value.totalQuestions;
    this.config.operators = [...(value.operators as Operator[])];
    this.config.timePerQuestion = value.timePerQuestion || 10;
    this.config.addition.min = value.addition?.min || 1;
    this.config.addition.max = value.addition?.max || 10;
    this.config.subtraction.min = value.subtraction?.min || 1;
    this.config.subtraction.max = value.subtraction?.max || 10;
    this.config.multiplication.min = value.multiplication?.min || 1;
    this.config.multiplication.max = value.multiplication?.max || 10;
    this.config.division.min = value.division?.min || 1;
    this.config.division.max = value.division?.max || 10;
  }

  save() {
    this.submitted = true;
    this.saveMessage = null;
    if (this.configForm.valid) {
      if (!this.config.id || this.config.id.trim() === '') {
        this.config.id = UtilService.uuid();
      }
      this.config.modifiedOn = new Date();
      this.storage.saveConfig(this.config);

      this.showSaveMessage();

      if (this.type === 'New') {
        this.navigateToCurrentConfig();
      }
    }
  }

  onNewPaper() {
    this.save();
    if (this.configForm.valid) {
      this.navigateToNewPaper();
    }
  }

  showSaveMessage() {
    this.saveMessage = new Message()
    this.saveMessage.type = 'SUCCESS';
    this.saveMessage.message = 'Config Saved Successfully!'
    setTimeout(() => {
      document.getElementById('save-message')?.scrollIntoView();
      setTimeout(() => this.saveMessage = null, 5000);
    }, 1);

  }

  navigateToNew() {
    this.router.navigate(['../new'], {relativeTo: this.route}).then();
  }

  navigateToNewPaper() {
    this.router.navigate(['../../new'],
      {relativeTo: this.route, queryParams: {config: this.config.id}}
    ).then();
  }

  navigateToCurrentConfig() {
    this.router.navigate(['..', this.config.id], {
      relativeTo: this.route
    }).then();
  }

  validateOperators() {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value.length > 0) ? null : {operators: {value: control.value}};
    }
  }

  showInputError() {
    const nameErrors = this.configForm.controls.name.errors;
    return (this.configForm.invalid && this.submitted)
      && (nameErrors?.['required'] || nameErrors?.['minlength'])
  }
}
