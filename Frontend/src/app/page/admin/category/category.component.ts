import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../services/categorie-service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  isEditing = signal(false);
  editId = signal<number | null>(null);
  name = signal('');
  
  constructor(public categoryService: CategorieService) {}

  ngOnInit() {
    this.categoryService.getAll();
  }

  onSubmit() {
    if (!this.name()) return;
    
    if (this.isEditing() && this.editId()) {
      this.categoryService.update(this.editId()!, { name: this.name() }).subscribe(() => {
        this.reset();
        this.categoryService.getAll();
      });
    } else {
      this.categoryService.create({ name: this.name() }).subscribe(() => {
        this.reset();
        this.categoryService.getAll();
      });
    }
  }

  edit(cat: Category) {
    this.isEditing.set(true);
    this.editId.set(cat.id);
    this.name.set(cat.name);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.categoryService.getAll();
      });
    }
  }

  reset() {
    this.isEditing.set(false);
    this.editId.set(null);
    this.name.set('');
  }
}
