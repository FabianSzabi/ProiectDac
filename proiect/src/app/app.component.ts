import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from './core/helpers/storage.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    
  }

  constructor(private router: Router){}

  title = 'project-hospital';
}
