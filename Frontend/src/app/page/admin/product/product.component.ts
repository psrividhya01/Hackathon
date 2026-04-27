import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategorieService } from '../../../services/categorie-service';
import { BrandService } from '../../../services/brand-service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  isEditing = signal(false);
  editId = signal<number | null>(null);
  
  formData = signal({
    name: '',
    categoryId: 0,
    brandId: 0
  });

  constructor(
    public productService: ProductService,
    public categoryService: CategorieService,
    public brandService: BrandService
  ) {}

  ngOnInit() {
    this.productService.getAll();
    this.categoryService.getAll();
    this.brandService.getAll();
  }

  onSubmit() {
    const data = this.formData();
    if (!data.name || !data.categoryId || !data.brandId) return;

    if (this.isEditing() && this.editId()) {
      this.productService.update(this.editId()!, data).subscribe(() => {
        this.reset();
        this.productService.getAll();
      });
    } else {
      this.productService.create(data).subscribe(() => {
        this.reset();
        this.productService.getAll();
      });
    }
  }

  edit(p: Product) {
    this.isEditing.set(true);
    this.editId.set(p.id);
    this.formData.set({
      name: p.name,
      categoryId: p.categoryId,
      brandId: p.brandId
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        this.productService.getAll();
      });
    }
  }

  reset() {
    this.isEditing.set(false);
    this.editId.set(null);
    this.formData.set({ name: '', categoryId: 0, brandId: 0 });
  }

  updateField(field: string, value: any) {
    this.formData.update(d => ({ ...d, [field]: value }));
  }
}
