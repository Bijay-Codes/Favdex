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