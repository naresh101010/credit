
export class ErrorConstants {

  public static errorNotFound = 'Details Not Found !! Service Error :( ';
  public static errorBadRquest = 'Bad Request';
  public static errorUniqueConstrain = 'Duplicate Value'
  public static errorServiceException = 'Service Exception'
	

  public static VAL_ERR_400 = 'Opportunity Type not valid'
  public static B_ERR_500 = 'Opportunity Details Updation failed'
  public static B_ERR_520	 = 'Error in fetching Opportunity'
  public static DUP_ERR_201	 = 'Salesforce Oppr Id already exists. Cannot update.'
  
  public static B_ERR_501	 = 'Offerings addition failed for Service Line '
  public static B_ERR_502 = '	Error in fetching Offerings '
  
  public static VAL_ERR_401	= 'SFX code already exists'
  public static B_ERR_504	 = 'Contract addition failed for Opportunity'
  public static  B_ERR_505 = '	Error in fetching Contract'
  
  public static B_ERR_506	 = 'Ratecard addition failed for Offfering '
  public static B_ERR_507	 = 'Error in fetching Ratecard'
  
  public static B_ERR_508 = '	Commercial addition failed for Ratecard'
  public static B_ERR_509	 = 'Error in fetching Commercial'
  
  public static B_ERR_510 = '	Commandment addition failed'
  public static B_ERR_511	 = 'Error in fetching Commandment'
  
  public static B_ERR_512 = '	Branch addition failed for Ratecard'
  public static B_ERR_513 = '	Error in fetching Branches'
  
  public static B_ERR_514 = '	SLA addition failed for Ratecard'
  public static B_ERR_515	 = 'Error in fetching SLA '
  
  public static B_ERR_516 = '	VMI addition failed for Ratecard'
  public static B_ERR_517 = '	Error in fetching VMI'
  
  public static B_ERR_518 = '	Billing addition failed at level'
  public static B_ERR_519 = '	Error in fetching Billing Details'
  
  public static B_ERR_521	 = 'Document upload failed'
  public static B_ERR_522	 = 'Error in fetching Documents'
  
  public static UM_VAL_ERR_400 = "You already have 5 favourite objects";

  constructor() { }

  public static getValue(key){
    let map = new Map();
    map.set(404,ErrorConstants.errorNotFound);
    map.set(501,ErrorConstants.errorUniqueConstrain);
    map.set(500,ErrorConstants.errorServiceException);
    map.set(400,ErrorConstants.errorBadRquest);

map.set("VAL_ERR-400",ErrorConstants.VAL_ERR_400 );
map.set("B_ERR-500",ErrorConstants.B_ERR_500 );
map.set("B_ERR-520",ErrorConstants.B_ERR_520 );
map.set("DUP_ERR-201",ErrorConstants.DUP_ERR_201);
  
map.set("B_ERR-501",ErrorConstants.B_ERR_501);
map.set("B_ERR-502",ErrorConstants.B_ERR_502);
  
map.set("VAL_ERR-401",ErrorConstants.VAL_ERR_401);
map.set("B_ERR-504",ErrorConstants.B_ERR_504);
map.set("B_ERR-505",ErrorConstants. B_ERR_505 );
  
map.set("B_ERR-506",ErrorConstants.B_ERR_506);
map.set("B_ERR-507",ErrorConstants.B_ERR_507);
  
map.set("B_ERR-508",ErrorConstants.B_ERR_508 );
map.set("B_ERR-509",ErrorConstants.B_ERR_509);
  
map.set("B_ERR-510",ErrorConstants.B_ERR_510 );
map.set("B_ERR-511",ErrorConstants.B_ERR_511);
  
map.set("B_ERR-512",ErrorConstants.B_ERR_512 );
map.set("B_ERR-513",ErrorConstants.B_ERR_513);
  
map.set("B_ERR-514",ErrorConstants.B_ERR_514 );
map.set("B_ERR-515",ErrorConstants.B_ERR_515);
  
map.set("B_ERR-516",ErrorConstants.B_ERR_516);
map.set("B_ERR-517",ErrorConstants.B_ERR_517 );
  
map.set("B_ERR-518",ErrorConstants.B_ERR_518 );
map.set("B_ERR-519",ErrorConstants.B_ERR_519 );
  
map.set("B_ERR-521",ErrorConstants.B_ERR_521);
map.set("B_ERR-522",ErrorConstants.B_ERR_522);

map.set("UM_VAL_ERR-400",ErrorConstants.UM_VAL_ERR_400);

    return map.get(key);
  }

  public static validateException(data) {
    let ob = {
      isSuccess: false,
      message: ''
    };
    if (data.status === 'Success' || data.status === 'success' || data.status === 'SUCCESS') {
      ob.isSuccess = true;
      return ob;
    } else {
      if (data.errors) {
        ob.isSuccess = false;
        ob.message = ErrorConstants.getValue(data.errors.error[0].code);
        if (!ob.message || ob.message === '' ) {
          ob.message = this.errorNotFound;
        }
      }
      return ob;
    }
  }
}





