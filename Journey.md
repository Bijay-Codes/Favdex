Day 1 & 2 log---

These 2 days were very crucial and kind of tiring for me as well as i fought off the biggest boss/problem that i have faced till now which i didnt even know existed and that boss was... starting up a project. Yes that was the boss i fought these 2 days. I thought if i mentally plan out everything and write it in a file it will be easy to build it but apparently the most difficult thing as for now was to even get started with building instead of staring at the editor.
Heres how i beat this boss- I just coded and put everything (logic/rendering/all the bullshit) in app.jsx which enabled me to not think of any stuff like usability, readability and future scaling problems and just start writing code... and it worked i started and everything just... came together? well as long as it works i have no issues XD.

Learnt today---

1. useEffect always runs AFTER the paint session/rendering phase has been done. like microtasks and macrotasks always run after the whole script has finished running its the same way. It caused me so much confusion and rewrites that i just dont know i kept my cool.

2. Creating custom hooks is so Easy... like literally so easy all we have to do is use the 'use' keyword at the start of a function and thats all it takes. They are useful when we want to run something but that something doesnt actually render anything but just does logical stuff so we dont put it in the return block of the component and instead call it like a function, In this project im using it as a initializer which runs 1 time when the page reloads to do stuff like set up event listeners kind of thing called intersection observer they are basically functions given to us by browser api to track if a dom is visible to the user or not.

3. useRef can be used to access DOM inside react and doesnt trigger any rerender alarm like useStates. Today i used it to capture a DOM/div inside it to use as an intersection observer whose job is to fetch more pokemon when the user scrolls down.

4. Found about the loading="lazy" value. Its a very good feature of html which we can use to render a image conditionally (only load if the image is close to being seen by the user), This can be helpful to reduce the lag and internet usage of the users.

5. useRef cant be passed into the components as a prop conveniently, i had to use forwardRef to pass the ref to the last div of the UnLoaded divs to add an intersection observer in it. Lets understand how it works, all we have to do is const FunctionName = forwardRef((props,ref)=>{
    return the element whose ref you want. in my case it was 
    return(
        div
        div
        div
        and then finally attach the ref to the element. <div ref={ref}></div> thats all and now the ref contains the element/DOM
    )
})
Why we cant pass ref's to components as props? well thats because the html returned by the react components arent actual html the react cant tell apart which element we want to attach ref to if the component has multiple DOM elements being rendered. In simple words a parent component can never access the elements of its child ref, it gets confused on which ref we are pointing to and thats why we use forward ref to specifically point at a element we want to useRef on.

6. Learnt that we cant destructure a async function as it will always return a promise since its a asynchronous code.



Side Discoveries{

   1. We can just do if(condition) effect. this will work without the {} brackets since the effect is returned. we can even put a function there and it will run.

   2. When we need to conditionally render a component in a return block of other component/functions we need to either   use the ternary operators or do condition && <Component> this runs because if the first condition is false then react skips the component function.(cant use if else because they are logical entries while the return block of expects something that returns a expression)

   3. Learnt to kind of read the network tab in the devtools what i learnt was-

    a. The numbers shown at the network tab in status section means something like a 200 means all went well and the response came/resolved and 404 means something went wrong and the error happened such as internet issue, no data, api limits crossed etc.

     b. The Transferred section shows if the data was locally present and got cached/reused by the browser or it was fetched to a site if it did get fetched how much internet is passed to it.

     c. Size section shows total size of the data being fetched

     d. Domain name shows which site the data is coming from and Initiator shows which file in your environment initiated the request/fetch. Type shows what type of data is being received and these is also a filter by type section which we can use to track specific type of data type.

     e. There are options like Disable cache which ensures no data will be stored in the browser for now till it is unchecked and Throttling... this is kind of confusing lets google it haha. As i figured. Its a way we can simulate slow internet connection like no Throttling means no low latency mask and offline means no network at all. Theres many options to try out as well.

   4. Ive noticed that the PokeAPI is giving me more than enough data so i cut it down for efficiency/less confusion and storage management since all of it was stored in localstorage (5-10mb limit). Also saw some images arent being loaded because the data for them isnt in PokeAPI yet So i plan to replace the old sprites which arent available right now with a mew silhouette image. Why mew? because its cute. Next question.
   
}

