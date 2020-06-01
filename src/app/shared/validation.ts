export class Validation {

    constructor() { }


    public static panValidation(pan) {
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
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
        var regex =/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
        // var regex=/\\d{2}[a-zA-Z]{5}\\d{4}[a-zA-Z]{1}\\d{1}[a-zA-Z]{1}\\d{1}/;
        if (regex.test(gstin.toUpperCase())) {
            return true;
        } else {
            return false;
        }
    }

}