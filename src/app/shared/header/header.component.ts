import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adjust the path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  currentUserName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize login state on page load (or refresh)
    this.authService.initializeLoginState();

    // Subscribe to authentication status to handle login state
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      // Get the current user's name
      this.authService.currentUserName$.subscribe((name) => {
        this.currentUserName = name;
      });

      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {

    // Reload the page
    location.reload();  // This will refresh the entire page
  }
}
