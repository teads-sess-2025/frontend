import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'sess-header',
    imports: [RouterLink],
    templateUrl: 'header.component.html',
    styleUrl: 'header.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
