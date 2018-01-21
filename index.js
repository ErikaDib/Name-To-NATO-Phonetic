var bodyParser = require('body-parser');    // To get access to elements in html body
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // idk what this does
var express = require('express');
var hbs  = require('express-handlebars');

var app = express();

// let express know we're using handlebars
// 2nd param: setting properties for handlebars (file extension name)
//                                              (default layout filename)
app.engine('hbs', hbs({extname: 'hbs'},{defaultLayout: 'main'} ));
app.set('view engine', 'hbs');

// To be able to find stylesheet
// app.use(express.static(path.join(__dirname, '/public')));

var server = app.listen(3000,listening);
function listening(){
    console.log("Listening");
}

// Our Data: NATO phonetic alphabet
var alphaWords = {
    words : ["Alfa", "Bravo", "Charlie",
             "Delta", "Echo", "Foxtrot",
             "Golf", "Hotel", "India",
             "Juliett", "Kilo", "Lima",
             "Mike", "November","Oscar",
             "Papa", "Quebec", "Romeo",
             "Sierra", "Tango","Uniform",
             "Victor", "Whiskey","X-ray",
             "Yankee", "Zulu"
            ]
}
var arrLength = alphaWords.words.length;
var output ="";
var outputHTML = "";


//  route name   ,  needed to ready body elem  ,  functionality
app.post('/match/add/', urlencodedParser, function(req, res) {
    console.log("hey we're in post");
    var usersName = req.body.names;     // input name: 'names'  **INPUT**
    var allCapsInput = usersName.toUpperCase(); // b/c when comparing ('a' != 'A') EX: anna != Alfa November November Alfa
    console.log(usersName + " modified to -->" + allCapsInput);

    if (usersName != '')
    {
        output ="";
        var div = "<div><b>Name: " + usersName + "</b><br>";                         // reset output
        for (var nmIdx=0; nmIdx < usersName.length; nmIdx++){ // for each letter in user input
            var curNmLtr = allCapsInput.charAt(nmIdx);     // current letter in user input

            for(var j=0; j < arrLength; j++){           // for each word in alphaWords
                var natoWord = alphaWords.words[j];     // current word in alphaWords
                if( curNmLtr == natoWord.charAt(0) )   // compare input and natoWord first letters
                {
                    div += alphaWords.words[j] + "<br>";
                     output += alphaWords.words[j] + "\n";  // if they match, concatenate
                }
            }  // inner for-loop
         } // outer for-loop

         div += "<br></div>";
         outputHTML = div + outputHTML;
    } // close if

    console.log("v v v v v");
    console.log(output);
    console.log("^ ^ ^ ^ ^");
    res.redirect('/match');
});

app.get('/match', function(request, response){
    response.render('home', {output : output, outputHTML:outputHTML}); // load homepage and pass output var
});
