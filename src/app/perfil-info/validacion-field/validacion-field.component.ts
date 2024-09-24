import { Component, Input } from '@angular/core'

@Component({
  selector: 'readapp-validacion-field',
  standalone: true,
  imports: [],
  templateUrl: './validacion-field.component.html',
  styleUrl: './validacion-field.component.css'
})
export class ValidacionFieldComponent {
  @Input() domainElement!: DomainElement
  @Input() field!: string
}

export type DomainElement = {
  errorsFrom(field: string): string
  hasErrors(field: string): boolean
}

