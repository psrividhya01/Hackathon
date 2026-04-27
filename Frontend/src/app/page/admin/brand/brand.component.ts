import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brand-service';
import { Brand } from '../../../models/brand.model';

@Component({
  selector: 'app-admin-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  isEditing = signal(false);
  editId = signal<number | null>(null);
  name = signal('');
  
  constructor(public brandService: BrandService) {}

  ngOnInit() {
    this.brandService.getAll();
  }

  onSubmit() {
    if (!this.name()) return;
    
    if (this.isEditing() && this.editId()) {
      this.brandService.update(this.editId()!, { name: this.name() }).subscribe(() => {
        this.reset();
        this.brandService.getAll();
      });
    } else {
      this.brandService.create({ name: this.name() }).subscribe(() => {
        this.reset();
        this.brandService.getAll();
      });
    }
  }

  edit(brand: Brand) {
    this.isEditing.set(true);
    this.editId.set(brand.id);
    this.name.set(brand.name);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.delete(id).subscribe(() => {
        this.brandService.getAll();
      });
    }
  }

  reset() {
    this.isEditing.set(false);
    this.editId.set(null);
    this.name.set('');
  }
}
