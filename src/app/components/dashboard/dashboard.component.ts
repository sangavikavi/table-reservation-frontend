import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  filter: string = '';
  isLoading: boolean = false; 

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.loadRestaurants();
    this.restaurantService.getRestaurants().subscribe(
      data => {
        console.log('API Data:', data);  // This will show the exact structure of the response
        this.restaurants = data.content;  
        console.log(this.restaurants);
        // Adjust based on actual API response structure
        this.filteredRestaurants = data.content;  // Adjust based on actual API response structure
      },
      error => {
        console.error('Error fetching restaurants', error);
      }
    );
  }

  loadRestaurants(): void {
    this.isLoading = true;
    this.restaurantService.getAllRestaurants(this.currentPage, this.pageSize, this.filter).subscribe({
      next: (data) => {
        this.restaurants = data.content;
        this.filteredRestaurants = this.restaurants; 
        this.totalItems = data.totalElements;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isLoading = false; 
      }
    });
  }

  onFilterChange(newFilter: string): void {
    this.filter = newFilter;
    this.currentPage = 0; // Reset to first page with new filter
    this.loadRestaurants();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadRestaurants();
  }


  onSearchChange(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      restaurant.cuisines.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
