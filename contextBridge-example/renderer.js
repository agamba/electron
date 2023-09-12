// basic event listener for the demo
const element = document.getElementById("myBtn");
element.addEventListener("click", sendMessage);

// test function for on click button call back
function sendMessage() {
  let msg = document.getElementById("myMsg").value;
  window.BBB_API.sendToMain(msg).then(function (mainRes) {
    console.log("Response from main: ", mainRes);
    document.getElementById("resCode").innerHTML = JSON.stringify(mainRes);
  });
}
