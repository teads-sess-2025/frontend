import { WritableSignal } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap, catchError, finalize } from "rxjs/operators";

export abstract class BaseService {
    protected callService<T>(serviceCall: Observable<T>, loadingIndicator?: WritableSignal<boolean>): Promise<T> {
        const updateStatus: (status: boolean) => void = (status: boolean) => {
            loadingIndicator?.set(status);
        }

        return new Promise<T>((resolve, reject) => {
            updateStatus(true);
            serviceCall
                .pipe(
                    tap(resolve),
                    catchError(err => {
                        reject(err);
                        return of(`Error caught: ${err}`);
                    }),
                    finalize(() => updateStatus(false))
                )
                .subscribe();
        });
    }
}