const faqQuestionAnswerMap = 
{
    1:"We offer a comprehensive range of tire services, including tire installation, repair, rotation, and seasonal swaps. We can handle everything from simple punctures to complete replacements, all at your preferred location.",
    2:"We strive to offer prompt service, typically arriving within an hour in the Houston area, depending on your location and our current schedule. For emergency services, we prioritize rapid response to get you back on the road as quickly as possible.",
    3:"Yes, our technicians are equipped to handle a wide variety of vehicles, including passenger cars, SUVs, and light trucks. For specific requirements or commercial vehicle services, please contact us directly to discuss your needs.",
    4:"We operate seven days a week, from 8:00 AM to 8:00 PM. For services outside of these hours, including emergency assistance, please call our hotline for availability.",

}

function minimizeAllFaqAnswers()
{
    let answerBoxId = '';
    for(let questionNumber = 1; questionNumber < 5; questionNumber += 1)
    {
        answerBoxId = "faqBoxAnswer" + questionNumber.toString()
        if (document.getElementById(answerBoxId).innerHTML != ``)
        {
            minimizeFaqAnswer(questionNumber);
        }
    }
}

function generateFaqAnswer(questionNumber)
{
    minimizeAllFaqAnswers();

    let boxId = "faqBox" + questionNumber.toString()
    let answerBoxId = "faqBoxAnswer" + questionNumber.toString()
    document.getElementById(answerBoxId).innerHTML = `<p>${faqQuestionAnswerMap[questionNumber]} <br><br><button class="normalButton" onclick="minimizeFaqAnswer(${questionNumber})">Hide Answer</button></p>`;
}

function minimizeFaqAnswer(questionNumber)
{
    let boxId = "faqBox" + questionNumber.toString()
    let answerBoxId = "faqBoxAnswer" + questionNumber.toString()
    document.getElementById(answerBoxId).innerHTML = ``;
}

// References to DOM Elements
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var book = document.getElementById("book");

var paper1 = document.getElementById("p1");
var paper2 = document.getElementById("p2");
var paper3 = document.getElementById("p3");


// Business Logic
let currentLocation = 1;
let numOfPapers = 2;
let maxLocation = numOfPapers + 1;

function openBook() {
    document.getElementById("book").style.transform = "translateX(50%)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        document.getElementById("book").style.transform = "translateX(0%)";
    } else {
        document.getElementById("book").style.transform = "translateX(100%)";
    }
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        switch(currentLocation) {
            case 1:
                openBook();
                document.getElementById("p1").classList.add("flipped");
                document.getElementById("p1").style.zIndex = 1;
                break;
            case 2:
                document.getElementById("p2").classList.add("flipped");
                document.getElementById("p2").style.zIndex = 2;
                closeBook(false);
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                closeBook(true);
                document.getElementById("p1").classList.remove("flipped");
                document.getElementById("p2").classList.remove("flipped");
                document.getElementById("p2").style.zIndex = 1;
                document.getElementById("p1").style.zIndex = 2;
                break;
            case 3:
                openBook();
                document.getElementById("p2").classList.remove("flipped");
                document.getElementById("p2").style.zIndex = 1;
                break;

            default:
                throw new Error("unkown state");
        }

        currentLocation--;
    }
}

function renderMobileMenu()
{
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function sendMessageOnClick()
{
    document.getElementById("sendMessageButton").disabled = true;
    sendMessage( function(responseMessage)
        {

            if(responseMessage == "Successfully sent message!")
            {
                alert(responseMessage);
                location.reload();
            }else
            {
                alert(responseMessage);
                document.getElementById("sendMessageButton").disabled = false;
            }
        });
}

function sendMessage(callBack = null)
{

    let params = {
        "organization": "marioRP",
        "token": "fc06cbcca471b485bb756a240c876bf2341ddb44a70b7e68d3ae6d82f5e5e177",
        "name" : document.getElementById("clientName").value,
        "reason" : document.getElementById("clientReason").value,
        "email" : document.getElementById("clientEmail").value,
        "message": document.getElementById("clientMessage").value
    };
    
    endpointCall("sendMessage", params, function(data)
                                {
                                    //Store id and name in cookies for later use
                                    if(data["status"] == "success")
                                    {
                                        callBack('Successfully sent message!');
                                    }else if(data["status"] == "failed")
                                    {
                                        callBack("Failed to send message. Please try again!");
                                    }
                                });
}