import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay, of } from 'rxjs';
import {BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent {

  isHandset$ :Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
              .pipe(
                map(result => result.matches),
                shareReplay()
              )
  @Input() isLoggedIn$: Observable<boolean> = of(false)

  @Output() logout: EventEmitter<boolean> = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver) {
   }


   logOut() {
     this.logout.emit(true)
   }




}
