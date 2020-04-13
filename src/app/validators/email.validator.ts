import { AbstractControl, Validators, ValidationErrors } from "@angular/forms";
import { ConfigSetting } from "../common/config-setting";

export function EmailValidator(control: AbstractControl) {
    let emailRegex = new RegExp(ConfigSetting.RegexEmailValidator, "g");
    let match = emailRegex.test(control.value);
    return match  ? null : {'emailNotValid': {value: control.value}} ;
}