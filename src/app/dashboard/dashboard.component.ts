import { Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import { CommonService } from '../common.service';
import { style, animate, transition, trigger } from '@angular/animations';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { ErrorConstants } from "../core/interceptor/ErrorHnadle";
import { AppSetting } from "../app.setting";
import { Constants } from "../core/interceptor/Constants";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0}))
      ])
    ])
  ]
})
export class Dashboard implements OnInit, OnDestroy{
  dashboardCard = [];
  userName;
  greetMsg;
  userId;
  isAdmin;
  favouriteObjects : any[] = [];
  selectedValue = '';
  draggedObjects : any[] = [];
  pinnedObject : any;
  userExpandedMenus : any[] =[];

  constructor(private CommonService_:CommonService,  private http: HttpClient, private ngZone:NgZone,
  private tosterService: ToastrService, private spinner: NgxSpinnerService, private router: Router) {
    this.ngZone.run(() => {this.greetMsg =  window['greet_msg'].m})
    window['greet_msg'].getGreetMsg((val)=> {
      this.ngZone.run(() => {this.greetMsg = val})
    });
  }
 headerData = { authorization: sessionStorage.getItem('access-token'),   userId : JSON.parse(sessionStorage.getItem("userDetails")).userId };

first:number;second:number;third:number;fourth:number;

  ngOnInit(){
   this.spinner.show();
    this.dashboardCard = this.CommonService_.getDeshboardCard();
    this.dashboardCard.forEach(v=>{ if(v){v.toggleFlg = false}});
    this.userName = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.username;
    //priyanka start

    this.isAdmin = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.isAdmin;
    this.getBroadcastMessage();
        if(sessionStorage.getItem("bookmarkData") && sessionStorage.getItem("bookmarkData") != "undefined"){
        var bookMarkedData = JSON.parse(sessionStorage.getItem("bookmarkData"));
        this.prepareBookmarkDashboardData(bookMarkedData);
        }else{
        this.CommonService_.getDragDropData().subscribe( data =>{
        this.prepareBookmarkDashboardData(data.data);
        this.spinner.hide();
        } );
        }

        //priyanka end
    //hide menu
    this.CommonService_.hidemenu();

    this.first=0;this.second=1;this.third=2;this.fourth=3;
  }
  ngOnDestroy(){
    this.CommonService_.toggleMenuFlg();
    // alert('fddffd')
    // sessionStorage.setItem('refresh_component', location.pathname)
  }

  //favourite Cards

  //first card

  selectValue = false;
  manifestBookmark(){
    this.selectValue = !this.selectValue;
  }

  manifestFavouriteValue = false;
  manifestFavourite(){
    this.manifestFavouriteValue = !this.manifestFavouriteValue;
  }


  //second Card
  waybillValue = false;
  waybillBookmark(){
    this.waybillValue = !this.waybillValue;
  }

  waybillFaveValue = false;
  waybillFavourite(){
    this.waybillFaveValue = !this.waybillFaveValue;
  }

  //third card
  msaValue = false;
  msaBookmark(){
    this.msaValue = !this.msaValue;
  }

  msaFaveValue = false;
  msaFavourite(){
    this.msaFaveValue = !this.msaFaveValue;
  }

  //Fourth card
  creditValue = false;
  creditBookmark(){
    this.creditValue = !this.creditValue;
  }

  creditFaveValue = false;
  creditFavourite(){
    this.creditFaveValue = !this.creditFaveValue;
  }

  //fifth card
  retailValue = false;
  retailBookmark(){
    this.retailValue = !this.retailValue;
  }

  retailFaveValue = false;
  retailFavourite(){
    this.retailFaveValue = !this.retailFaveValue;
  }







