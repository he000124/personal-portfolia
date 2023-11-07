/*
This file is used to:
1. Dynamically display the list of whole courses that I should finish so far(level 1 and 2), with image (book cover, or any image represent the course), 
title of the course, level, course code and a brief description about the course.
2. Include search function for searching of specific course using JavaScript.
3. Include filter function for filtering course by level using JavaScript.
4. Include sort function for sorting by level from lowest to highest and vice versa using JavaScript.
image source: https://unsplash.com/s/photos
*/

/*Store courses into an array */
const courses = [
  {image: '../images/mat8001c.jpg', title: 'Tech Math for Computer Science', level:1, code: 'MAT8001C', description: 'This course focuses on the application of mathematics to solve real-world problems encountered in computer science and related disciplines.'},
  {image: '../images/enl1813t.jpg', title: 'Communications I', level:1, code: 'ENL1813T', description: 'It focuses on how individuals, groups, and societies exchange information, ideas, and meaning through verbal, nonverbal, and mediated channels.'},
  {image: '../images/cst8116.jpg', title: 'Intro to Computer Programming', level:1, code: 'CST8116', description: 'It introduces students to the fundamentals of programming using the Java programming language. '},
  {image: '../images/cst8215.jpg', title: 'Introduction to Database', level:1, code: 'CST8215', description: 'It provides students with a comprehensive understanding of the fundamental concepts and principles of database management systems (DBMS).'},
  {image: '../images/cst8101.jpg', title: 'Computer Essentials', level:1, code: 'CST8101', description: 'It provides students with a foundational understanding of essential computer concepts, skills, and practical applications. '},
  {image: '../images/ged5300.jpg', title: 'The Science of Everyday Life', level:2, code: 'GED5300', description: 'It explores the scientific principles and phenomena underlying the everyday experiences, objects, and phenomena that we encounter in our daily lives. '},
  {image: '../images/gep1001.jpg', title: 'Cooperative Education Readiness', level:2, code: 'GEP1001', description: 'It is designed to prepare students for successful participation in cooperative education experiences or work-integrated learning opportunities. '},
  {image: '../images/enl2019t.jpg', title: 'Technical Comm. for Eng. Technology', level:2, code: 'ENL2019T', description: 'It focuses on developing effective communication skills specifically tailored for professionals in the field of engineering technology.'},
  {image: '../images/cst8285.jpg', title: 'Web Programming', level:2, code: 'CST8285', description: 'It focuses on the development of websites and web applications. '},
  {image: '../images/cst8284.jpg', title: 'Object Oriented Programming(Java)', level:2, code: 'CST8284', description: 'It focuses on creating modular and reusable code by organizing data and behavior into objects.'},
  {image: '../images/cst8102.jpg', title: 'Operating Systems Fund(GNU/Linux)', level:2, code: 'CST8102', description: 'It provides an introduction to the basic concepts, principles, and components of operating systems, with a specific focus on GNU/Linux.'},
  {image: '../images/cst2355.jpg', title: 'Database Systems', level:2, code: 'CST2355', description: 'It introduces students to the fundamental principles, concepts, and techniques involved in the design, implementation, and management of databases. '}
];

/*invoke display function to show the initial webpage */
displayRequiredCourses(courses);


let searchQuery = document.getElementById("searchQuery").value;
let filterQuery = document.getElementById("filterQuery").value;
let sortQuery = document.getElementById("sortQuery").value;


document.getElementById("myBtn").addEventListener("click", searchCourses);
document.getElementById("sortQuery").addEventListener("change", sort);
document.getElementById("filterQuery").addEventListener("change", filter);

function sort(){
  sortQuery = document.getElementById("sortQuery").value;
  let courses = prepareArray(searchQuery, filterQuery, sortQuery);
  removeCourses();
  displayRequiredCourses(courses);
}

function filter(){
  filterQuery= document.getElementById("filterQuery").value;
  let courses = prepareArray(searchQuery, filterQuery, sortQuery);
  removeCourses();
  displayRequiredCourses(courses);
}

function searchCourses(){
  searchQuery= document.getElementById("searchQuery").value;   
  let courses = prepareArray(searchQuery, filterQuery, sortQuery);
  removeCourses();
  displayRequiredCourses(courses);
}

function removeCourses(){
  let elements;
  do{
    elements = document.getElementsByClassName("grid-item");
    for(let i=0; i < elements.length; i++){
      elements[i].remove();
    }
  }while(elements.length!=0)
}

function prepareArray(searchQuery, filterQuery, sortQuery){
  let requiredCourses;   

  if(filterQuery == 0 && searchQuery.trim().length ==0){
    if(sortQuery==1){ // sort from small to big
      requiredCourses=courses.sort((a,b)=>a.level-b.level);
      requiredCourses=requiredCourses.sort((a,b)=>a.code-b.code);
    }
    else{ // sort from big to small
      requiredCourses=courses.sort((a,b)=>b.level-a.level);      
      requiredCourses=requiredCourses.sort((a,b)=>a.code-b.code);
    }
  } 
  if(filterQuery > 0 && searchQuery.trim().length ==0){
      requiredCourses = courses.filter(a=>a.level==filterQuery);
  } 
  if(searchQuery.trim().length > 0) {
    searchQuery = searchQuery.toUpperCase();
    requiredCourses=courses.filter(a=>(a.description+a.code+a.title+a.level).toUpperCase().indexOf(searchQuery)>-1);
    if(sortQuery==1 && filterQuery == 0){ // sort from small to big
      requiredCourses=requiredCourses.sort((a,b)=>a.level-b.level);
      requiredCourses=requiredCourses.sort((a,b)=>a.code-b.code);
    }
    else if (sortQuery==2 && filterQuery ==0){ // sort from big to small
      requiredCourses=requiredCourses.sort((a,b)=>b.level-a.level);      
      requiredCourses=requiredCourses.sort((a,b)=>a.code-b.code);
    }
    else if(filterQuery>0){
      requiredCourses = requiredCourses.filter(a=>a.level==filterQuery);
    }
    }

  return requiredCourses;
}

function displayRequiredCourses(requiredCourses){
  let newDiv;
  let newNode;

for(let i=0; i<requiredCourses.length; i++){
  newDiv = document.createElement("div");
  newDiv.className= "grid-item";
  newNode = document.createElement("img");
  newNode.setAttribute("src", requiredCourses[i].image);
  newNode.setAttribute("alt", requiredCourses[i].title);
  newDiv.appendChild(newNode);

  newNode= document.createElement("h3");
  newNode.className="title";
  newNode.appendChild(document.createTextNode(requiredCourses[i].title));
  newDiv.appendChild(newNode);

  newNode= document.createElement("p");
  newNode.appendChild(document.createTextNode("Level: "+ requiredCourses[i].level));
  newNode.appendChild(document.createElement("br"));
  newNode.appendChild(document.createTextNode("Course Code: " + requiredCourses[i].code));
  newNode.appendChild(document.createElement("br"));
  newNode.appendChild(document.createTextNode(requiredCourses[i].description));
  newDiv.appendChild(newNode);

document.getElementById("container").appendChild(newDiv);

}

}
