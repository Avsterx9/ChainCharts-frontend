import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-app-view',
    standalone: true,
    templateUrl: './app-view.component.html',
    styleUrl: './app-view.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, HeaderComponent, NavbarComponent]
})
export class AppViewComponent {

}
