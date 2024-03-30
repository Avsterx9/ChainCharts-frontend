import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SearchBarComponent]
})
export class NavbarComponent {

}