I plan to use CSS for the layout and some weird animations of the elements while keeping the color and simple designing to be done using tailwind.
Im still not used to see a wall of text in my div as its classname... Looks ugly on my side but atleast looks good on the browser.

Day 3 log---
Difficult day today. So many assignments to complete... I guess i will manage it somehow.


1. Components cant be called/used to render on an event listner like onclick... it can just be called in a return block of jsx function. What i meant to say is if we wanted to add a event listener which hears a click and if it gets clicked we call a component? no we cant do that. Same logic as why we cant use if else satements.

2. Thers a inbuilt function called stopPropagation that can stop the onclick event from running completely by stopping it from going to browser just like a bouncer. I used it in the modal of the pokemon details... more data for modal is going to be added at some point but i am currently focussing on creating a basic pokedex and then i will add features on top like an icing.

3. Used a Element called Dialog which is such a good addition to help us Make a modal/popup screen it comes with inbuilt functions to close and open it, no logic required to open/close it and also we can edit its mode like if we only want some styles to apply when the modal is visible we can do so by modal:open pseudo class. it also comes with other pseudo class we can style like backdrop. It can be used to make a glassmorphism effect... so cool.

Side Discoveries{
 1. Transfrom property of css only applies to block level elements not inline.

 2. New reason to Hate tailwind- Apparenly we cant add linear gradient just by adding one block of text... we need two, or probably more adding to that MASSIVE wall of text. Ah well im in no position to complain about that since the app.jsx (RenderPokemon) is doing too much logical work right now and looks like a logic function rather than a component. I guess i have to start cleaning up this isnt my room... wait it does looks like one when i see it closely...

 3. Apparently my whole institute is trying to stop me from coding i suppose... so many stuff to write and it keeps piling up.😔

 4. Im confused as to when to use CSS and when to use Tailwing maybe i ought to make a rule or mental modal which specific conditions need CSS and which need Tailwind. Used conditional class adding in the elements today... kind of neat we dont need to use js to mutate the DOM classes via classlist or addClasslist etc.
}

Day 4 log---

1. Its important to separate everything which gets looped to render if we dont do that react will yell at us and its fair as well since if we delete or resort the list react will get confused what element was who so its important to give everything a unique id.

2. When we are working with a element that is a event listener or intersection observer in my case and we are to add/remove the element again and again on a toggle it but either the function applying the listener only runs once or even if it runs twice if it doesnt clear its previous listener the listener will stack or it will still be listening from the previous element even when its gone. So we handle it by disconnecting/removing the listener at start and adding it to the newest element at the end.

3. React useEffect... so apparently the if we return a cleanup function in react useEffects the function isnt actually called at the same time.... react remembers the function and runs it when the dependency of the effect or the element its monitoring is dead like my hands from all this typing.

4. When we want to check if a data we are fetching from an API was successful we can check it by response.ok this returns either true or false. Happens by tracking if the resolve of the promise was called or not?

Side Discoveries{
 1. An empty array is also considered a truthy value if we want to check if the array is empty we use array.length method.

 2. if we try to use .toLowercase on a semi number like '21' it doesnt have any affect.

 3. Trim method only removes the empty space at the start and end of an input the ones in the middle are ignored.

}

Many Days Log---
Hmmm Pretty frustrating to realize i forgot to commit the codes daily because i was so focused on my own assignments and finishing the features one after another, Even if i was coding Everyday i got so hell bent on finishing the things that i forgot to savepoint my own project... i guess i will make a habit of commiting after small ugly wins rather than waiting to finish the elegant bug free edition of the big plan.

1. First lesson... pokemon data can be confusing sometimes... i witnessed it when i was trying to map out my tag system and it kept firing on pokemon that made no sense at all, thats when i realised if we are getting to a conclusion using data manupulation there are bound to be misfires, Found a better approach that is a hybrid of hardcoding and dynamic generation i acheive this by handling the edge case pokemons using a filter like if the grass type tag came across the breloom which does not fit the current tag name we can either skip it or check if the selected pokemon is breloom if it is we give it a subtag of the tag (subtags system coming soon so looking forward to it).

