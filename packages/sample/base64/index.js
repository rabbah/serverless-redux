const { default: base64url } = require("base64url");

function main() {
    let string = "ladies and gentlemen we are floating in space";
    let base64string = base64url(string);
    console.log(base64string);
    return {
        "body": base64string
    }
}