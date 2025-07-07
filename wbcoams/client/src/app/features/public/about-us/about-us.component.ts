import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  // Company statistics
  stats = [
    { icon: 'calendar_today', value: '25+', label: 'Years of Experience' },
    { icon: 'people', value: '1000+', label: 'Happy Customers' },
    { icon: 'inventory', value: '5000+', label: 'Products Available' },
    { icon: 'verified', value: '100%', label: 'Quality Guaranteed' }
  ];

  // Team members
  team = [
    {
      name: 'John Doe',
      position: 'Managing Director',
      image: 'assets/team/team-1.jpg',
      description: 'Leading Capital Hardware with 20+ years of experience in the hardware industry.'
    },
    {
      name: 'Jane Smith',
      position: 'Operations Manager',
      image: 'assets/team/team-2.jpg',
      description: 'Ensuring smooth operations and excellent customer service across all departments.'
    },
    {
      name: 'Mike Johnson',
      position: 'Sales Manager',
      image: 'assets/team/team-3.jpg',
      description: 'Building strong relationships with customers and providing expert product guidance.'
    }
  ];

  // Core values
  values = [
    {
      icon: 'star',
      title: 'Quality',
      description: 'We provide only the highest quality hardware products from trusted manufacturers.'
    },
    {
      icon: 'handshake',
      title: 'Trust',
      description: 'Building long-term relationships based on trust, reliability, and exceptional service.'
    },
    {
      icon: 'support_agent',
      title: 'Service',
      description: 'Our expert team provides personalized support to meet your specific hardware needs.'
    },
    {
      icon: 'innovation',
      title: 'Innovation',
      description: 'Continuously evolving to bring you the latest hardware solutions and technologies.'
    }
  ];
}
