import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-order-success',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './order-success.html',
  styleUrls: ['./order-success.css'],
})
export class OrderSuccess {

}
