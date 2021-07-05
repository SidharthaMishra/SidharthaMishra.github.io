document.addEventListener("DOMContentLoaded", function() {
    "use strict";
     //----------------------------------------------------//
     //                  Vars                              //
     //----------------------------------------------------//
    const projectsSection = document.querySelector(".projects");
    const projectCards = projectsSection.querySelectorAll(".project-card");
    /* 
        Array of Project Objects:
        {
            title:project_title,
            desc:project_desc,
            img:img_src,
            repoURL:repo_url,
            demoURL:demo_url
        }
    */
    let projects = [];
    const modal = document.querySelector(".project-modal");
    const repoBtn = modal.querySelector(".repo-btn");
    const demoBtn = modal.querySelector(".demo-btn");
    const backArrow = modal.querySelector(".left-arrow");
    const nextArrow = modal.querySelector(".right-arrow");
    const scrollTop = document.querySelector(".scroll-top");
    let cardIndex = 0;

    //----------------------------------------------------//
    //                  Functions                         //
    //----------------------------------------------------//
    function getProjects(){
        [...projectCards].forEach(function(card){
            let projectTitle = card.children[1].children[0].innerText;
            let projectName=projectTitle.toLowerCase().split(' ').join('_');
            let projectDesc = card.children[1].children[1].innerText;
            let project = 
            {  img: `/img/${projectName}.png`,
                title:`${projectTitle}`,
                desc:`${projectDesc}`,
                repoURL:`https://github.com/SidharthaMishra/${projectName}`,
                demoURL:`https://sidharthamishra.github.io/${projectName}`
            };
            
            projects.push(project);
        });
    }
    getProjects();
    //Get Index of Card that was Clicked
    function getCardIndex(btn){
        let title = btn.parentNode.querySelector(".card-title").innerText;
        for(let i =0;i<projects.length;i++){
            if(projects[i].title===title){
                return i;
            }
        }
        return -1;
    }
    //Generate and return modal dialog content
    function generateModalContent(index) {
        let project = projects[index];
        let card = `
        <img src="${project.img}" class="card-img-top" />
        <div class="card-body d-flex">
          <h3 class="card-title fw-bold text-center">
            ${project.title}
          </h3>
          <p class="card-text">
            ${project.desc}
          </p>
        </div>
           `;
        return card;
    }
    //Decrements cardIndex
    function decrCardIndex() {
        if (cardIndex <= 0) {
            cardIndex = projects.length - 1;
        } else {
            cardIndex--;
        }
    }
    //Increments cardIndex
    function incrCardIndex() {
        if (cardIndex < projects.length - 1) {
            cardIndex++;
        } else {
            cardIndex = 0;
        }
    }
    //Populates Modal with Current Project Details
    function showCurrentProjectInfo(){
        modal.querySelector(".project-card").innerHTML = generateModalContent(cardIndex);
        repoBtn.href=`${projects[cardIndex].repoURL}`;
        demoBtn.href=`${projects[cardIndex].demoURL}`;
    }
    //Shows Next Project in Modal
    function prevProject() {
        decrCardIndex();
        showCurrentProjectInfo();
    }
    //Shows Previous Project in Modal
    function nextProject() {
        incrCardIndex();
        showCurrentProjectInfo();
    }
    //----------------------------------------------------//
    //                  Event Listeners                   //
    //----------------------------------------------------//
    projectsSection.addEventListener("click", function(e) {
        const element = e.target;
        if(element.type==="button"){
            cardIndex=getCardIndex(e.target);
            showCurrentProjectInfo();
        }
    });
    backArrow.addEventListener("click", function() {
        prevProject();
    });
    nextArrow.addEventListener("click", function() {
        nextProject();
    });
    modal.addEventListener("keyup", function(e) {
        if (e.key === 'ArrowRight') {
            nextProject();
        } else if (e.key === 'ArrowLeft') {
            prevProject();
        }
    });
    scrollTop.addEventListener("click",function(e){
        let scrollY = document.scrollY;
        for(let i = scrollY;i>-1;i--){
            setTimeout(()=>{
                scrollY--;
            },100);
        }
    });
});