import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchId: number | null = null;

  constructor(private router: Router) { }

  searchUser(): void {
    if (this.searchId !== null) {
      this.router.navigate(['/user', this.searchId]);
      this.searchId = null; 
    }
  }
}