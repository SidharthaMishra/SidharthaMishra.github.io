document.addEventListener("DOMContentLoaded", function() {
    "use strict";

     //----------------------------------------------------//
     //                  Vars                              //
     //----------------------------------------------------//
    const projectsSection = document.querySelector(".projects");
    const projectCards = projectsSection.querySelectorAll(".project-card");
    let projects = [];
    const modal = document.querySelector(".project-modal");
    const modalCard = modal.querySelector(".project-card");
    const repoBtn = modal.querySelector(".repo-btn");
    const demoBtn = modal.querySelector(".demo-btn");
    const backArrow = modal.querySelectorAll(".modal__arrow-container")[0];
    const nextArrow = modal.querySelectorAll(".modal__arrow-container")[1];
//     let cardIndex = 0;

     //----------------------------------------------------//
     //                  Functions                         //
     //----------------------------------------------------//


/* Array of Project Objects:
    {
        title:project_title,
        desc:project_desc,
        img:img_src,
        repoURL:repo_url,
        demoURL:demo_url
    }

*/
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

    function resetModalCard(){
            modalCard.innerHTML ="";
    }

     //----------------------------------------------------//
     //                  Event Listeners                   //
     //----------------------------------------------------//

    projectsSection.addEventListener("click", function(e) {
        const element = e.target;
        if(element.type==="button"){
            let index = getCardIndex(e.target);
            modal.querySelector(".project-card").innerHTML = generateModalContent(index);
            repoBtn.href=`${projects[index].repoURL}`;
            demoBtn.href=`${projects[index].demoURL}`;
        }

    });

});