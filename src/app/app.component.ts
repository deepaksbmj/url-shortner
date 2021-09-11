import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BitlyServiceService } from './service/bitly-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'url-shortner';
  error = false;
  message: string = '';
  generatedUrl: string = '';
  isCopy :boolean = true;
  checkoutForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private service: BitlyServiceService
  ) {
    const regex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.checkoutForm = this.formBuilder.group({
      longUrl: ['', [Validators.required, Validators.pattern(regex)]],
    });
  }

  reset(){
    this.isCopy = true;
  }

  getShortUrl() {
    this.error = false;
    this.isCopy = true;
    this.generatedUrl = '';
    console.log(this.checkoutForm.controls.longUrl.value);
    if (
      this.checkoutForm.controls.longUrl.value &&
      this.checkoutForm.controls.longUrl.status === 'VALID'
    ) {
      let link = {
        long_url: this.checkoutForm.controls.longUrl.value,
        domain: 'bit.ly',
      };

      this.service.createLink(link).subscribe((res) => {
        if (res.link != null && res.link != undefined) {
          this.generatedUrl = res['link'];
          this.isCopy = false;
        }
      });

      this.resetForm();
    } else {
      setTimeout(() => {
        this.error = true;
        this.message = 'Please put a valid URL - https://example.com';
        alert(this.message)
      }, 50);
      this.resetForm();
    }
  }

  resetForm() {
    this.checkoutForm.reset();
  }
}
