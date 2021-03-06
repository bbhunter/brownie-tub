const WebShellSchema = {
	title: "web shell schema",
	description: "describes a web shell",
	version: 0,
	type: "object",
	properties: {
		ipOrHostname: {
			type: "string",
			primary: true
		},
		commandParamType: {
			type: "string",
			enum: ["header", "cookie", "POST", "GET"]
		},
		commandParam: {
			type: "string"
		},
		commandEncoding: {
			type: "string",
			enum: ["base64", "None"]
		},
		passwordEnabled: {
			type: "boolean",
			default: false
		},
		passwordParamType: {
			type: "string",
			enum: ["none", "header", "cookie", "POST", "GET"]
		},
		passwordParam: {
			type: "string"
		},
		password: {
			type: "string"
		},
		os: {
			type: "string"
		}
	},
	required: ["ipOrHostname", "commandParamType", "commandParam", "passwordEnabled"]
}

module.exports = {
	WebShellSchema
};