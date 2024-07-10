export interface Manager {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
  }
  
 export interface Restaurant {
    capacity: number;
    closingTime: string;
    createdAt: string;
    cuisines: string;
    id: number;
    location: string;
    manager: Manager;
    name: string;
    openingTime: string;
    updatedAt: string;
    workingDays: string[];
  }
  
export interface Table {
    capacity: number;
    id: number;
    restaurant: Restaurant;
    tableNumber: number;
    tableType: string;
  }
  