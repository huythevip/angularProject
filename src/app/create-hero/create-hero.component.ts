import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  hero: Hero;
  name: '';
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) { }

  ngOnInit() {
  }

  save() {
    // console.log('create');
    // console.log(this.name);
    const data = this.name;
    this.heroService.createHero(data)
    .subscribe(response => console.log(response));
  }

}
