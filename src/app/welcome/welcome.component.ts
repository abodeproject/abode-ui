import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isLinear = true;

  serverSelectFormGroup: FormGroup;
  serverLoginFormGroup: FormGroup;
  selectDeviceFormGroup: FormGroup;
  selectInterfaceFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.serverSelectFormGroup = this._formBuilder.group({
      serverCtrl: ['', Validators.required]
    });
    this.serverLoginFormGroup = this._formBuilder.group({
      userCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]
    });
    this.selectDeviceFormGroup = this._formBuilder.group({
      deviceCtrl: ['', Validators.required],
    });
    this.selectInterfaceFormGroup = this._formBuilder.group({
      interfaceCtrl: ['', Validators.required],
    });
  }

}
