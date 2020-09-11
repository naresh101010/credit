import { DeleteModalComponent } from 'src/app/modals/delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceList } from "./../../Models/service-list";
import { ServiceListService } from "./../../services/service-list.service";
import { RateGroupService } from "./../../services/rate-group.service";
import { AppComponent } from "./../../app.component";
import { ServiceOfferingSla } from "./../../Models/service-offering-sla";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RateGroup } from "src/app/Models/rate-group";
import * as moment from "moment";
import * as _ from "lodash";
import { DatePipe } from '@angular/common';
import { AuthorizationService } from 'src/app/services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: "app-rate-group",
    templateUrl: "./rate-group.component.html",
    styleUrls: ["./rate-group.component.css"]
})
export class RateGroupComponent implements OnInit {
    constructor(
        private appComp: AppComponent,
        private $rateGroup: RateGroupService,
        private $serviceList: ServiceListService,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService,
        public dialog: MatDialog
    ) { }
    @ViewChild('slaF', null) slaF: any;
    @ViewChild('rateForm', null) form: any;
    ngOnInit() {
        
        this.getRateList();
        this.getserviceOffering();
        this.permissionsService.loadPermissions(this.AuthorizationService.getPermissions('ZONE MATRIX', 'RATE GROUP'));
        
    }
serviceOfferCtrl= <string>'';
    slaTitle = "Add";
    rateGroupName: string;
    viewRate = <boolean>true;
    isInactive = <boolean>false;
    addRate = <boolean>false;
    addSla = <boolean>false;
    isExpand = <boolean>true;
    serviceId: any;
    page = 1;
    type:string="Create";
    isVar = <boolean>true;
    rateGroupObj = <RateGroup>{
        status: 1,
        serviceOfferingSlaList: []
    };
    rateGroupList: Array<RateGroup> = [];
    serviceOfferObj = <ServiceOfferingSla>{
        status: 1,
    };
    serviceOfferingList = [] as Array<ServiceOfferingSla>;
    serviceLineList: Array<ServiceList>;
    today = moment(new Date()).format("YYYY-MM-DD");
    slaToday = moment(new Date()).format("YYYY-MM-DD");
    isDateInvalid = <boolean>false;
    submitPermission = <boolean>false;
    inActiveFlag = <boolean>false;

    compareServiceOffering(o1: any, o2: any): boolean {
        if (o2) {
            return o1.id === o2.id;
        }
    }
    showViewTable() {
        this.viewRate = true;
        this.addRate = false;
        this.addSla = false;
        this.isExpand = true;
        this.selectedServiceOffer=''
        this.serviceOfferObj=<ServiceOfferingSla>{
        status: 1,
    };
    }
    getRateList() {
        this.spinner.show();
        this.$rateGroup.getLastUpdated().subscribe(response => {
            this.rateGroupList = response;
            this.spinner.hide();
        });
    }

