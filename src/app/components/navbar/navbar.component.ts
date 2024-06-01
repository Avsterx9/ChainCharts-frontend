import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        SearchBarComponent,
        CommonModule,
        MatIconModule
    ]
})
export class NavbarComponent {

}
