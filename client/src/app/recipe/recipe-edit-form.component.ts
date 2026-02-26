import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipe-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['../app.component.css', './recipe-edit-form.component.css' ]
})
export class RecipeEditFormComponent {
  recipeForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    note: new FormControl(''),
  });

  get title() {
    return this.recipeForm.get('title');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get note() {
    return this.recipeForm.get('note');
  }

  onSubmit() {
    var recipeData: Recipe = {
      title: this.title?.value ? this.title.value : '',
      description: this.description?.value ? this.description.value : '',
      note: this.note?.value ? this.note.value : '',
      id: 0,
      image: '',
    }
  
    console.log(`Recipe.onSubmit> '${JSON.stringify(recipeData)}'`)
  }
}
