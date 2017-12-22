import { CommonXHRService } from 'app/core/common-xhr.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from '../../../../node_modules/_primeng@4.3.0@primeng/components/common/selectitem';
import { Employee } from 'app/model/Employee.model';

declare const swal: any;
@Component({
  selector: 'asset-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  username: string;
  password: string;
  selectedEmployee: Employee;
  roleId;
  roles: SelectItem[] = [];

  constructor(
    private commonXHRService: CommonXHRService,
  ) { }

  ngOnInit() {
    this.formInit();
    this.getAllRole();
  }

  getAllRole() {
    this.commonXHRService.listRoles({
      organizationId: ''
    }).then(data => {
      if (data.status === 0) {
        this.roles = data.data.list.map((value) => ({ label: value.roleName, value: value.roleId }));
        this.roles.unshift({ label: '--请选择--', value: '' });
      } else {

      }
    });
  }

  addUser() {
    if (this.checkForm()) {
      this.commonXHRService.addUser({
        username: this.username,
        password: this.password,
        roleId: this.roleId,
        employeeNumber: this.selectedEmployee.employeeNumber || ''
      }).then(data => {
        if (data.status === 0) {
          this.formInit();
          swal({ text: '添加成功', icon: 'success', button: '确认' });
        } else {
          swal({ text: data.msg, icon: 'warning', button: '确认' });
        }
      });
    }
  }

  formInit() {
    this.username = '';
    this.password = '';
    this.selectedEmployee = new Employee();
    this.roleId = ''
  }

  checkForm() {
    if (!this.username) {
      swal({ text: '请输入用户名', button: '确认', });
      return false;
    } else if (!this.password) {
      swal({ text: '请输入密码', button: '确认', });
      return false;
    } else if (!this.roleId) {
      swal({ text: '请选择角色', button: '确认', });
      return false;
    } else if (!this.selectedEmployee.employeeNumber) {
      swal({ text: '请输入使用员工', button: '确认', });
      return false;
    }
    return true;
  }
}
