import {Component, OnInit} from '@angular/core';
import {PaperConfig} from '../../models/paper-config.interface';
import {StorageService} from '../../../storage/storage.service';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {Operator} from '../../models/operator.type';
import {UtilService} from '../../services/util.service';
import {ActivatedRoute, Router} from '@angular/router';

type FormType = 'New' | 'Edit' | 'Error'

const defaultConfig: PaperConfig = {
  id: '',
  name: '',
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
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class PaperConfigComponent implements OnInit {
  config: PaperConfig;
  saveMessage: Message | null = null;

  configForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
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
  submitted = false;
  type: FormType;

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
        const config = this.storage.get(id);
        if (!config) {
          this.type = 'Error'
        }
        this.setupForm(config);
      }
    })
  }

  private setupForm(config: PaperConfig) {
    this.config = config;
    this.configForm.patchValue(this.config);
    this.configForm.valueChanges.subscribe(value => this.updateConfig(value))
  }

  private updateConfig(value: any): void {
    this.config.name = value.name?.toString() || '';
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
      this.storage.save(this.config.id, this.config);

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
    setTimeout(()=>{
      document.getElementById("save-message")?.scrollIntoView();
      setTimeout(() => this.saveMessage = null, 5000);
    }, 1);

  }

  navigateToNew() {
    this.router.navigate(['../new'], {relativeTo: this.route}).then();
  }

  navigateToNewPaper() {
    this.router.navigate(['../../paper/new'],
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
}
