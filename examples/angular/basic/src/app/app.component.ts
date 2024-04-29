import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  signal,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import {
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
} from '@tanstack/angular-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => `<i>${info.getValue<string>()}</i>`,
    header: () => `<span>Last Name</span>`,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: info => info.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => `<span>Visits</span>`,
    footer: info => info.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: info => info.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: info => info.column.id,
  },
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlexRenderDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true
  }))

  ngOnInit() {
    this.data.set(defaultData);
  }

  rerender() {
    this.data.set(defaultData);
  }
}
