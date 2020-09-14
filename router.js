System.import("single-spa").then(function (singleSpa) {
    // ================================= register apps
    //  topbar_and_nav
    singleSpa.registerApplication(
        "shared",
        function () {
            return System.import("shared");
        },
        function (location) {
            return (
                isStartWith("/user-management") ||
                isStartWith("/contract") ||
                isStartWith("/mdm") ||
                isStartWith("/booking") ||
                isStartWith("/asso_booking-contract") ||
                isStartWith("/asso_network-contract") ||
                isStartWith("/asso_delivery-contract") ||
                isStartWith("/asso_air-contract") ||
                isStartWith("/asso_cargo-contract") ||               
                isStartWith("/associate-management-booking") ||  
                isStartWith("/associate-management-network") ||  
                isStartWith("/associate-management-delivery") ||                
                isStartWith("/prc-contract") ||
                isStartWith("/retail-contract") ||
                isStartWith("/login") ||
                isStartWith("/dashboard") ||
                isStartWith("/customer") ||
                isStartWith("/associate") ||
                isStartWith("/document-upload")
            );
        }
    );

    // user
    singleSpa.registerApplication(
        "user-management",
        function () {
            return System.import("user-management");
        },
        function (location) {
            return isStartWith("/user-management");
        }
    );

    // contract
    singleSpa.registerApplication(
        "contract",
        function () {
            return System.import("contract");
        },
        function (location) {
            return isStartWith("/contract");
        }
    );

    // mdm
    singleSpa.registerApplication(
        "mdm",
        function () {
            return System.import("mdm");
        },
        function (location) {
            return isStartWith("/mdm");
        }
    );

    // booking
    singleSpa.registerApplication(
        "booking",
        function () {
            return System.import("booking");
        },
        function (location) {
            return isStartWith("/booking");
        }
    );

    // associate booking
    singleSpa.registerApplication(
        "asso_booking-contract",
        function () {
            return System.import("asso_booking-contract");
        },
        function (location) {
            return isStartWith("/asso_booking-contract");
        }
    );
    // associate network
    singleSpa.registerApplication(
        "asso_network-contract",
        function () {
            return System.import("asso_network-contract");
        },
        function (location) {
            return isStartWith("/asso_network-contract");
        }
    );
    // associate delivery
    singleSpa.registerApplication(
        "asso_delivery-contract",
        function () {
            return System.import("asso_delivery-contract");
        },
        function (location) {
            return isStartWith("/asso_delivery-contract");
        }
    );
    // associate airfreight
    singleSpa.registerApplication(
        "asso_air-contract",
        function () {
            return System.import("asso_air-contract");
        },
        function (location) {
            return isStartWith("/asso_air-contract");
        }
    );
    // associate cargo
    singleSpa.registerApplication(
        "asso_cargo-contract",
        function () {
            return System.import("asso_cargo-contract");
        },
        function (location) {
            return isStartWith("/asso_cargo-contract");
        }
    );

    

       //associate-management-booking
       singleSpa.registerApplication(
        "associate-management-booking",
        function () {
            return System.import("associate-management-booking");
        },
        function (location) {
            return isStartWith("/associate-management-booking");
        }
         );

        //associate-management-network
       singleSpa.registerApplication(
        "associate-management-network",
        function () {
            return System.import("associate-management-network");
        },
        function (location) {
            return isStartWith("/associate-management-network");
        }
         );

        //associate-management-delivery
       singleSpa.registerApplication(
        "associate-management-delivery",
        function () {
            return System.import("associate-management-delivery");
        },
        function (location) {
            return isStartWith("/associate-management-delivery");
        }
         );

    
    // prc 
    singleSpa.registerApplication(
        "prc-contract",
        function () {
            return System.import("prc-contract");
        },
        function (location) {
            return isStartWith("/prc-contract");
        }
    );

    // retail contract 
    singleSpa.registerApplication(
        "retail-contract",
        function () {
            return System.import("retail-contract");
        },
        function (location) {
            return isStartWith("/retail-contract");
        }
    );


    function isStartWith(path) {
        if (window.location.pathname.includes("document-upload")) { // public url
            return location.pathname.startsWith(path);
        } else if (window.location.pathname !== "/login") { // public url 
            if (!sessionStorage.getItem('access-token')) { // token not persist
                window.location.href = '/login'
                return false;
            }
        }
        return location.pathname.startsWith(path);
    }

    singleSpa.start();
    window.addEventListener(
        "single-spa:before-routing-event",
        function () {
            // const originalEvent = evt.detail;
            // console.log("single-spa event", originalEvent);
        }
    );
    // ================================= end register apps

    // ================================= navigate to login when load
    if (window.location.pathname == "/") {
        // singleSpa.navigateToUrl("/login");
    }
    // ================================= end navigate to login  when load






















    // ================================= app overlay
    window.addEventListener(
        "single-spa:before-routing-event",
        function () {
            overlay("block");

        }
    );
    window.addEventListener("single-spa:app-change", function () {
        overlay("none");
    });
    window.addEventListener("single-spa:no-app-change", function () {
        overlay("none");
    });

    function overlay(state) {
        document.getElementById(
            "overlayMain"
        ).style.display = state;
    }
    // ================================= end app overlay
});