    editRate(rateObj, type = null) {
        
        this.isVar = false;
        if (type == 0) {
            this.submitPermission = false;
           this.type="Edit";
        }
        else {
            this.submitPermission = true;
             this.type="View";
        }

   let todayDate = moment(new Date()).format('YYYY-MM-DD');

        if (rateObj.status == 0 && rateObj.expiryDate < this.currentDate) {
            this.isInactive = true;
            this.isVar = false;
            this.expiryMinDate = todayDate;
        }
        else {
            this.isInactive = false;
            //    this.expiryMinDate=moment(this.logisticObj.expDt).format("YYYY-MM-DD");
        }

        this.spinner.show();
        this.rateGroupObj = { ...rateObj };
        this.rateGroupObj.serviceOfferingSlaList = [];
        // this.rateGroupObj.effectiveDate = moment(this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");
        if (this.rateGroupObj.effectiveDate) {
            this.rateGroupObj.effectiveDate = moment(this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");

        }

        if (this.rateGroupObj.expiryDate) {
            this.rateGroupObj.expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
        }

        this.$serviceList.servicesOfferingByRategroup(this.rateGroupObj.id).subscribe(response => {
            this.addRate = true;
            this.viewRate = false;
            this.isExpand = true;
            this.addSla = true;
            this.rateGroupObj.serviceOfferingSlaList = response.responseData;
            this.rateGroupObj.serviceOfferingSlaList.map(elem => {
                let obj = response.referenceData.serviceOfferingList.find(el => el.id == elem.serviceOfferingId)
                if (obj) {
                    elem.serviceOffering = obj.serviceOffering
                }
            })
            this.getRateList();
            this.spinner.hide();
        })
        this.inActiveStatus();
    }

    strLengthValid:boolean = false;
    searchRateGroup(event=null) {
          this.spinner.show();
        this.page = 1;
        if (!this.rateGroupName || this.rateGroupName.trim() == "") {
            return this.getRateList();
        }
        this.$rateGroup.searchRateGroup(this.rateGroupName).subscribe(response => {
            this.rateGroupList = response;
            if (!this.rateGroupList.length) {
                this.appComp.showMessage(`Record Doesn't Exist In Propel-I`, "danger");
            }
            this.spinner.hide();
        });
    }

    clearSearch() {
        if (!this.rateGroupName || this.rateGroupName == '') {
            this.getRateList();
        }
    }

    getserviceOffering() {
        this.$serviceList.getServicesOffering().subscribe(response => {
            this.serviceOfferingList = response;
        });
    }

    checkRateName() {
        let isPresent = this.rateGroupList.find(elem => elem.rateGroupName.trim() == this.rateGroupObj.rateGroupName);
        if (isPresent) {
            this.appComp.showMessage(`${this.rateGroupObj.rateGroupName} Is Already Present`, "danger");
            return true;
        }
        return false;
    }

    addRateGroup() {
        this.isVar = false;
        let isPresent = this.checkRateName();
        if (isPresent) {
            return;
        }
        if (this.rateGroupObj.expiryDate) {
            if (this.rateGroupObj.expiryDate < this.today && this.rateGroupObj.expiryDate < this.rateGroupObj.effectiveDate) {
                this.isVar = true;
            }
            else {
                this.isVar = false;
                this.rateGroupObj.expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
            }
        }
        this.viewRate = false;
        this.addSla = true;
        this.isExpand = false;
    }

    deleteServiceOffering(index) {
        
        let deleteObj = this.rateGroupObj.serviceOfferingSlaList[index];
        let dialogRef = this.appComp.openDeleteDialog(
            "SLA",
            deleteObj.serviceOffering
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {

                this.rateGroupObj.serviceOfferingSlaList.splice(index, 1);
                // this.rateGroupObj.serviceOfferingSlaList[index].isEdit = true;
            }
        });
    }

    selectedServiceOffer: any;
    disabledBtn: any;

	checkType(elem){
		return typeof(elem);
	}
	
	addServiceOffering(){
		
		if (!this.rateGroupObj.serviceOfferingSlaList) {
            this.rateGroupObj.serviceOfferingSlaList = [];
		}
		
		let isPresent = this.rateGroupObj.serviceOfferingSlaList.find(
            elem => this.selectedServiceOffer.id == elem.serviceOfferingId
		);

		this.serviceOfferObj.serviceOfferingId = this.selectedServiceOffer.id;
        this.serviceOfferObj.serviceOffering = this.selectedServiceOffer.serviceOffering;
		this.serviceOfferObj.rateGroupId = this.rateGroupObj.id;
		
		if (isPresent && !this.serviceOfferObj.id) {
            return this.appComp.showMessage(
                `${this.selectedServiceOffer.serviceOffering} is already Present`, "danger"
            );
		}
		
		if (isPresent && (isPresent.id != this.serviceOfferObj.id)){
            return this.appComp.showMessage(
                `${this.selectedServiceOffer.serviceOffering} is already Present`, "danger"
            );
        }

		if (!this.serviceOfferObj.id) {
            this.serviceOfferObj.id = Math.random().toString(36).substring(7);
		}
		
		if(isPresent && this.serviceOfferObj.id){
			let index = this.rateGroupObj.serviceOfferingSlaList.findIndex(elem => elem.id == this.serviceOfferObj.id);
			this.rateGroupObj.serviceOfferingSlaList[index] = { ...this.serviceOfferObj };
		}else if(!isPresent && this.serviceOfferObj.id){
			let index = this.rateGroupObj.serviceOfferingSlaList.findIndex(elem => elem.id == this.serviceOfferObj.id);
			if(index!=-1){
				this.rateGroupObj.serviceOfferingSlaList[index] = { ...this.serviceOfferObj };
			}else{
				this.rateGroupObj.serviceOfferingSlaList.splice(0, 0, { ...this.serviceOfferObj });
			}
			
		}else if(!isPresent){
			this.rateGroupObj.serviceOfferingSlaList.splice(0, 0, { ...this.serviceOfferObj });
		}

		this.slaTitle = 'Add';
        this.slaF.submitted = false;
        this.slaF.resetForm();
        this.serviceOfferObj = <ServiceOfferingSla>{};
        delete this.selectedServiceOffer;
	}

