var replace_dom=function(user) {
	var e=document.getElementsByTagName("*");
	for (var i=0; i < e.length; i++) {
		var children = e[i].childNodes;
		for (var j=0;j<children.length; j++) {
			if (children[j].nodeType == 3 &&
				children[j].nodeValue.indexOf("YOUR_API_KEY") > -1) {
				children[j].nodeValue = children[j].nodeValue.replace(
					"YOUR_API_KEY", user.api_key);
			}
	                if (children[j].nodeType == 3 &&
                                children[j].nodeValue.indexOf("YOU@YOUR_DOMAIN_NAME") > -1) {
                                children[j].nodeValue = children[j].nodeValue.replace(
                                        "YOU@YOUR_DOMAIN_NAME", user.email);
			}
			if (children[j].nodeType == 3 &&
				children[j].nodeValue.indexOf("YOUR_DOMAIN_NAME") > -1) {
				children[j].nodeValue = children[j].nodeValue.replace(
					"YOUR_DOMAIN_NAME", user.active_domain);
			}
		}
	}
}
var retrieve_and_replace=function (){
	var x= new XMLHttpRequest();
	x.open("get", "https://website.ninomail.com/sessions/current");
	x.withCredentials = true;
	x.onload= function() {
		if (x.status != 200) {
			return false;
		}
		var user = JSON.parse(x.responseText);
		replace_dom(user);
	};
	x.send();
}
retrieve_and_replace();
