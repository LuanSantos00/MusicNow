import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goGithub(){
    window.open('https://github.com/LuanSantos00?tab=repositories','_blank');
  }
  goLinkkedin(){
    window.open('https://www.linkedin.com/in/luan-santos-997112208/','_blank');
  }
}
