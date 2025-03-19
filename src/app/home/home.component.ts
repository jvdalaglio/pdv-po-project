import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PoChartModule, PoChartOptions, PoChartSerie, PoChartType, PoDividerModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoChartModule, PoDividerModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  evolutionOfCoffeeAndSomeCompetitors: Array<PoChartSerie> = [
    { label: '2014', data: [91, 40, 42], type: PoChartType.Column },
    { label: '2017', data: [93, 52, 18], type: PoChartType.Column },
    { label: '2020', data: [95, 21, -17], type: PoChartType.Column },
    { label: 'Coffee consumption in Brazil', data: [34, 27, 79], type: PoChartType.Line, color: 'color-10' }
  ];
  categoriesColumn: Array<string> = ['coffee', 'chocolate', 'tea'];
  optionsColumn: PoChartOptions = {
    axis: {
      minRange: -20,
      maxRange: 100,
      gridLines: 7
    }
  };
}
