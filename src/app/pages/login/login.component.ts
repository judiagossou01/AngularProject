import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder)

  private capitalize(field: string): string {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  loginformGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  isInvalidAndTouchedOrDirty(fieldName: string) {
    const control = this.loginformGroup.get(fieldName);
    return control?.invalid && (control.dirty || control.touched);
  }

  getMessageError(fieldName: string): string {
    const control = this.loginformGroup.get(fieldName);

    if (control?.hasError('required')) {
      return `${this.capitalize(fieldName)} is required`;
    } else if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength')?.requiredLength;
      return `${this.capitalize(fieldName)} must be at least ${requiredLength} characters long`;
    } else if (control?.hasError('pattern')) {
      return `${this.capitalize(fieldName)} must be a valid email address format`;
    }

    return '';
  }

  login() {
    this.loginformGroup.markAllAsTouched();
    if (this.loginformGroup.invalid) {
      return;
    }
    console.log(this.loginformGroup.value)
  }
}
