import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VariantService } from '../../../services/varient-service';
import { ProductService } from '../../../services/product.service';
import { ProductVariant } from '../../../models/product-variant.model';

@Component({
  selector: 'app-admin-variant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.css'],
})
export class VariantComponent implements OnInit {
  isEditing = signal(false);
  editId = signal<number | null>(null);
  
  formData = signal({
    productId: 0,
    variantName: '',
    price: 0
  });

  constructor(
    public variantService: VariantService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.variantService.getAll();
    this.productService.getAll();
  }

  onSubmit() {
    const data = this.formData();
    if (!data.productId || !data.variantName || data.price <= 0) return;

    if (this.isEditing() && this.editId()) {
      this.variantService.update(this.editId()!, data).subscribe(() => {
        this.reset();
        this.variantService.getAll();
      });
    } else {
      this.variantService.create(data).subscribe(() => {
        this.reset();
        this.variantService.getAll();
      });
    }
  }

  edit(v: ProductVariant) {
    this.isEditing.set(true);
    this.editId.set(v.id);
    this.formData.set({
      productId: v.productId,
      variantName: v.variantName,
      price: v.price
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this variant?')) {
      this.variantService.delete(id).subscribe(() => {
        this.variantService.getAll();
      });
    }
  }

  reset() {
    this.isEditing.set(false);
    this.editId.set(null);
    this.formData.set({ productId: 0, variantName: '', price: 0 });
  }

  updateField(field: string, value: any) {
    this.formData.update(d => ({ ...d, [field]: value }));
  }
}
