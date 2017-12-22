import { CommonXHRService } from 'app/core/common-xhr.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Employee } from 'app/model/Employee.model';

declare const swal: any;
@Component({
  selector: 'asset-employee-autocomplete',
  templateUrl: './employee-autocomplete.component.html',
  styleUrls: ['./employee-autocomplete.component.scss']
})
export class EmployeeAutocompleteComponent implements OnInit {
  @Output() selectedEmployeeChange: EventEmitter<any> = new EventEmitter();
  @Input() selectedEmployee: Employee = new Employee();

  employeeSuggestions: Employee[] = [];

  constructor(
    private commonXHRService: CommonXHRService,
  ) { }

  ngOnInit() {
  }

  searchEmployee(event) {
    // console.log(event);
    this.commonXHRService.listEmployeeSimpleCurrentUser({
      employeeName: event.query
    }).then(data => {
      if (data.status === 0) {
        if (data.data.length > 0) {
          this.employeeSuggestions = data.data;
        } else {
          this.employeeSuggestions = data.data;
        }
      } else {
        swal({ text: data.msg, icon: 'warning', button: '确认', });
      }
    });
  }

  selectSuggestedEmployee(event) {
    console.log('select');
    this.selectedEmployee = event;
    this.selectedEmployeeChange.emit(this.selectedEmployee);
  }

  onBlurFromEmployeeSearch(event) {
    if (!this.selectedEmployee.employeeNumber) {
      console.log('blur');
      this.selectedEmployee = new Employee();
      this.selectedEmployeeChange.emit(this.selectedEmployee);
    }
  }
}
