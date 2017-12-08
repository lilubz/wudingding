import { Component, OnInit, OnDestroy, } from '@angular/core';
import { AssetCategoryService, } from './asset-category.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'asset-category',
    templateUrl: './asset-category.component.html',
    styleUrls: ['./asset-category.component.scss']
})
export class AssetCategoryComponent implements OnInit, OnDestroy {

    constructor(private _service: AssetCategoryService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
