const section = document.querySelector('section');

    let para1 = document.createElement('p');
    let para2 = document.createElement('p');
    let motherInfo = 'The mother cats are called ';
    let kittenInfo;
    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';

    fetch(requestURL)
    .then(response => response.text())
    .then(text => displayCatInfo(text))

    function displayCatInfo(catString) {
      let total = 0;
      let male = 0;

      // Add your code here
        const cats = JSON.parse(catString);
        let motherNames = '';
        
        for (let i=0; i < cats.length; i++){
            
            for(const kitten of cats[i].kittens){
                total++;
                
                if(kitten.gender === 'm'){
                    male++
                }
            }
            
            if(i != (cats.length - 2) && i < (cats.length - 1)){
                motherNames += `${cats[i].name} `;
            }else if (i === (cats.length -2)){
                motherNames += `${cats[i].name}, `
            }else if(i === (cats.length -1)){
                motherNames += `and ${cats[i].name}.`;
            }
        }
        motherInfo += motherNames;
        kittenInfo = `Kittens in total: ${total}, male kittens: ${male}, female ones: ${total-male}`;
        
      // Don't edit the code below here!

      para1.textContent = motherInfo;
      para2.textContent = kittenInfo;
    }

    section.appendChild(para1);
    section.appendChild(para2);