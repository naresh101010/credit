export class Validation {

    constructor() { }


    public static panValidation(pan) {
        var regex = /([A-Z]){3}([ABCFGHLJPTF]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}$/;
        if (regex.test(pan.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    }

    public static tanValidation(tan) {
        var regex = /([A-Z]){4}([0-9]){5}([A-Z]){1}$/;
        if (regex.test(tan.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    }

    public static gstinValidation(gstin) {
        var regexByPan = /\d{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}\d{4}[A-Z]{1}[A-Z\d]{1}[Z,D]{1}[A-Z\d]{1}/;
        var regexByTan = /\d{2}[A-Z]{4}\d{5}[A-Z]{1}[A-Z\d]{1}[Z,D]{1}[A-Z\d]{1}/;
        if (regexByPan.test(gstin.toUpperCase()) || regexByTan.test(gstin.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    }

}