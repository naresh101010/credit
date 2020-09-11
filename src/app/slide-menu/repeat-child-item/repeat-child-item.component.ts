import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-repeat-child-item",
  templateUrl: "./repeat-child-item.component.html",
  styleUrls: ["./repeat-child-item.component.css"],
})
export class RepeatChildItemComponent implements OnInit {
  constructor(
    private router: Router,
    private SpinnerService: NgxSpinnerService
  ) {}
  @Input() items;
  @Input() mainSection = "";
  @Input() subSection = "";

  ngOnInit() {

    
    // alert('fd')

    document.querySelectorAll(".activeButn").forEach((v) => {
      v.addEventListener("click", function () {
        rmv();

        v.classList.add("active");
      });
    });

    function rmv() {
      document.querySelectorAll(".activeButn").forEach((v) => {
        v.classList.remove("active");
      });
    }
    document.querySelectorAll(".parent").forEach((v) => {
      // console.log(v.innerHTML)
      v.addEventListener("click", function () {
        // console.log('fdf')
        document.querySelectorAll(".parent").forEach((v) => {
          v.classList.remove("active");
        });
        v.classList.add("active");
      });
    });
  }
  prevUrl = sessionStorage.getItem("refresh_component");
  currentUrl = "";

  navigateTo(module, target, $event) {

    if (sessionStorage.getItem("refresh_component")) {
      this.prevUrl = sessionStorage.getItem("refresh_component");
    }
    // debugger;

    // for global
    this.currentUrl = module + "/" + target;
    this.currentUrl = this.currentUrl.toLowerCase().replace(" ", "-");

    if(this.currentUrl == 'mdm'){
      window.location.reload();
      return
    }else{
      sessionStorage.setItem("refresh_component", this.currentUrl);
    }
      
    if (this.prevUrl == this.currentUrl) {  
         // check if user click on same link navigate to empty route -- refresh page
          let module_ = module.toLowerCase().replace(" ", "-");
          this.router.navigate([module_], { skipLocationChange: false }).then(()=>{
            if(location.pathname == '/mdm' || location.pathname == '/user-management'){
              setTimeout(()=>{              
                this.router.navigate([this.currentUrl], { skipLocationChange: false });  
             }, 500)
            }
          });;
    } else {
      this.router.navigate([this.currentUrl]);
    }
    this.prevUrl = this.currentUrl;
  }



  
}