Life update---
IDK what the hell is going on atp i just come code and go i havent been writing here often, i feel like a machine today and if that werent enough i am sick from weeks... oh wait if im machine im not supposed to be sick.
Well whatever i cant say i will write daily here because i know i dont have much energy to write here after those assignments i have to do and the coding sessions, but lets hope i do write here.

Day IDK log---
I used React router today and well... its bugging me why react doesnt bundle the react router with the project in some file like config, pakage node modules. I had to download it separately and the command for it was npm install react-router-dom, lets find out why its not bundled... ah well i dont have the energy for that.

1. Basically react router is a liar it stimulates like the page was switched but in the background it is just switching which component that get rendered when a link like NavLink is clicked when a specific path is detected like in this project / for home /favdex for favdex page and /support for support page.

2. There are tags??? links or functions that react router gives like BrowserRouter, Routes, NavLink and Route as well as hooks like useLocation, useParams, useNavigate

3. NavLink is pretty simple... it just adds a class called active to the Link if its active if it isnt then it removes it.

4. Links are basically <a> tags but the diffrence is when we click <a> tag our browser intecepts it or listens to it but Link tag prevents default behavior of clicking <a> tag like the function preventDefault(), Why we use it is because when we click a normal link our page reloads and could delete our states or data we have which is not saved, but Link tag avoids a reload and just switches the components to show a diffrent component on the same page.

5. useParams... although i didnt use it i still leant what it does, What it does is it gives us a data which is at the end of a path or specifically a id which is like pathname/:id so we will get the id as a 'String' even if its a number.

6. hmm i think the rest are pretty self explainatory except BrowserRouter... so its just a component that is used to make the whole react router work when we put anything inside it all its children are able the use router powers its like a event listener or observer which manages what page we are on and which page we can navigate to.


Break- Discussion

Hmmmmm... There is something id like to do with this site now as its close to being completed and that is... a CSS overhoul. AGAINNN! Yep i have done it 2 times already but both times the site looked kinda meh because i wasnt planning what to do and just slapping whatever i thought looked COOL and i do have a problem to keep my criteria of COOL changing depending on my thoughts,environment or mood so the inconsistency arises pretty often. Yeah it sounds annoying and unnecessary(it is necessary) but well i noticed i am just putting stuff on a whim and my instinct keeps screaming something is wrong(idk what its called... Gut feeling maybe???) so the previous version looked kinda childish and very vibrant like a kid pokedex which was not even my goal or vision when i was planning to make this site, in my vision the site is supposed to look modern, fast and snappy, little customizable(future plans including multiple themes), So i am taking the site in a diffrent direction as it was supposed to go, which i would be correcting in a few days and i have decided to actually open some gates of knowledge using internet to learn design rules and norms to achieve my goal. So i have changed the variables to a more dark theme as for now temporarily to switch to a more onbrand and organized variable/color pallate and fonts etc.
Lets hope i have a safe journey on finding the knowlege quest i have taken for free and not find myself in front of the Doom-scrolling boss, also i am finally all healed up now although the institute assignments remains i will be putting more effort from now on so lets hope i really dont mess up this time as well.

So the Topic today is Spacing. now i must go research on it.

I kinda lost track of time and went to search about other design laws as well which were... boring to read so i tried to visualize it (took help of Ai) and i understand these

1. <b>Related things should be grouped Together</b>- This one is pretty much common sense to begin with it just means related things should be close to each other instead of far apart since we associate the closer things as related and father things as unrelated or just noise even if it is actually related, now a bad thing might happen that is we might put 2 unrelated things close together which do completely diffrent things to fry users brain and annoy them XD. we shouldnt do that but its a possiblility imagine trying to clear cache but you deleted your account because the buttons were closer, same shape, same color, same typography just diffrent text... we cant actually expect the user to read the text on button,the user should know what it does just by seeing it in some cases its difficult to make the button do that so we just use diffrent color, shape (we shouldnt use too drastic shapes and keep a consistent shape across all button but i think some variances would be cool), or text should be visible clearly and large. Dam im running my mouth so much.

