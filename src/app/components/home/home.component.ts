import { Component, OnInit } from '@angular/core';
import { CronService } from 'src/app/services/cron.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private cron: CronService) { }

  ngOnInit(): void {
      this.dataService.setLocalData();
  }

}