  //end of favourites card
  //togle for Main card
    //togle for Main card
      toggle(item){

      let filteredExpandedMenuArray =[];
      filteredExpandedMenuArray.push(Object.assign([],this.dashboardCard.filter(x => this.userExpandedMenus.find(y => y.menuHierarchyId === x.id))));
      if(this.dashboardCard && this.dashboardCard.length > 0){
        this.dashboardCard.forEach(v=>
          {
            if(!v.toggleFlg ||  item.toggleFlg != v.toggleFlg) {
            if((this.userExpandedMenus.findIndex(x=> x.menuHierarchyId == v.id)) <0)
              v.toggleFlg = false
            }})
      }
      item.toggleFlg = !item.toggleFlg
    }
  associateValue:any;
  associateMang(obj, value){
    // console.log(value, obj)

    this.associateValue = value;
    obj.toggleFlg = !obj.toggleFlg;
  }

  associateFav(obj, value){
    obj.toggleFlg = !obj.toggleFlg;
  }

  //greeting


  prepareBookmarkDashboardData(bookMarkedData){
            if(bookMarkedData){
              this.draggedObjects = bookMarkedData.draggedObjects;
              this.favouriteObjects = bookMarkedData.favouriteObjects;
              this.pinnedObject = bookMarkedData.pinnedObject;
              this.userExpandedMenus = bookMarkedData.userExpandMenus;
              let filteredFavoriteArray =[];
              let filteredExpandedMenuArray =[];
              let filteredBookmarkObject : any;
              let isPinnedObjectFound : boolean =false;
               filteredExpandedMenuArray.push(Object.assign([],this.dashboardCard.filter(x => this.userExpandedMenus.find(y => y.menuHierarchyId === x.id))));
              this.dashboardCard.forEach(dashBoard =>{
              dashBoard.childMenu.forEach(x=>{ x['favouriteIcon'] = 'favorite_border'; x['bookMarkicon'] = 'bookmark_border'});
              filteredFavoriteArray.push(Object.assign([],dashBoard.childMenu.filter(x => this.favouriteObjects.find(y => {if(!y.objectId){return y.menuHierarchyId === x.id}}))));
              if(!isPinnedObjectFound){
              filteredBookmarkObject = dashBoard.childMenu.filter(x => {if(this.pinnedObject && !this.pinnedObject.objectId){return (this.pinnedObject && this.pinnedObject.menuHierarchyId === x.id)}});
              if(filteredBookmarkObject && filteredBookmarkObject.length >0){
              filteredBookmarkObject.forEach(array => {array['isPinned'] =true; array['bookMarkicon'] = 'bookmark'});
              isPinnedObjectFound = true;}
              }
              });
              this.prepareFavouriteCards();
              filteredFavoriteArray.forEach(array => {
              if(array && array.length>0){
              array.forEach(ar => {ar['isFavourite'] =true; ar['favouriteIcon'] = 'favorite'});
              }
              });
              filteredExpandedMenuArray.forEach(array => {
                        if(array && array.length>0){
                        array.forEach(ar => ar['toggleFlg'] =true);
                        }
                        });
                        }
    }

broadCast;
  getBroadcastMessage(){
      this.CommonService_.broadCastMessage().subscribe(success => {
      // console.log(success, 'print success')
      this.broadCast = success.data;
      // console.log(this.broadCast, "Print Message Data")
      });
    }

checkIsFavorite(id) {
    var object = this.favouriteObjects.find(x=> x.objectId == id);
    if(object !== undefined){
      return true;
    } else {
      return false;
    }
  }

prepareFavouriteCards(){
        for(let cards of this.favouriteObjects){
          if (cards.targetValue === 'COMMANDMENT') {
            cards.objectName = 'BULK UPDATE COMMANDMENTS';
            }
        var object ={};
         var dashBoardMenuCard;
         if(cards.parentMenuId){
         dashBoardMenuCard = this.dashboardCard.find(x=> x.id === cards.parentMenuId);}
         if(dashBoardMenuCard){
        object['bookMarkicon'] ='bookmark_border';
        object['heartIcon'] ='favorite';
        object['value'] =cards.objectName ? cards.objectName : cards.menuHierarchy ;
        object['activeFlag'] ='false';
        object['hearFlag'] ='false';
        object['parentMenuId'] = cards.parentMenuId;
        if(cards.objectId){
         object['img'] = cards.imagePath ? '../assets/images/' + cards.imagePath : '../assets/images/library_books-24px.png';
        if(cards.routingPath){
        object['routerLink'] =cards.routingPath;}
        object['targetValue'] =cards.targetValue;
        object['objectId'] = cards.objectId;}
        else{
        var link ='';
        if(!cards.objectId){
        if(cards.menuHierarchy == Constants.CREDIT_MENU){object[Constants.ROUTER_LINK_JSON_KEY] = Constants.CREDIT_ROUTER_LINK;}
        else if(cards.menuHierarchy == Constants.PRC_MENU){object[Constants.ROUTER_LINK_JSON_KEY] = Constants.PRC_ROUTER_LINK;}
        else if(cards.menuHierarchy == Constants.RETAIL_MENU){object[Constants.ROUTER_LINK_JSON_KEY] =Constants.RETAIL_ROUTER_LINK;}
        else if(cards.parentMenuTarget && (cards.parentMenuTarget =='ASSO_MGMT' || cards.parentMenuTarget == 'ASSOCIATE')){
        if(cards.parentMenuTarget== 'ASSOCIATE'){
        if(cards.menuHierarchy == 'BOOKING'){object[Constants.ROUTER_LINK_JSON_KEY] ='/asso_booking-contract/asso_booking';}
        else if(cards.menuHierarchy == 'NETWORK'){object[Constants.ROUTER_LINK_JSON_KEY] ='/asso_network-contract/asso_network';}
        else if(cards.menuHierarchy == 'DELIVERY'){object[Constants.ROUTER_LINK_JSON_KEY] ='/asso_delivery-contract/asso_delivery';}
        }else{
        link = this.prepareNavigationLink(dashBoardMenuCard, cards);
        object[Constants.ROUTER_LINK_JSON_KEY] = link}
         }else{
        link = this.prepareNavigationLink(dashBoardMenuCard, cards);
        object[Constants.ROUTER_LINK_JSON_KEY] = link}
        }else{
        link = this.prepareNavigationLink(dashBoardMenuCard, cards);
        object[Constants.ROUTER_LINK_JSON_KEY] = link
        }
        object['img'] = dashBoardMenuCard.menuLabel ?'../assets/images/' + dashBoardMenuCard.menuLabel.replace(' ', '-').toLowerCase() +'.png' : '../assets/images/library_books-24px.png';
        object['id']  = cards.menuHierarchyId;
        }
        this.favoriteCard.push(Object.assign([], object));
        }
        }
        if(this.pinnedObject){
        this.setPinnedCard();
          }
        }