2. <b>Every shape thats related to each other should be similar</b>- We find patterns very quickly and notice when something is wrong even if we cant point whats wrong, and it could be due to something as small as a inconsistent font usage. So the thing i learnt was we should use same or similar shapes for element thats related that way the shapes are consistent for example all buttons on the page are rounded pill shape and there is one button thats full on recatangle, that button surely will stick out like a sore thumb. Well i think we might want that attention it grabs in some cases like we want the attention of user somewhere on page thats located at a very remote place even if it means breaking some laws and shape. People notice good thing or bad things the mid ones slide past their eyes.

3. <b>The user should know whats the main content just by eyballing the page</b>- Human attention span is very low and thats primary reason why good sites load fast, even a slight delay can cause annoyance to the user, We dont like to read whats on the page too much we like to be able to know what is a element visually, That takes us to the topic that is we need to decide what thing is the hero or the main content of the element in my context my prokemon images are the main content of the card and i gotta make sure the users attention goes to them, I also figured we scan the page in patterns like Z or F (there could be more) and i thought if the scan is left to right the most attention goes to the leftmost pokemon card so i used a gradient on the pokedex container make the right ones look heavy to grab the users attention there as well in case they missed it. I didnt even know we scan the sites in letters i thought we just look randomly.

4. <b>We must diffrentiate between elements</b>- in case they are of same shape we must make them diffrent using colors to make the user know what it is even without looking at the text in my project that applies to the type filter that has same shape on every type but the color should be diffrent, like a red-orange color reads as fire type instantly even if i write water on it, The thing is we associate the colors with the elements of the page even before our brain is done reading the text, it happens in miliseconds and after we read theres water written on it that gives us what i call a weird negative expression which tells they are thinking 'uhh i was wrong? nah the text is just fooling me' its funny to watch though.

New Day same stuff- I dont even know what to say today im getting more and more meesed up in the head, i dont wanna write anything today im so unmotivated to do all this but i gotta push forward because i want the prize at the end and a specific type of life to build which is calm and collected. This section might get removed in future if i think i runned my mouth too much or i will forget i wrote that which is unlikely to happen, Im so annoyed and restless today i should be resting for the day but instead im doing this... idk why or whats going on probably my machine instints kicking in or just family issues kicking inside my head. When will this family drama end dammit...
 

Anyways i still coded for 4 hours today that is so low compared to my 7-8 hour sprint yesterday but it is what it is, i covered a small responsive bugs today and favdex page styling, changed the colors of progress bar because they looked too basic, type filters now have a active state indicator which i think is good enough for now but i might need some suggestions in future which could possibly be to run the animations of tyoes on select/active and just a stable pill or rectangle if its not selected/active which is a good idea but i wont include it for now i just want to finish this site and move on to making my portfolio which will be a little unique from what i have built so far so look forward to it. There are no bullet points today because i am not in mood and also there is so less i did today.

What i learnt today- Clamp css- This function of css is just like minmax except it received a third input which is like this clamp(min,mid,max) so min and max is basic but mid means we want that size preferably if the browser cant then use between min or max, its like defining min max and a default at the same time in a single place which is good actually i will make sure to use it.


Also noticed tailwind doesnt feel much bad these days its fine if i structure it like css properties it looks messy but a readable messy, probably how other devs do it as well so im going to stick to this style atleast it looks like something complex so nobody will touch it without thinking. I wonder if the same will happen when i learn typescript.

Okay next day atleast it feels fine today so lets get the about page done today as well-
The goal for today might look like finishing the about page and populating it with relevant data as well as find any responsive bugs i can and fix it so i can sleep peacefully

I assume that the user will scan the about page like F pattern so i gotta optimise for that.
In my vision i am thinking of using summary and details tags to show the user necessary data and give a drop down to show more honest and detailed info about that section if i dont go this method the site will look like a documentation site and not everyone likes to read it.

okay first session is done i figure my voice is very dry honest and casual which wont sound good on a professional about page so im taking help of ai but that doesnt mean i give up on trying to sneak in my voice in it i will find a way to put my own dry voice there in the second session, total hours coded this session 2 hours...