    emptyInput() {
		let id = this.serviceOfferObj.id;
        this.serviceOfferObj = <ServiceOfferingSla>{};
        this.serviceOfferObj.id = id;
    }
    editServiceOffering(index) {
        this.slaTitle = "Save";
        this.serviceOfferObj = _.clone(this.rateGroupObj.serviceOfferingSlaList[index]);
        this.selectedServiceOffer = this.serviceOfferingList.find(elem => elem.id == this.serviceOfferObj.serviceOfferingId);
        this.serviceOfferObj.effectiveDate = moment(this.serviceOfferObj.effectiveDate).format("YYYY-MM-DD");
        
        this.checkSlaEffectiveDate();

        if (this.serviceOfferObj.expiryDate) {
            this.serviceOfferObj.expiryDate = moment(this.serviceOfferObj.expiryDate).format("YYYY-MM-DD");
        }
        // this.serviceOfferObj.isEdit = true;
    }

    checkSlaEffectiveDate(){
         
        this.slaToday = moment(new Date()).format("YYYY-MM-DD");
        if(this.rateGroupObj.effectiveDate > this.today ){
            this.slaToday = moment(this.rateGroupObj.effectiveDate,"YYYY-MM-DD").format("YYYY-MM-DD");
        }
    }

    submitRateGroup() {

        this.rateGroupObj.effectiveDate = moment(this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");
        if (this.rateGroupObj.expiryDate) {
            this.rateGroupObj.expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
        }
        this.disabledBtn = true;
        this.rateGroupObj.serviceOfferingSlaList = this.rateGroupObj.serviceOfferingSlaList.map(
            (elem: any) => {
                elem.effectiveDate = moment(elem.effectiveDate).format("YYYY-MM-DD");
                   if(  elem.expiryDate){
                 elem.expiryDate = moment(elem.expiryDate).format("YYYY-MM-DD");
                  }
                elem.price = parseFloat(elem.price);
                elem.sla = parseInt(elem.sla);
                return elem;
            }
        );
        
        let rateGroupData = { ...this.rateGroupObj };
        
        rateGroupData.serviceOfferingSlaList.map(elem=>{
				if(typeof(elem.id)=="string"){
					elem.id = 0
				}
		})
        
        if(this.rateGroupObj.status==0){
            let dialog = this.dialog.open(DeleteModalComponent, {
                width: '35vw',
                panelClass: 'mdmDialog',
                data: {heading : "Rate Group" ,title:this.rateGroupObj.rateGroupName}
            });

            dialog.afterClosed().subscribe(response => {
                if(response===true){
                    this.submitRateGroupFunc(rateGroupData)
                }
            })

        }else{
            this.submitRateGroupFunc(rateGroupData)
        }

    }

    submitRateGroupFunc(rateGroupData){
        this.spinner.show();
        this.$rateGroup.saveGroup(rateGroupData).subscribe(response => {
            this.disabledBtn = false;
            if (!this.rateGroupObj.id) {
                this.rateGroupObj.id = response;
                this.rateGroupList.splice(0, 0, this.rateGroupObj);
                this.appComp.showMessage(`${this.rateGroupObj.rateGroupName} Is Created`);
            }
            else {
                this.rateGroupObj.id = response;
                let index = this.rateGroupList.findIndex(elem => elem.id == this.rateGroupObj.id);
                this.appComp.showMessage(`${this.rateGroupObj.rateGroupName} Is Updated`);

            }

            this.spinner.hide();
            setTimeout(() => {
                this.slaTitle = 'Add';
                this.viewRate = true;
                this.addRate = false;
                this.addSla = false;
                this.isExpand = true;
                this.page = 1;
                this.rateGroupName = '';
                this.rateGroupObj = <RateGroup>{
                    status: 1,
                    serviceOfferingSlaList: []
                };
                this.serviceOfferObj={} as any
                this.selectedServiceOffer=null;
                // this.slaF.reset();
            }, 1200);
            this.getRateList();

        }, err => {
            this.disabledBtn = false;
        });
    }


    effDate(effDate = null) {

        effDate = moment(effDate).format("YYYY-MM-DD");
        let effYear = parseInt(this.datePipe.transform(this.rateGroupObj.effectiveDate, 'yyyy'))
        if (effYear > 9999) {
            this.rateGroupObj.effectiveDate = "";
        }
        if (effDate < this.today) {
            this.isDateInvalid = true;
        }
        else {
            this.isDateInvalid = false;
        }
    }

    expDate(expDate = null) {
        expDate = moment(expDate).format("YYYY-MM-DD");
        if (this.rateGroupObj.effectiveDate) {
            this.rateGroupObj.effectiveDate = moment(this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");
        }
        else {
            this.rateGroupObj.effectiveDate = '';
        }
        let expYear = parseInt(this.datePipe.transform(this.rateGroupObj.expiryDate, 'yyyy'))
        if (expYear > 9999) {
            this.rateGroupObj.expiryDate = "";
        }
        if (expDate >= this.rateGroupObj.effectiveDate) {
            this.isDateInvalid = true;
        }
        else {
            this.isDateInvalid = false;
        }

    }


    isValidRateGroup() {

        let expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
        if (!this.rateGroupObj.status && (expiryDate < this.today)) {
            return false;
        }
        if (this.rateGroupObj.status && (expiryDate >= this.today)) {
            return true;
        }
    }

    // isRateGroupCheck() {

    //     let expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
    //     if ( !this.rateGroupObj.status  && !this.rateGroupObj.id ) {
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }
    
    inActiveStatus() {
        
        if (this.rateGroupObj.status == 0) {
            this.inActiveFlag = true;
        }
    }
    

    expiryMinDate: any;
    isChange = <boolean>true;
    currentDate = moment(new Date()).format("YYYY-MM-DD");

    checkForExpiryDate(effectiveDate) {
        
        let todayDate = moment(new Date()).format('YYYY-MM-DD');
        effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        if(this.rateGroupObj.expiryDate){
            this.rateGroupObj.expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
        }
        if(this.rateGroupObj.effectiveDate){
            this.rateGroupObj.effectiveDate = moment( this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");
        }
        if (this.rateGroupObj.expiryDate <= effectiveDate && (!this.rateGroupObj.id || this.rateGroupObj.expiryDate <= effectiveDate)) {
            this.isVar = true;
        }
        else {
            this.isVar = false;
        }

        if (effectiveDate < todayDate) {
            return this.expiryMinDate = todayDate;
        }
        return this.expiryMinDate = moment(effectiveDate, 'YYYY-MM-DD').add(1, "d").format('YYYY-MM-DD');

    }

    checkForRateStatus() {
        
        let expiryDate = moment(this.rateGroupObj.expiryDate).format("YYYY-MM-DD");
        let effectiveDate = moment(this.rateGroupObj.effectiveDate).format("YYYY-MM-DD");

        if(!this.rateGroupObj.id && !this.rateGroupObj.status){
            return false;
        }
        if(!this.rateGroupObj.id && this.rateGroupObj.effectiveDate< this.today){
            return true;
        }
        if(effectiveDate < this.today &&  !this.isChange){
            return true;
        }
        if((expiryDate < this.today || expiryDate < effectiveDate ) &&  this.isVar){
            return true;
        }
        if (!this.rateGroupObj.status && (expiryDate < this.today)) {
            return false;
        }
        if (this.rateGroupObj.id && this.serviceOfferObj.effectiveDate < this.rateGroupObj.effectiveDate) {
            return true;
        }
        if (this.rateGroupObj.status && (expiryDate >= this.today)) {
            return false;
		}
		
		if(this.rateGroupObj.id && !this.rateGroupObj.status){
			return false;
		}
    
            return true;

    }
    removeMinDate(effectiveDate) {
        
        this.expiryMinDate = moment(effectiveDate).format('YYYY-MM-DD');
    }

    changeDateFormat(effectiveDate, expiryDate) {
        
        this.isVar = true;

        if (effectiveDate) {
            this.rateGroupObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.rateGroupObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

    changeSLADateFormat(effectiveDate, expiryDate) {
        
        if (effectiveDate) {
            this.serviceOfferObj.effectiveDate = moment(effectiveDate).format('YYYY-MM-DD');
        }
        if (expiryDate) {
            this.serviceOfferObj.expiryDate = moment(expiryDate).format('YYYY-MM-DD');
        }

        this.checkForExpiryDate(effectiveDate)
    }

    checkForSubmitBtn(){
        
        if((this.disabledBtn && (this.expiryMinDate < this.rateGroupObj.effectiveDate)) || (this.rateGroupObj.effectiveDate < this.today)){
            return true;
        }
            return false;
    }

}
