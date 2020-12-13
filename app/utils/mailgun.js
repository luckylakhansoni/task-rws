const constant = require("../utils/constant");
const mailgun = require("mailgun-js");
module.exports.sendMail = async (to, subject, text) =>{
	try {
		const DOMAIN = constant.mailgunCredential.domain;
		const mg = mailgun({apiKey: constant.mailgunCredential.apiKey,domain: DOMAIN});
		const data = {
			to: to ,
			from: constant.mailgunCredential.from,
			subject: subject,
			text: text 
		};
		let response = await mg.messages().send(data)
		if(response.message) {
			return true
		} else {
			return false	  
		}

	} catch (err) {
		console.log('Error in sendMail => ', err);
	}
}