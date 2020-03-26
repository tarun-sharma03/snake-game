function init()
{
    canvas = document.getElementById('mycanvas');
    W = canvas.height = canvas.width = 500;
    pen = canvas.getContext('2d');
    cs = 25;
    random_food = randomfood();
    game_over = false;
    food_img = new Image();
    food_img.src = "Assets/food.png";
    trophy = new Image();
    trophy.src = "Assets/trophy.png";
    score = 0;
    snake = {
        in_length : 5,
        color : "red",
        cells : [],
        dir : "right",

        create_snake:function()
        {
            for(var i=this.in_length;i>0;i--)
            {
                this.cells.push({x:i,y:0});
            }
        },

        draw_snake:function()
        {
            for(var i=0;i<this.cells.length;i++)
            {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            };
        },
        update_snake : function()
        {
            var headx = this.cells[0].x;
            var heady = this.cells[0].y;
            if(headx==random_food.x_rand && heady==random_food.y_rand)
            {
                // console.log("I ate the food");
                random_food = randomfood();
                score++;
            }
            else
            {
                this.cells.pop();
            }
            var X,Y;
            if(this.dir=="right")
            {
                X = headx + 1;
                Y = heady;
            }
            else if(this.dir=="left")
            {
                X = headx - 1;
                Y = heady;
            }
            else if(this.dir=="up")
            {
                X = headx;
                Y = heady - 1;
            }
            else if(this.dir=="down")
            {
                X = headx;
                Y = heady + 1;
            }
            this.cells.unshift({x:X,y:Y});
            last_x = Math.round(W/cs);
            last_y = Math.round(W/cs);
            if(headx<0 || heady<0 || headx>=last_x || heady>=last_y)
            {
                game_over = true;
            }   
        }
    };

    snake.create_snake();
    function get_dir(e)
    {
        console.log(e.key);
        if(e.key=="ArrowUp")
        {
            snake.dir = "up";
        }
        else if(e.key=="ArrowDown")
        {
            snake.dir = "down";
        }
        else if(e.key=="ArrowLeft")
        {
            snake.dir="left";
        }
        else
        {
            snake.dir="right";
        }
        console.log(snake.dir);
    };
    document.addEventListener('keydown',get_dir);
    
}

function draw()
{
    pen.clearRect(0,0,W,W);
    snake.draw_snake();
    // pen.fillStyle = random_food.f_color;
    pen.drawImage(food_img,random_food.x_rand*cs,random_food.y_rand*cs,cs,cs);
    pen.drawImage(trophy,21,15,cs+7,cs+7);
    pen.font = "20px Roboto";
    pen.fillStyle = "white";
    pen.fillText(score,30,30);
}

function update()
{
    snake.update_snake();
}
function randomfood()
{
    foodx = Math.round(Math.random()*(W-cs)/cs);
    foody = Math.round(Math.random()*(W-cs)/cs);
    food = {
        x_rand : foodx,
        y_rand : foody,
        f_color : "black",
    };
    return food;
}
function gameloop()
{
    if(game_over==true)
    {
        clearInterval(f);
        alert("Game Over ");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,100);