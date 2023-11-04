import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})

export class CrearCuentaPage  {
  
  @ViewChild(IonCard, { read: ElementRef }) cardElements: any;
 

  private animation: Animation;

  

  constructor(private animationCtrl: AnimationController) {this.animation = this.animationCtrl.create();}

  
  
  ngAfterViewInit() {
    const cardA = this.animationCtrl
      .create()
      .addElement(this.cardElements.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.5) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(0) ' },
      ]);
  
      const cardB = this.animationCtrl
      .create()
      .addElement(this.cardElements.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);

   

    this.animation = this.animationCtrl
      .create()
      .duration(2000)
      .iterations(Infinity)
      .addAnimation([cardA, cardB]);
  }

  play() {
    this.animation.play();
  }

 

  stop() {
    this.animation.stop();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.animation.play();
    }, 100);
  }
  ionViewWillLeave() {
    if (this.animation) {
      this.animation.stop();
    }}

    
  
    
  


}
