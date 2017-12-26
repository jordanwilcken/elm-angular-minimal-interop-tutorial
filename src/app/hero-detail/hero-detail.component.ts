//delete this comment

import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

import * as Elm from './compiled-elm.js';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit, AfterViewChecked {
  @Input() hero: Hero;
  @ViewChild('elm') elmContainer: ElementRef;
  elmApp: any;
  fightOutcome: string;

  constructor(
    private myElement: ElementRef,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
  }

  ngAfterViewChecked() {

  }

  fight() {
    this.fightOutcome = `${this.hero.name} uses heat vision on ${this.hero.archNemesis}.  It's super effective!`
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
