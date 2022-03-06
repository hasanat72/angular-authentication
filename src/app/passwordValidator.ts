/*
* even though this is a password validator, but actually this class checks any space in any string
* */

import {FormControl} from "@angular/forms";

export class PasswordValidator{
  static cannotContainSpace(formControl:FormControl){
    if(formControl.value.indexOf(' ') >= 0)
      return {cannotContainSpace: true};
    return null;
  }
}