    setPinnedCard(){
    for(let favObj of this.favoriteCard){
    // debugger
    	favObj['isPinned'] = false;
    	 favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark_border';
    	if(favObj.objectId  && this.pinnedObject.objectId && favObj.objectId === this.pinnedObject.objectId){
           favObj['isPinned'] = true;
    	   favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
    	   break;
          }
    	else if(favObj.id && !this.pinnedObject.objectId && this.pinnedObject.menuHierarchyId && favObj.id === this.pinnedObject.menuHierarchyId){
           favObj['isPinned'] = true;
    	   favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
        }
    	}
      }
    prepareNavigationLink(dashBoardMenuCard, cards){
        var childMenu = dashBoardMenuCard.childMenu.find(x=> x.id == cards.menuHierarchyId);
        if(childMenu){
        var link = dashBoardMenuCard.menuLabel.replace(' ', '-').toLowerCase() + '/'+ childMenu.menuLabel.replace(' ','-').toLowerCase();
        }
        return link;
        }

  favoriteCard =[];

 /*-------------- on select block ----------- */
  onSelectBlock(cardData) {
  if(cardData.targetValue){
    window['defaultLandingTarget'] = cardData.targetValue;}
  if (cardData.targetValue === 'COMMANDMENT') {
    this.router.navigate([cardData.routerLink, {'openDialog': 'true'}]);
    }else{
    this.router.navigate([cardData.routerLink]);
    }
  }

addToFavorite(item, isFavouriteDashboardCard) {
this.spinner.show();
var favoriteObj : any = {}
      this.setFavoriteStatusOfCard(item, favoriteObj);
      favoriteObj.menuHierarchyId = item.id;
      favoriteObj.moduleEntityId = item.moduleEntityId;
      favoriteObj.objectId = item.objectId;
      favoriteObj.status = item.status;
      favoriteObj.targetValue = item.targetValue;
      var finalObject : any = {};
      finalObject.favouriteObject = favoriteObj;
      this.postDragDropData(finalObject).subscribe(data => {
      let dataObject = ErrorConstants.validateException(data);
      if(dataObject.isSuccess){
      this.CommonService_.getDragDropData().subscribe(fetchedFavObjects => {
      sessionStorage.removeItem("bookmarkData");
      this.favouriteObjects = fetchedFavObjects.data.favouriteObjects;
      this.favoriteCard=[];
      var filteredFavoriteArray =[];
      this.dashboardCard.forEach(dashBoard =>{
      dashBoard.childMenu.forEach(x=> {x['isFavourite'] = false; x[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON_BORDER});
      dashBoard.childMenu.forEach(childMenu=> {this.favouriteObjects.find(favObj => {if(!favObj.objectId
      && favObj.menuHierarchyId ===childMenu.id){childMenu['isFavourite']=true;childMenu[Constants.FAVORITE_ICON_JSON_KEY]= Constants.FAVORITE_ICON}})});
      });
      this.prepareFavouriteCards();
      this.spinner.hide();
      });
    }else{
    if(favoriteObj.status ==1){
         item.isFavourite= false;
         item[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON_BORDER
    }else{item.isFavourite= true;
         item[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON}
         this.tosterService.warning(dataObject.message, dataObject.code);
         this.spinner.hide();}
    },(error) => {
         let ob = ErrorConstants.validateException(error.error);
         this.tosterService.warning(ob.message, ob.code);
         this.spinner.hide();
            });}


    setFavoriteStatusOfCard(item, favoriteObj){
      if(item.objectId){
        var isFavourite = this.favouriteObjects.find(x => x.objectId == item.objectId)
        favoriteObj.menuCard = false;}else{
        isFavourite = this.favouriteObjects.find(x =>{if(!x.objectId){return x.menuHierarchyId == item.id}})
        favoriteObj.menuCard = true;}
        if(isFavourite !== undefined ){
        if(isFavourite.status ==1){
        item.isFavourite =false;
        item[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON_BORDER;
        item.status=0;
        isFavourite.status =0;
        }else{
        item.isFavourite =true;
        isFavourite.status =1;
        item.status=1;
        item[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON;
          }
        }else{
        item[Constants.FAVORITE_ICON_JSON_KEY] = Constants.FAVORITE_ICON;
        item.isFavourite =true;
        item.status=1;
        }
        return item;
        }


  addToPinnedObj(item, isPinnedCardObject) {
  this.spinner.show();
  var isPinned;
        if (this.pinnedObject !== undefined) {
          if ((this.pinnedObject.menuHierarchyId === item.id || (this.pinnedObject.objectId && this.pinnedObject.objectId === item.objectId)) && this.pinnedObject.status===1) {
            isPinned = 0;
            this.pinnedObject.isPinned =false;
            item.isPinned =false;
            item[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark_border';
          }else {
            isPinned = 1;
            this.pinnedObject.isPinned =true;
            item.isPinned = true;
            item[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
          }
        } else {
            isPinned = 1;
            item.isPinned = true;
            item[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
        }
        let filteredObject = [];
      var pinnedObj: any = {}
            pinnedObj.status = isPinned;
            pinnedObj['isPinned'] =true;
            if(item.objectId){
            pinnedObj.objectId = item.objectId;
              pinnedObj.menuCard = false;}
            else{
            pinnedObj.menuHierarchyId = item.id;
              pinnedObj.menuCard = true;
                }
            var finalObject: any = {};
            finalObject.pinnedObject = pinnedObj;
            finalObject.userId = this.userId;
            console.log('pinned final', finalObject);
      this.postDragDropData(finalObject).subscribe(data => {
      this.CommonService_.getDragDropData().subscribe(pinnedObjects => {
      sessionStorage.removeItem("bookmarkData");
      this.pinnedObject = pinnedObjects.data.pinnedObject;
      for(let favObj of this.favoriteCard){
      favObj['isPinned'] = false;
      favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark_border';
        if(this.pinnedObject){
            if(favObj.objectId && this.pinnedObject.objectId && favObj.objectId === this.pinnedObject.objectId){
              favObj['isPinned'] = true;
              favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
              console.log(' ')
            }else if(!this.pinnedObject.objectId && favObj.id && this.pinnedObject.menuHierarchyId && favObj.id === this.pinnedObject.menuHierarchyId){
              favObj['isPinned'] = true;
              favObj[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark';
               console.log("  ");       
            }
              }
            }
          this.dashboardCard.forEach(dashBoard =>{
          filteredObject = dashBoard.childMenu.filter(x =>{if(!x.objectId && this.pinnedObject  && !this.pinnedObject.objectId && this.pinnedObject.menuHierarchyId ){ return this.pinnedObject.menuHierarchyId === x.id}});
          dashBoard.childMenu.forEach(object => {object['isPinned'] =false; object[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark_border'})
          filteredObject.forEach(array => {array['isPinned'] =true; array[Constants.BOOKMARK_ICON_JSON_KEY] = 'bookmark'});
          });
         this.spinner.hide();
        });
      });
    }

addToExpandedMenu(item) {
  this.spinner.show();
  var isExpanded = this.userExpandedMenus.find(x => x.menuHierarchyId == item.id)
      if(isExpanded !== undefined ){
      if(isExpanded.status ==1){
      item.toggleFlg =false;
      isExpanded.status =0;
      }else{
      item.toggleFlg =true;
      isExpanded.status =1;
          }
      }else{
      item.toggleFlg =true;
      }
      let filteredObject = [];
      var expandedObj: any = {}
          expandedObj.menuHierarchyId = item.id;
          expandedObj.status = isExpanded ? isExpanded.status : 1;
          expandedObj['isExpanded'] =true;
          var finalObject: any = {};
          finalObject.expandedObject = expandedObj;
          finalObject.userId = this.userId;
          this.postDragDropData(finalObject).subscribe(data => {
          this.CommonService_.getDragDropData().subscribe(pinnedObjects => {
          sessionStorage.removeItem("bookmarkData");
          let filteredExpandedMenuArray =[];
          this.userExpandedMenus = pinnedObjects.data.userExpandMenus;
          filteredExpandedMenuArray.push(Object.assign([],this.dashboardCard.filter(x => this.userExpandedMenus.find(y => y.menuHierarchyId === x.id))));
          filteredExpandedMenuArray.forEach(array => {
            if(array && array.length>0){
            array.forEach(ar => ar['toggleFlg'] =true);}
            });
            this.spinner.hide();
        });
      });
    }

 postDragDropData(data) {
    var headers = new HttpHeaders(this.headerData);
    return this.http.post<any>(AppSetting.API_ENDPOINT + "secure/v1/dashboard/bookmark",data, { headers: headers }).pipe(catchError((error: Response) => {
      return observableThrowError("Something went wrong");
    }));
  }



  addClass(ml){
    document.querySelectorAll('.parent').forEach(v => {
      let item:any = v;
      if(item.innerText.toLowerCase().trim() == ml){
          v.classList.add("active")
      }else{
        v.classList.remove("active")
      }
    })
  }

}
