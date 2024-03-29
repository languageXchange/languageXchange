import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetLanguagePageRoutingModule } from './target-language-routing.module';

import { TargetLanguagePage } from './target-language.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetLanguagePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TargetLanguagePage],
})
export class TargetLanguagePageModule {}
