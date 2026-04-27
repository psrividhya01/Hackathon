import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantService } from '../../../services/varient-service';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  constructor(public variantService: VariantService) {}

  ngOnInit() {
    this.variantService.getAll();
  }
}
