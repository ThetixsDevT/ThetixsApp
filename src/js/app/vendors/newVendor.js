app.controller('NewVendorCtrl', ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes',  '$modal', 'MyService', 'filterFilter', 'datepickerConfig', 'toaster', '$state',
  function($scope, $filter, $http, editableOptions, editableThemes,$modal, MyService, filterFilter, datepickerConfig, toaster, $state){
 if (typeof MyService.data.email==="undefined"){
  $state.go('access.signin');
}
$scope.vendors=function () {
  $state.go('app.vendors');
  // body...
}
$scope.vendor=[];

    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Miembro habilitado con exito',

    titleNP: '',
    typeNP: 'success',
    textNP: ''   
  };
      $scope.popOkNewVendor = function(){
        toaster.pop($scope.toaster.typeNP, $scope.toaster.titleNP, $scope.toaster.textMP);
    };
     $scope.countries = [ // Taken from https://gist.github.com/unceus/6501985
        {name: 'Afghanistan', code: 'AF'},
        {name: 'Åland Islands', code: 'AX'},
        {name: 'Albania', code: 'AL'},
        {name: 'Algeria', code: 'DZ'},
        {name: 'American Samoa', code: 'AS'},
        {name: 'Andorra', code: 'AD'},
        {name: 'Angola', code: 'AO'},
        {name: 'Anguilla', code: 'AI'},
        {name: 'Antarctica', code: 'AQ'},
        {name: 'Antigua and Barbuda', code: 'AG'},
        {name: 'Argentina', code: 'AR'},
        {name: 'Armenia', code: 'AM'},
        {name: 'Aruba', code: 'AW'},
        {name: 'Australia', code: 'AU'},
        {name: 'Austria', code: 'AT'},
        {name: 'Azerbaijan', code: 'AZ'},
        {name: 'Bahamas', code: 'BS'},
        {name: 'Bahrain', code: 'BH'},
        {name: 'Bangladesh', code: 'BD'},
        {name: 'Barbados', code: 'BB'},
        {name: 'Belarus', code: 'BY'},
        {name: 'Belgium', code: 'BE'},
        {name: 'Belize', code: 'BZ'},
        {name: 'Benin', code: 'BJ'},
        {name: 'Bermuda', code: 'BM'},
        {name: 'Bhutan', code: 'BT'},
        {name: 'Bolivia', code: 'BO'},
        {name: 'Bosnia and Herzegovina', code: 'BA'},
        {name: 'Botswana', code: 'BW'},
        {name: 'Bouvet Island', code: 'BV'},
        {name: 'Brazil', code: 'BR'},
        {name: 'British Indian Ocean Territory', code: 'IO'},
        {name: 'Brunei Darussalam', code: 'BN'},
        {name: 'Bulgaria', code: 'BG'},
        {name: 'Burkina Faso', code: 'BF'},
        {name: 'Burundi', code: 'BI'},
        {name: 'Cambodia', code: 'KH'},
        {name: 'Cameroon', code: 'CM'},
        {name: 'Canada', code: 'CA'},
        {name: 'Cape Verde', code: 'CV'},
        {name: 'Cayman Islands', code: 'KY'},
        {name: 'Central African Republic', code: 'CF'},
        {name: 'Chad', code: 'TD'},
        {name: 'Chile', code: 'CL'},
        {name: 'China', code: 'CN'},
        {name: 'Christmas Island', code: 'CX'},
        {name: 'Cocos (Keeling) Islands', code: 'CC'},
        {name: 'Colombia', code: 'CO'},
        {name: 'Comoros', code: 'KM'},
        {name: 'Congo', code: 'CG'},
        {name: 'Congo, The Democratic Republic of the', code: 'CD'},
        {name: 'Cook Islands', code: 'CK'},
        {name: 'Costa Rica', code: 'CR'},
        {name: 'Cote D\'Ivoire', code: 'CI'},
        {name: 'Croatia', code: 'HR'},
        {name: 'Cuba', code: 'CU'},
        {name: 'Cyprus', code: 'CY'},
        {name: 'Czech Republic', code: 'CZ'},
        {name: 'Denmark', code: 'DK'},
        {name: 'Djibouti', code: 'DJ'},
        {name: 'Dominica', code: 'DM'},
        {name: 'Dominican Republic', code: 'DO'},
        {name: 'Ecuador', code: 'EC'},
        {name: 'Egypt', code: 'EG'},
        {name: 'El Salvador', code: 'SV'},
        {name: 'Equatorial Guinea', code: 'GQ'},
        {name: 'Eritrea', code: 'ER'},
        {name: 'Estonia', code: 'EE'},
        {name: 'Ethiopia', code: 'ET'},
        {name: 'Falkland Islands (Malvinas)', code: 'FK'},
        {name: 'Faroe Islands', code: 'FO'},
        {name: 'Fiji', code: 'FJ'},
        {name: 'Finland', code: 'FI'},
        {name: 'France', code: 'FR'},
        {name: 'French Guiana', code: 'GF'},
        {name: 'French Polynesia', code: 'PF'},
        {name: 'French Southern Territories', code: 'TF'},
        {name: 'Gabon', code: 'GA'},
        {name: 'Gambia', code: 'GM'},
        {name: 'Georgia', code: 'GE'},
        {name: 'Germany', code: 'DE'},
        {name: 'Ghana', code: 'GH'},
        {name: 'Gibraltar', code: 'GI'},
        {name: 'Greece', code: 'GR'},
        {name: 'Greenland', code: 'GL'},
        {name: 'Grenada', code: 'GD'},
        {name: 'Guadeloupe', code: 'GP'},
        {name: 'Guam', code: 'GU'},
        {name: 'Guatemala', code: 'GT'},
        {name: 'Guernsey', code: 'GG'},
        {name: 'Guinea', code: 'GN'},
        {name: 'Guinea-Bissau', code: 'GW'},
        {name: 'Guyana', code: 'GY'},
        {name: 'Haiti', code: 'HT'},
        {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
        {name: 'Holy See (Vatican City State)', code: 'VA'},
        {name: 'Honduras', code: 'HN'},
        {name: 'Hong Kong', code: 'HK'},
        {name: 'Hungary', code: 'HU'},
        {name: 'Iceland', code: 'IS'},
        {name: 'India', code: 'IN'},
        {name: 'Indonesia', code: 'ID'},
        {name: 'Iran, Islamic Republic Of', code: 'IR'},
        {name: 'Iraq', code: 'IQ'},
        {name: 'Ireland', code: 'IE'},
        {name: 'Isle of Man', code: 'IM'},
        {name: 'Israel', code: 'IL'},
        {name: 'Italy', code: 'IT'},
        {name: 'Jamaica', code: 'JM'},
        {name: 'Japan', code: 'JP'},
        {name: 'Jersey', code: 'JE'},
        {name: 'Jordan', code: 'JO'},
        {name: 'Kazakhstan', code: 'KZ'},
        {name: 'Kenya', code: 'KE'},
        {name: 'Kiribati', code: 'KI'},
        {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
        {name: 'Korea, Republic of', code: 'KR'},
        {name: 'Kuwait', code: 'KW'},
        {name: 'Kyrgyzstan', code: 'KG'},
        {name: 'Lao People\'s Democratic Republic', code: 'LA'},
        {name: 'Latvia', code: 'LV'},
        {name: 'Lebanon', code: 'LB'},
        {name: 'Lesotho', code: 'LS'},
        {name: 'Liberia', code: 'LR'},
        {name: 'Libyan Arab Jamahiriya', code: 'LY'},
        {name: 'Liechtenstein', code: 'LI'},
        {name: 'Lithuania', code: 'LT'},
        {name: 'Luxembourg', code: 'LU'},
        {name: 'Macao', code: 'MO'},
        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
        {name: 'Madagascar', code: 'MG'},
        {name: 'Malawi', code: 'MW'},
        {name: 'Malaysia', code: 'MY'},
        {name: 'Maldives', code: 'MV'},
        {name: 'Mali', code: 'ML'},
        {name: 'Malta', code: 'MT'},
        {name: 'Marshall Islands', code: 'MH'},
        {name: 'Martinique', code: 'MQ'},
        {name: 'Mauritania', code: 'MR'},
        {name: 'Mauritius', code: 'MU'},
        {name: 'Mayotte', code: 'YT'},
        {name: 'Mexico', code: 'MX'},
        {name: 'Micronesia, Federated States of', code: 'FM'},
        {name: 'Moldova, Republic of', code: 'MD'},
        {name: 'Monaco', code: 'MC'},
        {name: 'Mongolia', code: 'MN'},
        {name: 'Montserrat', code: 'MS'},
        {name: 'Morocco', code: 'MA'},
        {name: 'Mozambique', code: 'MZ'},
        {name: 'Myanmar', code: 'MM'},
        {name: 'Namibia', code: 'NA'},
        {name: 'Nauru', code: 'NR'},
        {name: 'Nepal', code: 'NP'},
        {name: 'Netherlands', code: 'NL'},
        {name: 'Netherlands Antilles', code: 'AN'},
        {name: 'New Caledonia', code: 'NC'},
        {name: 'New Zealand', code: 'NZ'},
        {name: 'Nicaragua', code: 'NI'},
        {name: 'Niger', code: 'NE'},
        {name: 'Nigeria', code: 'NG'},
        {name: 'Niue', code: 'NU'},
        {name: 'Norfolk Island', code: 'NF'},
        {name: 'Northern Mariana Islands', code: 'MP'},
        {name: 'Norway', code: 'NO'},
        {name: 'Oman', code: 'OM'},
        {name: 'Pakistan', code: 'PK'},
        {name: 'Palau', code: 'PW'},
        {name: 'Palestinian Territory, Occupied', code: 'PS'},
        {name: 'Panama', code: 'PA'},
        {name: 'Papua New Guinea', code: 'PG'},
        {name: 'Paraguay', code: 'PY'},
        {name: 'Peru', code: 'PE'},
        {name: 'Philippines', code: 'PH'},
        {name: 'Pitcairn', code: 'PN'},
        {name: 'Poland', code: 'PL'},
        {name: 'Portugal', code: 'PT'},
        {name: 'Puerto Rico', code: 'PR'},
        {name: 'Qatar', code: 'QA'},
        {name: 'Reunion', code: 'RE'},
        {name: 'Romania', code: 'RO'},
        {name: 'Russian Federation', code: 'RU'},
        {name: 'Rwanda', code: 'RW'},
        {name: 'Saint Helena', code: 'SH'},
        {name: 'Saint Kitts and Nevis', code: 'KN'},
        {name: 'Saint Lucia', code: 'LC'},
        {name: 'Saint Pierre and Miquelon', code: 'PM'},
        {name: 'Saint Vincent and the Grenadines', code: 'VC'},
        {name: 'Samoa', code: 'WS'},
        {name: 'San Marino', code: 'SM'},
        {name: 'Sao Tome and Principe', code: 'ST'},
        {name: 'Saudi Arabia', code: 'SA'},
        {name: 'Senegal', code: 'SN'},
        {name: 'Serbia and Montenegro', code: 'CS'},
        {name: 'Seychelles', code: 'SC'},
        {name: 'Sierra Leone', code: 'SL'},
        {name: 'Singapore', code: 'SG'},
        {name: 'Slovakia', code: 'SK'},
        {name: 'Slovenia', code: 'SI'},
        {name: 'Solomon Islands', code: 'SB'},
        {name: 'Somalia', code: 'SO'},
        {name: 'South Africa', code: 'ZA'},
        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
        {name: 'Spain', code: 'ES'},
        {name: 'Sri Lanka', code: 'LK'},
        {name: 'Sudan', code: 'SD'},
        {name: 'Suriname', code: 'SR'},
        {name: 'Svalbard and Jan Mayen', code: 'SJ'},
        {name: 'Swaziland', code: 'SZ'},
        {name: 'Sweden', code: 'SE'},
        {name: 'Switzerland', code: 'CH'},
        {name: 'Syrian Arab Republic', code: 'SY'},
        {name: 'Taiwan, Province of China', code: 'TW'},
        {name: 'Tajikistan', code: 'TJ'},
        {name: 'Tanzania, United Republic of', code: 'TZ'},
        {name: 'Thailand', code: 'TH'},
        {name: 'Timor-Leste', code: 'TL'},
        {name: 'Togo', code: 'TG'},
        {name: 'Tokelau', code: 'TK'},
        {name: 'Tonga', code: 'TO'},
        {name: 'Trinidad and Tobago', code: 'TT'},
        {name: 'Tunisia', code: 'TN'},
        {name: 'Turkey', code: 'TR'},
        {name: 'Turkmenistan', code: 'TM'},
        {name: 'Turks and Caicos Islands', code: 'TC'},
        {name: 'Tuvalu', code: 'TV'},
        {name: 'Uganda', code: 'UG'},
        {name: 'Ukraine', code: 'UA'},
        {name: 'United Arab Emirates', code: 'AE'},
        {name: 'United Kingdom', code: 'GB'},
        {name: 'United States', code: 'US'},
        {name: 'United States Minor Outlying Islands', code: 'UM'},
        {name: 'Uruguay', code: 'UY'},
        {name: 'Uzbekistan', code: 'UZ'},
        {name: 'Vanuatu', code: 'VU'},
        {name: 'Venezuela', code: 'VE'},
        {name: 'Vietnam', code: 'VN'},
        {name: 'Virgin Islands, British', code: 'VG'},
        {name: 'Virgin Islands, U.S.', code: 'VI'},
        {name: 'Wallis and Futuna', code: 'WF'},
        {name: 'Western Sahara', code: 'EH'},
        {name: 'Yemen', code: 'YE'},
        {name: 'Zambia', code: 'ZM'},
        {name: 'Zimbabwe', code: 'ZW'}
        ];

        $scope.passwordLength = 12;
    $scope.addUpper = true;
    $scope.addNumbers = true;
    $scope.addSymbols = false;
   $scope.createPassword = function(){
        var lowerCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var upperCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var numbers = ['0','1','2','3','4','5','6','7','8','9'];
        var symbols = ['!', '"', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
        var finalCharacters = lowerCharacters;
        if($scope.addUpper){
            finalCharacters = finalCharacters.concat(upperCharacters);
        }
        if($scope.addNumbers){
            finalCharacters = finalCharacters.concat(numbers);
        }
        if($scope.addSymbols){
            finalCharacters = finalCharacters.concat(symbols);
        }
        var passwordArray = [];
        for (var i = 1; i < $scope.passwordLength; i++) {
            passwordArray.push(finalCharacters[Math.floor(Math.random() * finalCharacters.length)]);
        };
        $scope.password = passwordArray.join("");
      // alert("PASS: "+$scope.password);
    };

    // $scope.saveNewVendor=function (item) {
    //   var item = item;
    //   item.status="pending";
    //   item.level=3;
    //   $http.post('https://www.thetixsapp.com:1350/vendor',item);
    //   $scope.popOkNewVendor();
    //   setTimeout(function() {
    //      $state.go('app.vendors');
    //    }, 1000);
     
    //   // body...
    // }


   $scope.saveNewVendor=function (item) {
      var item = item;
      item.status="active";
      // item.images= $scope.images;
      $scope.createPassword();
      item.password=$scope.password;
      item.level=3;
      $http.post('https://www.thetixsapp.com:1350/vendor',item);
       // item.repName=item.repName;
      item.receiveremail=item.email;
      item.text="to Thetixs network. Here is all you need to get started!";
      var footer="Manager";
      item.fullname=item.name+" "+item.lastName;
      $http({
        method:'POST',
        url:'libs/phpmailer/accountActivate.php',
        data: 'name='+item.fullname +'&receiveremail='+item.receiveremail+'&email='+item.email+'&footer='+footer+'&text='+item.text+'&password='+item.password+'&emailSender='+MyService.data.managerAccount+'&emailPass='+MyService.data.managerAccountPass+'&managerAccountHost='+MyService.data.managerAccountHost,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
        });
      $scope.popOkNewVendor();
      setTimeout(function() {
         $state.go('app.welcome');
       }, 1000);
     
      // body...
    }





    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';





    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
   
    $scope.html5 = {
      email: 'email@example.com',
      tel: '123-45-67',
      number: 29,
      range: 10,
      url: 'http://example.com',
      search: 'blabla',
      color: '#6a4415',
      date: null,
      time: '12:30',
      datetime: null,
      month: null,
      week: null
    };

    $scope.user = {
    	name: 'awesome',
    	desc: 'Awesome user \ndescription!',
      status: 2,
      agenda: 1,
      remember: false
    }; 

    $scope.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'}
    ];

    $scope.agenda = [
      {value: 1, text: 'male'},
      {value: 2, text: 'female'}
    ];

    $scope.showStatus = function() {
      var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
      return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.showAgenda = function() {
      var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
      return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
    };

    // editable table
    $scope.users = [
      {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
      {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
      {id: 3, name: 'awesome user3', status: 2, group: null}
    ];

    $scope.groups = [];
    $scope.loadGroups = function() {
      return $scope.groups.length ? null : $http.get('api/groups').success(function(data) {
        $scope.groups = data;
      });
    };

    $scope.showGroup = function(user) {
      if(user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };

    $scope.showStatus = function(user) {
      var selected = [];
      if(user && user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.checkName = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.saveUser = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      // return $http.post('api/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
      $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
      $scope.inserted = {
        id: $scope.users.length+1,
        name: '',
        status: null,
        group: null 
      };
      $scope.users.push($scope.inserted);
    };

}]);
