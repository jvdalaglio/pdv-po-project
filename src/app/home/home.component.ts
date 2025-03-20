import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PoChartModule, PoChartOptions, PoChartSerie, PoChartType, PoDividerModule, PoFieldModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PoChartModule, PoDividerModule, PoFieldModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  public year: number = new Date().getFullYear();
  vendasPorMes: Array<PoChartSerie> = [
    { label: 'Janeiro', data: [3200], type: PoChartType.Column, color: 'color-07' },
    { label: 'Fevereiro', data: [6400], type: PoChartType.Column, color: 'color-10' },
    { label: 'Março', data: [5230], type: PoChartType.Column, color: 'color-07' },
    { label: 'Vendas por mês', data: [3200, 6400, 5320], type: PoChartType.Line, color: 'color-10' }
  ];
  categoriesColumn: Array<string> = ['Janeiro', 'Fevereiro', 'Março'];
  optionsColumn: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 10000,
      gridLines: 12
    }
  };

  changeYear(event: number) {
    this.year = event
    if(this.year === 2024) {
      this.vendasPorMes = [
        { label: 'Janeiro', data: [3200], type: PoChartType.Column, color: 'color-10' },
        { label: 'Fevereiro', data: [2500], type: PoChartType.Column, color: 'color-07' },
        { label: 'Março', data: [7500], type: PoChartType.Column, color: 'color-10' },
        { label: 'Abril', data: [7200], type: PoChartType.Column, color: 'color-07' },
        { label: 'Maio', data: [6000], type: PoChartType.Column, color: 'color-07' },
        { label: 'Junho', data: [8000], type: PoChartType.Column, color: 'color-10' },
        { label: 'Julho', data: [8000], type: PoChartType.Column, color: 'color-10' },
        { label: 'Agosto', data: [6000], type: PoChartType.Column, color: 'color-07' },
        { label: 'Setembro', data: [3800], type: PoChartType.Column, color: 'color-07' },
        { label: 'Outubro', data: [6500], type: PoChartType.Column, color: 'color-10' },
        { label: 'Novembro', data: [7850], type: PoChartType.Column, color: 'color-10' },
        { label: 'Dezembro', data: [6200], type: PoChartType.Column, color: 'color-07' },
        { label: 'Vendas por mês', data: [3200, 2500, 7500, 7200, 6000, 8000, 8000, 6000, 3800, 6500, 7850, 6200], type: PoChartType.Line, color: 'color-10' }
      ];
      this.categoriesColumn = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    } else {
      this.vendasPorMes = [
        { label: 'Janeiro', data: [3200], type: PoChartType.Column, color: 'color-07' },
        { label: 'Fevereiro', data: [6400], type: PoChartType.Column, color: 'color-10' },
        { label: 'Março', data: [5230], type: PoChartType.Column, color: 'color-07' },
        { label: 'Vendas por mês', data: [3200, 6400, 5320], type: PoChartType.Line, color: 'color-10' }
      ];
      this.categoriesColumn = ['Janeiro', 'Fevereiro', 'Março'];
      this.optionsColumn = {
        axis: {
          minRange: 0,
          maxRange: 10000,
          gridLines: 12
        }
      };
    }
  }
}
