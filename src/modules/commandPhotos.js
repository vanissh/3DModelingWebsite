const changePhoto = () => {

    const command = document.getElementById('command');
    let temp;

    command.addEventListener('mouseover', (e) => {
    let target = e.target;
    
    if(target.matches('img')){
        temp = target.src;
        target.src = target.dataset.img;
    }
    });

    command.addEventListener('mouseout', (e) => {
        let target = e.target;
        
        if(target.matches('img')){
            target.src = temp;
        }
    });
    
};

export default changePhoto;
