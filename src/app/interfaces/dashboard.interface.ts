export interface DonutChart {
    name: string;
    value: number;
  }
  
  export interface BarChart {
    name: string;
    value: number;
  }
  
  export interface User {
    firstName: string;
    lastName: string;
    username: string;
  }
  
  export interface DashboardData {
    success: boolean;
    chartDonut: DonutChart[];
    chartBar: BarChart[];
    tableUsers: User[];
  }
  