Okay session 2 started at 2pm and its currently 4pm when im writing this, apparently i found a really sneaky bug that i didnt even knew existed at all, that was so dam sneaky and hidden i could have overlooked it and thought everything is done.
The bug was due to the race condition between browsers default behavior, what as happening- when we clicked enter after searching a name or pokedex id it didnt actually open the modal... no actually it did open the modal but for a very short period of time then got closed again- But this didnt happen if we normally clicked the search button also the problem was that when we searched for some pokemon that isnt already cached to localstorage it worked fine because the fetch takes time before it arrives to the modal and till the data is arrived the default behavior of the browser already ended so no race between functions happend

Now the details-- What was the racing conditions? i just litterally found out when we push a button/key in a event tracking element like input via onKeyDown etc it doesnt only run the check for onKeyDown it also fires onKeyUp or onKeyPress which race against each other causing the html5 security protocol for modal or dialog tag flag up and close instantly, More accurate version will be when we click a key in the device it doesnt just do its job and dissapears but the flow is

Key Click = OS listens to it and sends message to browser
Browser reads- it runs functions like onKeyDown onKeyUp or OnKeyPress sequentially so when we are trying to render the modal in the background the other function is still running and thats a problem... because if a background function like that is running on the input that is behind modal it closes the modal since when the modal opens it strictly prohibits the background activity like this and contains all scroll, clicks to the dialog itself, Completely isolating the background

since we only attach listener to onkeydown for the browser the browser does it job onkeydown but doesnt stop the other functions as well

and while all this is happening our modal is trying to show a data because of modal.show function which comes to the main topic that is modal function follow a very strict code of conduct that is when the modal is shown the browser locks or freezes specific events like click scroll etc to only affect inside the modal, anything running in background is not tolarated and if it detects that something is running in background(our keylisteners browser fired) even for a milisecond then the modal collapses back to close state for security reasons of HTML5

How i fixed it? hmm as shamefull as it sounds i was so dam confused that i went and took help of AI which was a very painfull loop because i didnt even understand whats happening we spent literally hours thinking what the bug was and when i saw the search button method worked i told AI and it pinned the bug down so the fix was we just listen to the keydown and literally prevent html from doing its default behavior by element.preventDefault function, Yeah that simple... idk what to say atp

Also side discovery... There is a record function in profiler tab in React Devtools that allows us to record when the site runs and when we stop recording it, this lists all the components that got rendered and WHY it rendered What caused it to rerender what updated it and which component made the update etc, pretty handy tool to be honest it can help us find bugs, though a dumb person like me wont know...

Finishing at 7pm today... basically 2 hour in morning 2 hour debugging and now 3 hours more so total 7 hours coding... dam today is good,

So what i did was styled the about page and created buttons to link to external sites like github and discord, Discord is not ready so the link isnt there yet but the github is totally linked.
As i was saying i will try to find a way to put some of my voice in the about section i will try tomorrow as im completely drained for today i hope tomorrow is as peacefull as today not chaotic like yesterday, afterall what else can i do except hope.


Today unexpected things happened, a powersurge hit and well since my laptop is currently so ancient that its practically a desktop with no battery, broken trackpad, usb keyboard, usb mouse its just desktop with extra steps so i couldnt code for today but in the end i have found a really usefull app for me...

The app name is ResponsivelyApp... pretty responsible name telling what it does just by its name so what it helps me with is, it can stimulate my site across multiple devices at the same time so i can work on responsive design of my site. its pretty handy and can improve my workflow... though it would have been better if i didnt have myopia to begin with but well coding for 6-7 hours most of the time comes with a price to pay and i hope the price doesnt increase too much.

What i did today--- i learnt i could use clamp() function that is very handy i literally forgot if i already mentioned it here or not but lets see.
What it does is take 3 values one is minimum size (in px)  preffered size (in viewport width vw) and max size (in px) well this clamp function can be used pretty much everywhere what it does is it enables us to give browser direct instructions saying this element should be atleast min and shouldnt go beyond max while mid or prefered size is the baseline in which it can adjust, it enables smooth scaling between the sizes instead of using breakpoints we can use this function its a shame i already added breakpoint to the text and all and i have to optimize now.

