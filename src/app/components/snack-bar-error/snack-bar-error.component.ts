import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-error',
  templateUrl: './snack-bar-error.component.html',
  styleUrls: ['./snack-bar-error.component.css']
})
export class SnackBarErrorComponent implements OnInit {

  constructor(    
    public sbRef: MatSnackBarRef<SnackBarErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  ngOnInit(): void {
  }

}
