import { Component } from '@angular/core';

class Hero {
  id: number;
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './heros.html'
  styleUrls: ['./app.component.css'],
})

export class AppComponent { // 此项为导出的方法等 给双向绑定用 {;;}
  title= 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: '李隆基',
  };
}