Since my head hurts right now this will be the last commit for today and in the background i am still coding not slaking off its just that i will be experimenting with the new app i found and the site.


Today i learnt that having a max width in Px values is better than giving it a percent value since there is a lot of diffrence between 30% of a phone and 30% of a laptop, 30% in phone can be as small as 150px but in a laptop it can cross way more depending on the screen size, as for me? honestly i have been using percent values so far as i remember if someone dev told me thats wrong i wont be taking it for face value will i? if i do want to believe it then i need proof of it which i dont have yet so i will make my own proof by trying to apply the advice here.. basically experiment on it.

okay i tested it on the About page and well... it looks okay actually but this wont help in favdex or home page since the extra space can be used to show more cards which is what the pokedex grid is for, it will cap the max cards to 6 or 5 on big screens so that user can see the image very clearly and it grabs the attention. 

About page is diffrent though, because the about page is basically full of text the user will get annoyed if he has to read the text in a long horizontal line instead i understand that user would like to go and read it in F pattern or some similar pattern depending on them so the text shoud be centered and there should be margin between the text mostly more than half of the page like 60% of the page should show text and the remaining should be empty also there is another reason for this... since human attention goes to the center of the page the most we should avoid putting the text where his dont even follow naturally we already have a very low attention span probably 6-7 seconds which will be reduced to 0 if we try to make the user work or confuse his brain/eyes-

Must have heard of rule of thirds where we divide a picture or page in 9 equal parts and we get ourself 4 boxes in the center, those boxes draw the most attention, our eyes go there without any effort almost automatically so we should take benifit of that by putting our most important conetent there as for why im not using it in pokedex grid??? well i think the cards draw attention on their own and i am giving a little breating space to the cards as well so i am fitting as many cards as it can fit.

nice and peacefull sunday morning- lets see how long i code and stay bundled in my home today XD
morning session was fine i guess but i will use today to find stuff to fix regardless of it.

So today i thought making a discord server just to link it to the projects while its in its initial phases is pretty useless, so im replacing the link with a email link rather than discord.

I have added a analytics component to the page to monitor the vercel deployment and other stuff to improve it.

new features added- Sprite switcher: we can now change the sprite that the pokemon cards display from pixelated sprites to modern dreamworld sprites to official sprites and their shiny variants as well but as we know PokeApi doesnt provide any shiny variants of dreamworld sprites so i have added a fallback sprite in case that the user tries to toggle shiny regardless

we can now see how many pokemon we have fetched till now in the top most section and see a message when filtering if the list is empty

currently the performance of the site is stutering in mobile devices that might be due to the images sent by PokeApi is high quality images and loading them takes time... i could fix that if i was using Next.js but its just that its pointless if i do that since that will add a steep learing curve for now and add little to now ROI as for now but it will be helpfull in my journey to become a full stack developer regardless but i know myself enough if i keep doing this then i will forever keep trying to add new features.

i have compressed the mewpng in public forlder so to improve the load time and the vite config is now structured so that the loading is faster (caching the non changing code/bundles and only downloads the ever changing codes)

_________________________________________________________________________________________________________________________________

So finally we have reached the end or have we? we will know in future when i come here to implement a light mode but as of now the project is finally completed and if you are reading this... first of all why are you reading this and how are you still alive after reading this well anyways you have reached the depths of it for now and will be seeing me on my next project.


Today its finally time to look back and either regret or be proud of what i have built.
So basically a whole month has passed since i started creating this site and in my opinion its finally complete (not complete if i see some more features i could add or issues but not now)

So? well i know i should have created a features or experimental branch on github to keep the main branch 
project clean and deployed all times and used the other branch to work on making features and testing before broken code goes live on the deployed page but it is what it is i cant change the past so i will change the future.

So Our next destination will be My portfolio site so we will be seeing each other there now... Cant escape from me and my overthinking can we. I will be using typescript in it for the first time and the usual react and tailwind... yeah react and tailwind are the usual now instead of a hurdle that it was 1 month ago (i understand now why tailwind is used even though its ugly to look at... apparently you get used to it or ignore it after something is done lol)

Till then you can rest up but i cant since i still have my assignments to complete XD i will be seeing you sooner than you think till then good luck me!
