import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'sess-about-view',
    templateUrl: 'about.view.html',
    styleUrl: 'about.view.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutView {

}
