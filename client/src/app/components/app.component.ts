import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;
  public sumPremia = 0;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      full_name: ['', [Validators.required, Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}")]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      email: ['', [Validators.required, Validators.email]],
      identity: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(registerFormValue: FormGroup) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    };

    this.customerService.postCustomerDetails(registerFormValue.value)
      .subscribe(
        res => {
          let resJson = JSON.parse(JSON.stringify(res));
          // If status === 'success' sum the premia
          if (resJson.status === 'success') {
            for (let key in resJson.hbJson) {
              if (resJson.hbJson.hasOwnProperty(key)) {
                let values = resJson.hbJson[key];
                if (typeof values === "object") {
                  values.forEach(element => {
                    this.sumPremia += +element["premia"];
                  });
                };
              };
            }
            // Send form details
            let sendFormDetails = this.sumPremia > 50 ? this.customerService.premiaMoreThan50(registerFormValue.value) : this.customerService.premiaLessThan50(registerFormValue.value)
            sendFormDetails.subscribe(
              res => {
                let resDetails = JSON.parse(JSON.stringify(res));
                if (resDetails.message === "OK") {
                  alert("Your details received successfully!")
                };
              }, err => alert(err.message));
          } else if (resJson.status === "failure") {
            // If status === 'failure' display errmsg
            alert(resJson.errmsg);
          };
        },
        err => alert(err.message)
      );
  };
}
