import { Component, OnInit } from '@angular/core';
import { concatMap, delay, from, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'concatMap-example-angular';

  observableArray = [
    [1, 3, 4, 5, 6, 7, 8, 9],
    ['apple', 'banana'],
    [3, 5, 6, 7, 8, 9],
  ];

  requestData = (data: any) =>
    from(Promise.resolve(data)).pipe(delay(Math.random() * 100));

  ngOnInit(): void {
    from(this.observableArray)
      .pipe(mergeMap((data) => this.requestData(data)))
      .subscribe((res) => {
        console.log('MERGE MAP RESPONSE');
        console.log(res);
      });
    from(this.observableArray)
      .pipe(concatMap((data) => this.requestData(data)))
      .subscribe((res: any) => {
        console.log('CONCAT MAP RESPONSE');
        console.log(res);
      });
  }
}
