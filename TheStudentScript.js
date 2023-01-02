let move_speed = 3, grativy = 0.5;
let student = document.querySelector('.student');
let img = document.getElementById('student-smile');
// let sound_point = new Audio('sounds effect/point.mp3');
// let sound_die = new Audio('sounds effect/die.mp3');
let sound_point = document.getElementById("point");
let sound_die = document.getElementById("die");

// getting student element properties
let student_props = student.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == ' ' && game_state != 'Play'){
        document.querySelectorAll('.books_pile').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        student.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
    else if(e.key == 'Enter'){
        window.location.href = "homePage.html";
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let books_pile = document.querySelectorAll('.books_pile');
        books_pile.forEach((element) => {
            let books_pile_props = element.getBoundingClientRect();
            student_props = student.getBoundingClientRect();

            if(books_pile_props.right <= 0){
                element.remove();
            }else{
                //check that the student doesn't touch the books
                if(student_props.left < books_pile_props.left + books_pile_props.width && student_props.left + student_props.width > books_pile_props.left && student_props.top < books_pile_props.top + books_pile_props.height && student_props.top + student_props.height > books_pile_props.top){
                    game_state = 'End';
                    message.innerHTML = 'איייי זה היה קרוב!' + '<br>הניקוד שלך: '+ score_val.innerHTML + '<br>לחץ/י על מקש הרווח להתחלה מחדש או על enter ע"מ לחזור לדף הבית';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                }else{
                    if(books_pile_props.right < student_props.left && books_pile_props.right + move_speed >= student_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        sound_point.play();
                    }
                    element.style.left = books_pile_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let student_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        student_dy = student_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/student.png';
                student_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'images/student-smile.png';
            }
        });

        if(student_props.top <= 0 || student_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        //move the student by 1px
        student.style.top = student_props.top + student_dy + 'px';
        student_props = student.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let book_seperation = 0;

    let book_gap = 35;

    function create_book(){
        if(game_state != 'Play') return;

        if(book_seperation > 115){
            book_seperation = 0;

            let book_posi = Math.floor(Math.random() * 43) + 8;
            let books_pile_inv = document.createElement('div');
            books_pile_inv.className = 'books_pile';
            books_pile_inv.style.top = book_posi - 70 + 'vh';
            books_pile_inv.style.left = '100vw';

            document.body.appendChild(books_pile_inv);
            let books_pile = document.createElement('div');
            books_pile.className = 'books_pile';
            books_pile.style.top = book_posi + book_gap + 'vh';
            books_pile.style.left = '100vw';
            books_pile.increase_score = '1';

            document.body.appendChild(books_pile);
        }
        book_seperation++;
        requestAnimationFrame(create_book);
    }
    requestAnimationFrame(create_book);
}